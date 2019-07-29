const job = require('./tools.js');
const Bundler = require('parcel-bundler');
const minimist = require('minimist');
const colorit = require('color-it');
const Path = require('path');
const dree = require('dree');

// Get CLI Arguments
const Args = minimist(process.argv.slice(2));

// Bundler options
const options = {
	// The out directory to put the build files in, defaults to dist
	outDir: './dist',
	
	// The url to serve on, defaults to '/'
	publicUrl: '/src',

	// Minify files, enabled if process.env.NODE_ENV === 'production'
	minify: false,

	 // Enable or disable sourcemaps, defaults to enabled (minified builds currently always create sourcemaps)
	sourceMaps: false,

	 // Enable or disable auto install of missing dependencies found during bundling
	autoInstall: true,

	// Whether to watch the files and rebuild them on change, defaults to process.env.NODE_ENV !== 'production'
	watch: false,
};

(async function () {
	if (Args._.length > 1) {
		entryFiles = Args._;
	} else if (Args._.length > 0) {
		entryFiles = Args._[0];
	} else {
		return console.log(colorit(' ❌ Please Specify Entry Point! ').clouds().redBg().toString());
	}

	// Save Important Path Received from CLI Arguments
	const outDir = Args.o !== undefined ? Args.o : options.outDir;
	const srcDir = Args.s !== undefined ? Args.s : Path.join(outDir, 'src');

	job.log.title("Emptying Directory");
	var status = true;

	// Start by emptying Directory
	await job.emptyDir(srcDir)
		.catch(function (err){
			status = false;
			job.log.error(err);
		});

	await job.emptyDir(outDir)
		.catch(function (err) {
			status = false;
			job.log.error(err);
		});
	
	if(!status) 
		process.exit(1);

	job.log.success("Removing Directory has been completed");

	// Initializes a bundler using the entrypoint location and options provided
	options.outDir = outDir;
	const bundler = new Bundler(entryFiles, options);

	bundler.on('buildError', error => {
		job.log.error(error.message);
		job.log.error("Error Path: " + error.path);
	});

	bundler.on('bundled', (bundle) => {
		console.log(" ");
		job.log.success("Parcel Bundler has been completed");
		job.logToFile("parcel-log", bundler)
			.then((res) => job.log.success(res))
			.catch((err) => job.log.error(err))
	});


	// Run the bundler, this returns the main bundle
	// Use the events if you're using watch mode as this promise will only trigger once and not for every rebuild
	job.log.title("Start Parcel Bundler");
	await bundler.bundle();
	

	job.log.title("Moving Javascript Files to " + srcDir);
	await job.mover(outDir + "/*.js", srcDir)
		.then(() => job.log.success("Successfully Moved JS Files"))
		.catch(function (err) {
			job.log.error(err);
		});

	job.log.title("Moving CSS Files to " + srcDir);
	await job.mover(outDir + "/*.css", srcDir)
		.then(() => job.log.success("Successfully Moved CSS Files"))
		.catch(function (err) {
			job.log.error(err);
		});

	job.log.title("Compressing Source File");
	await job.compressor(srcDir)
		.then(async function (files){
			job.log.success("Successfully Compressing Files")
			await job.logToFile("minify-log", files)
				.then((res) => job.log.success(res))
				.catch((err) => job.log.error(err))
		})
		.catch(err => job.log.error(err))

	job.log.title("Rewriting HTML Files");
	var files = [];
	await dree.scan(outDir, {
		normalize: true,
		size: true,
		sizeInBytes: false,
		extensions: ['html']
	}, function(bit){
		var name = bit.name.split(".");
		files.push({
			name: name[0],
			path: bit.path
		});
	});

	for (let i = 0; i < files.length; i++) {

		var cssName = files[i].name === "login" ? "login":"main";
		await job.replaceInFile(files[i].path, "\/src\/.*\.css", "/src/" + cssName + ".min.css")
			.catch((err) => job.log.error(err))

		var counting = i > 8 ? (i + 1) : "0" + (i + 1);
		await job.replaceInFile(files[i].path, "\/src\/.*\.js", "/src/" + files[i].name + ".min.js")
			.then(() => job.log.process("[" + counting + "/" + files.length + "] Rewriting CSS|JS on  ->  " + colorit(files[i].path).green().toString()))
			.catch((err) => job.log.error(err))
	}

	job.log.success("Finished Every Job Perfectly!");
})();
const uglify = require('@node-minify/uglify-js');
const cssnano = require('@node-minify/cssnano');
const spawn = require('child_process').spawn;
const minify = require('@node-minify/core');
const colorit = require('color-it');
const Path = require('path');
const fs = require('fs');

const logs = {
	error: (str) => {
		return console.log(" " + colorit('❌ ' + str).clouds().redBg().toString())
	},
	success: (str) => {
		return console.log(" " + colorit("✔" + str).clouds().nephritisBg().toString())
	},
	title: (str) => {
		return console.log(colorit("\n※ " + str).yellow().toString())
	},
	process: (str) => {
		return console.log(colorit(" » " + str).blue().toString())
	}
};

// Minifying Function
function doMinify (file, filepath, counting = ""){
	var filename = file.split(".");

	// Check if its Javascript files
	if (filename.includes('js')) {
		logs.process(
			counting + " Compression On   " + 
			colorit("[ UglifyJS ]").yellow().toString() + "   " + 
			colorit(file).clouds().toString()
		);

		// Minify JS Files
		return minify({
			compressor: uglify,
			input: Path.join(filepath, file),
			output: Path.join(filepath, filename[0] + '.min.js')
		});
	} else if (filename.includes('css')) {
		logs.process(
			counting + " Compression On   " + 
			colorit("[ CSS-nano ]").green().toString() + "   " + 
			colorit(file).clouds().toString()
		);

		// Minify CSS
		return minify({
			compressor: cssnano,
			input: Path.join(filepath, file),
			output: Path.join(filepath, filename[0] + '.min.css')
		});
	}
}

module.exports.compressor = function (filepath){
	return new Promise(function(resolve, reject){
		// Open Directory 
		logs.process("Opening Directory " + filepath + "..");
		var directoryPath = Path.join(__dirname, filepath);

		// passsing directoryPath and callback function
		fs.readdir(directoryPath, async function (err, files) {
			// handling error
			if (err) {
				reject('Unable to scan directory: ' + err);
			} else {
				logs.process(
					colorit("Found Total ").green().toString() + 
					colorit(files.length).red().toString() + 
					colorit(" Files").green().toString()
				);
			}

			// compress all files using loop
			for (let i = 0; i < files.length; i++) {
				var counting = i > 8 ? (i + 1) : "0" + (i + 1);
				await doMinify(files[i], directoryPath, "[" + counting + "/" + files.length +"]").then(function () {
					fs.unlinkSync(Path.join(directoryPath, files[i]));
				});
			}

			resolve(files);
		});
	})
}

module.exports.emptyDir = function (dir){
	return new Promise(function(resolve, reject){
		var directoryPath = Path.join(__dirname, dir);
		var rm = spawn('rm', ['-rf', directoryPath]);
		rm.stderr.on('data', data => reject(data));
		rm.on('exit', code => resolve(code));
	})
}

module.exports.mover = function (file, destination){
	return new Promise(function(resolve, reject){
		var mkdir = spawn('mkdir', ['-p', destination]);
		mkdir.on('exit', (code) => {
			if (code == 0){
				var mover = spawn('mv', [file, destination]);
				mover.stdout.on('data', data => console.log(data));
				mover.stderr.on('err', err => reject(err));
				mover.on('exit', code => resolve(code));
			}else {
				reject("Process Exit Early");
			}
		});

		mkdir.stderr.on('err', err => reject(err));
	})
}

module.exports.logToFile = function(filename, data){
	return new Promise(function(resolve, reject){
		// write data to file sample.html
		fs.writeFile('./' + filename + '.json', JSON.stringify(data),
			// callback function that is called after writing file is done
			function (err) {
				if (err) reject(err);
				// if no error
				resolve("Log has been written to " + filename + ".json.");
			});
	})
}

module.exports.replaceInFile = function(filepath, search, replaceable){
	return new Promise(function(resolve, reject){
		fs.readFile(filepath, 'utf8', async function (err, data) {
			if (err) {
				reject(err);
			}

			var rgx = new RegExp(search, 'g');
			var result = data.replace(rgx, replaceable);
			await fs.writeFile(filepath, result, 'utf8', function (err) {
				if (err) reject(err);
			});

			resolve(result);
		});
	})
}

module.exports.log = logs;
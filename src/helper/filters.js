import Vue from "vue";
import moment from "./moment-locale.js";

Vue.filter("moment", function (value, format = "D MMMM YYYY") {
	moment.locale("en");
	return moment(value, "DD/MM/YYYY").format(format);
});

Vue.filter("datetime", function (value, showTime = false) {
	moment.locale("en");
	let format = "Do MMMM YYYY";
	if (showTime) format = "Do MMMM YYYY - HH:mm:ss";

	return moment(value, "YYYY-MM-DD H:m:s").format(format);
});

Vue.filter("fulldate", function (value) {
	moment.locale("en");
	let format = "dddd, DD MMMM YYYY";

	return moment(value, "YYYY-MM-DD H:m:s").format(format);
});

Vue.filter("pagebreak", function (value, wordCount = 7) {
	let larik = value.split(" ");
	larik.splice(wordCount, 0, "<br>");

	return larik.join(" ");
});

Vue.filter("currency", function (str) {
	str += "";
	var x = str.split(".");
	var x1 = x[0];
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, "$1" + "," + "$2");
	}
	return x1;
});

Vue.filter("shortName", function (name, passable = 3) {
	let fullname = name.split(' ');
	if (fullname.length > passable) {
		for (let i = passable; i < fullname.length; i++) {
			const surname = fullname[i];
			fullname[i] = "." + surname.charAt(0).toUpperCase();
		}

		return fullname.join(' ');
	} else {
		return name;
	}
});

Vue.filter("elipsisTxt", function (text, passable = 3) {
	let str = text.split(' ');
	if (str.length > passable) {
		return str.slice(0, passable).join(' ') + '…';
	} else {
		return text;
	}
});

Vue.filter("IDRK", function (str) {
	let number = parseInt(str);
	if (number > 1000) {
		return "IDR " + number / 1000 + "K";
	} else {
		return "IDR " + number;
	}
});
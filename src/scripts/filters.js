import Vue from "vue";
import moment from "./moment-locale.js";

Vue.filter("moment", function (value) {
	moment.locale("id");
	return moment(value, "YYYY-MM-DD").format("Do MMMM YYYY");
});

Vue.filter("datetime", function (value, showTime = false) {
	moment.locale("id");
	let format = "Do MMMM YYYY";
	if (showTime) format = "Do MMMM YYYY - HH:mm:ss";

	return moment(value, "YYYY-MM-DD H:m:s").format(format);
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

Vue.filter("IDRK", function (str) {
	let number = parseInt(str);
	if (number > 1000) {
		return "IDR " + number / 1000 + "K";
	} else {
		return "IDR " + number;
	}
});

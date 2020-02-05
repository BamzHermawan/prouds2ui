const moment = require("moment/min/moment-with-locales");

moment.updateLocale("en", {
    week: {
        dow: 1, // First day of week is Monday
        doy: 7 // First week of year must contain 1 January (7 + 1 - 1)
    }
});

moment.locale('en');

export default moment;
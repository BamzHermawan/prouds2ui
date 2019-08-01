import buefy from 'buefy'

module.exports.error = function(err){
	Notification.open({
		position: 'is-top-right',
		type: 'is-danger',
		duration: 5000,
		message: err
	});
}

module.exports.success = function(message){
	Notification.open({
		position: 'is-top-right',
		type: 'is-success',
		message: message
	});
}

module.exports.alert = function(alert){
	Toast.open({
		duration: 5000,
		message: alert,
		type: 'is-warning'
	})
}

module.exports.toast = function(message){
	Toast.open({
		duration: 3000,
		message: message
	})
}

module.exports.test = buefy;
import Shepherd from 'shepherd.js';


module.exports.cancelActive = function(){
	Shepherd.activeTour.cancel();
};

function normalizeCallbacks(callbacks){
	let list = Object.keys(callbacks);

	if (!list.includes("onExit")) {
		callbacks.onExit = () => true;
	}

	if (!list.includes("onNext")) {
		callbacks.onNext = () => true;
	}

	if (!list.includes("onBack")) {
		callbacks.onBack = () => true;
	}

	return callbacks;
}

module.exports.Tour = function (steps, options = undefined, callbacks = {}){
	callbacks = normalizeCallbacks(callbacks);
	if(options === undefined){
		options = {
			defaultStepOptions: {
				scrollTo: { behavior: 'smooth', block: 'center' }
			},
			styleVariables: {
				shepherdElementBorderRadius: '5px !important',
				shepherdHeaderBackground: '#F5F5F5',
				shepherdElementWidth: "500px",
				useDropShadow: true
			},
			useModalOverlay: true
		};
	}

	const tour = new Shepherd.Tour(options);
	steps.forEach((step, index) => {
		if(index === 0){
			step.buttons = [
				{
					secondary: true,
					action: function(){
						let status = callbacks.onExit(tour.getCurrentStep());
						if(status){
							tour.cancel();
						}
					},
					text: 'Exit'
				},
				{
					action: function () {
						let status = callbacks.onNext(tour.getCurrentStep());
						if (status) {
							tour.next();
						}
					},
					text: 'Next'
				}
			];
		}else if(step.buttons === undefined){
			step.buttons = [
				{
					secondary: true,
					action: function () {
						let status = callbacks.onBack(tour.getCurrentStep());
						if (status) {
							tour.back();
						}
					},
					text: 'Back'
				},
				{
					action: function() {
						let status = callbacks.onNext(tour.getCurrentStep());
						if (status) {
							tour.next();
						}
					},
					text: 'Next'
				}
			];
		}

		tour.addStep(step);
	});

	return tour;
}
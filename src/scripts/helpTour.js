import Shepherd from 'shepherd.js';

module.exports.cancelActive = function(){
	Shepherd.activeTour.cancel();
};

module.exports.Tour = function(steps, options = undefined){
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
					action: tour.cancel,
					text: 'Exit'
				},
				{
					action: tour.next,
					text: 'Next'
				}
			];
		}else if(step.buttons === undefined){
			step.buttons = [
				{
					secondary: true,
					action: tour.back,
					text: 'Back'
				},
				{
					action: tour.next,
					text: 'Next'
				}
			];
		}

		tour.addStep(step);
	});

	return tour;
}
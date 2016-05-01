window.onload = function(){
	var annotationObject = new Annotate();
	//annotationObject.init();

	var textSelector = document.querySelector('#btn');
	textSelector.addEventListener('click', function(e){
		annotationObject.init({	markup: '<span class="annotate-bg-mine"></div>',
										addClassIncrements: true,
										timeOut: -1
											});
	});
};
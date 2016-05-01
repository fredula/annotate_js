var Annotate = function(){

	'use strict';
	
	var divToWrap;
	var objProps = {};
	var defaultMarkup = '<span class="annotate-bg"></span>';
	var defaultClassIncrements = false;
	var defaultTimeOut = 2000;
	var newNode;


	/**
	*
	*	The entry point of the class
	*	If the obj is defined, get the properties or set default properties using the ternary conditionals
	*	If the obj is not defined, set the objects properties to the default values.
	*
	**/
	var init = function(obj){
		console.log('OBJ', obj);
		if(obj){
			objProps.markup = obj.markup || defaultMarkup;
			objProps.addClassIncrements = obj.addClassIncrements || defaultClassIncrements;
			objProps.timeOut = obj.timeOut || defaultTimeOut;
		}else{
			objProps.markup = defaultMarkup;
			objProps.addClassIncrements = defaultClassIncrements;
			objProps.timeOut = defaultTimeOut;
		}

		getSelectedText();
	};

	/**
	*
	*	Get the selected text. Call the markup function and parse the selected text as a parameter.
	*
	**/
	var getSelectedText = function(){
		if(window.getSelection()){
			var selectedText = window.getSelection();
			var selectedTextString = window.getSelection().toString();
			addMarkup(selectedText);
		}
	};

	var addMarkup = function(textSelection){
		console.log('In add markup', objProps.markup);
		
		if(textSelection.rangeCount){
			if(typeof objProps.markup === 'string'){
				var parser = new DOMParser();
				var doc = parser.parseFromString(objProps.markup, 'text/xml');
			}
			var selectedTextRange = textSelection.getRangeAt(0).cloneRange();

			//create the html elements
			newNode = document.createElement('span');
			var newNodeDiv = document.createElement('div');
			var textField = document.createElement('textarea');
			var saveBtn = document.createElement('input');
			var cancelBtn = document.createElement('input');
			saveBtn.type = 'button';
			saveBtn.value = 'Save';
			cancelBtn.type = 'button';
			cancelBtn.value = 'Cancel';
			//add classes
			newNode.classList.add('annotate-bg');
			newNodeDiv.classList.add('annotate-popup');
			textField.classList.add('annotate-textfield');
			saveBtn.classList.add('save-btn');
			cancelBtn.classList.add('cancel-btn');
			selectedTextRange.surroundContents(newNode);
			//append elements
			newNodeDiv.appendChild(textField);
			newNodeDiv.appendChild(cancelBtn);
			newNodeDiv.appendChild(saveBtn);
			newNode.appendChild(newNodeDiv);

			doEvents();		
		}
	};

	var doEvents = function(){
		var but = document.querySelectorAll('.annotate-bg');
		var saveBut = document.querySelector('.save-btn');
		var closeBut = document.querySelector('.cancel-btn');

		saveBut.addEventListener('click', function(e){
			saveAnnotation(e.target);
		});

		console.log('DO EVENTS', but.length);
		var i;
		for(i = 0; i<but.length; i++){
			but[i].addEventListener('mouseleave', hideDisplay);
			but[i].addEventListener('click', showDisplay);
		}	
	};

	var hideDisplay = function(){
		var lastNode = this.childNodes[this.childNodes.length-1];
		var removeAnnotateDiv;
		if(objProps.timeOut !== -1){
			removeAnnotateDiv = setTimeout(function(){			
				if(lastNode !== null || lastNode !== undefined){
					//console.log('---------', this.firstChild);
					lastNode.style.display = 'none';
					clearTimeout(removeAnnotateDiv);
				}
			}, objProps.timeOut);
		}
	};

	var showDisplay = function(){
		var lastNode = this.childNodes[this.childNodes.length-1];
		if(lastNode !== null || lastNode !== undefined){
			//console.log('---------', this.firstChild);
			lastNode.style.display = 'block';
		}
	};

	var saveAnnotation = function(target){
		var popUp = target.parentNode;
		var input = popUp.firstChild;
		var inputText = input.value;
		console.log('Target', input.value);
	};

	return {
		init: init
	}
};
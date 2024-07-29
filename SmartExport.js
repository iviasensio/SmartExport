var laySet = [];
define( ["jquery",
		 "qlik",
		 "css!./css/SmartExport",
		 "./js/FileSaver",
		 "./js/jquery.wordexport",
		 "./js/html2pdf.bundle.min",
		 "./Properties"
		 ],
	
	function ($,qlik,cssContent,FileSaver,wordexport,htmltopdf,properties) {
		'use strict';	
		
		//$( '<link href="https://fonts.googleapis.com/icon?family=Material+Icons"rel="stylesheet">' ).appendTo( "head" );
		
		function toggleId (currentSelections) {	
			var vWidth = '20000px';
			var vHeight = '50000px';
			var vTableType = '';

		    $( '.qv-object, .qv-panel-sheet' ).each( function ( i, el ) {
				var s = angular.element( el ).scope();

				if ( s.layout || (s.$$childHead && s.$$childHead.layout) ) {
					if(s.model.layout.qInfo.qType == 'table' || s.model.layout.qInfo.qType == 'pivot-table'){// sn-table and sn-pivot-table not supported|| s.model.layout.qInfo.qType == 'qlik-smart-pivot'){
						var layout = s.layout || s.$$childHead.layout, model = s.model || s.$$childHead.model;
						$( el ).append( '<div class="SmartExport-tooltip">' +
						'<a id="SmartExportBtn" class="SmartExport-btn" style="color:' + laySet.color + ';background:' + laySet.background + '" title="' + s.model.layout.qInfo.qType + '"><i class="lui-icon lui-icon--export"></i></a>' +							
						'</div>' );
					}
					$( el ).find('#SmartExportBtn').on( 'click', function () {
						vTableType = this.title;
						
						model.getProperties().then( function ( reply ) {
							var app = qlik.currApp();
							var vObjectId = reply.qInfo.qId;
							var vObjectType = reply.qInfo.qType;

							app.getObject('CurrentSelections').then(function(model){
								
								var QVSmartExport01 = app.getObject( 'QVSmartExport01', vObjectId );
								var QVSmartExport02 = app.getObject( 'QVSmartExport02', vObjectId );
								
								var vModal = '<div id="myModal" class="modal">' +
								'<div class="modal-content">' +
								  '<div class="modal-header">' +
								    '<span class="close"> x </span>' +
								    '<h4> ( need preview ) </h4>' +									    
								    
								  '</div>' +
								  '<div class="modal-body">' +
								    '<div class="box" id = "BOX01"style="width:994px;height:' + vHeight + '">' +
									'<div class="qvobject" id="QVSmartExport01" style="position: relative; width: 994px;height:' + vHeight + ';"></div>' +
									'<div class="qvobject" id="QVSmartExport02" style="position: relative; width: ' + vWidth + ';height: ' + vHeight + ';"></div>' +
									'<div id="ExportEditor" style="position: fixed; z-index:2; width: 100%; height: 100%; left: 0; top: 125px;background:#ccc;opacity:0.8">' +
										'<button id="XLSButton" class="XLSbtn">XLS</button>' +
										'<button id="WordButton" class="Wordbtn">Word</button>' +
										'<button id="PDFButton" class="PDFbtn">PDF</button>' +											
									'</div>' +
								    '</div>' +
								  '</div>' +
								  '<div class="modal-footer">' +
								    '<h3>Modal Footer</h3>' +
								  '</div>' +
								'</div>' +
								'</div>';									
								
								if(document.getElementById('myModal')){										
									document.getElementById('myModal').remove();
								}

								$( document.body ).append( vModal );
							
								var modal = document.getElementById('myModal');

								
								var span = document.getElementsByClassName("close")[0];
								
								modal.style.display = "block";
							
								XLSButton.onclick = function() {
									//buttons treatment
									var vDimLabels = new Array();
									var elements = document.getElementById('QVSmartExport02').getElementsByClassName('lui-button');
								    while(elements.length > 0){
								    	//in case of pivot-table it's necessary to get the dimension labels detailed in the dimension buttons
								    	if(vTableType == 'pivot-table'){
									    	var vDims = elements[0].getElementsByTagName('div');
									    	var vSpan = elements[0].getElementsByTagName('span');
									    	if(vSpan.length > 0){
									    		vDimLabels.push(vDims[0].innerText)
									    	}
									    }
								    	//remove all buttons before export	
								    	elements[0].parentNode.removeChild(elements[0]);									    	
								    }
								    
								    var vTextSelections = '';
								    if(laySet.selections){
										var iterator = currentSelections.length;
										vTextSelections = '<i><u><b style="color:#1f7044">Current Selections</b></u><br>';											
										
										if (iterator == 0) {
											vTextSelections += 'none</i>';
										}
										
										for (var ai = 0;ai < iterator;ai++ ) {
										    var value = currentSelections[ai];
											
											if (value.qSelectedCount > 6) {
											    vTextSelections += '<a style = "color:#375623">';
											    vTextSelections += value.qField + ' : ' + value.translation;
											    vTextSelections += '</a><br>';
											} else {
											    vTextSelections += '<a style = "color:#375623">';
											    vTextSelections += value.qField + ' : ' + value.qSelected;
											    vTextSelections += '</a><br>';
											}
										}
										vTextSelections += '</i>';
									}
									
									modal.style.display = "none";   

									var vEncodeHead = '<html><head><meta charset="UTF-8"></head>';
									var vEncodeCode = document.getElementById('QVSmartExport02');	
									var labels = vEncodeCode.getElementsByTagName("label");
									
									if(labels.length > 1 && labels[1].title == ""){
										labels[1].remove();	
									}
									
									for(var vLabel = 0;vLabel < labels.length;vLabel++){
										if(labels[vLabel].innerText == 'Table' || labels[vLabel].innerText == 'Pivot table' || labels[vLabel].innerText == 'Load previous' || labels[vLabel].innerText == 'Load more'){
											labels[vLabel].remove();
										}
									}

									var header = vEncodeCode.getElementsByTagName("header");
									//in case of pivot-table apply button labels and adjust column width								    
								    if(vTableType == 'pivot-table'){
								    	var re = new RegExp(String.fromCharCode(160), "g");
								    	var tdelements = vEncodeCode.getElementsByTagName('col');
								    	for(var vtd = 1;vtd < tdelements.length;vtd++){								    		
								    		tdelements[vtd].style.cssText = 'width:135px';//that's the std column width for pivot tables values								    		
								    	}
								    	var thelements = vEncodeCode.getElementsByTagName('th');
								    	for(var vth = 0;vth < thelements.length;vth++){								    		
								    		if(thelements[vth].title == String.fromCharCode(160)){
								    			var spanelements = thelements[vth].getElementsByTagName('span');
								    			spanelements[0].innerText = vDimLabels.join(' | ');								    			
								    		}
								    	}
								    }

								    //control titles if applicable
									if(!laySet.title){											
										header[0].remove();
									}else{
										var H1s = header[0].getElementsByTagName("h1");
										if(H1s.length > 0){
									        H1s[0].outerHTML = H1s[0].outerHTML.replace("<h1", "<div").replace("</h1>","</div>");									        									        	
											if(!laySet.subtitle && reply.subtitle != ""){
												var header = vEncodeCode.getElementsByTagName("header");
												var subtitle = header[0].getElementsByTagName("h2");
												subtitle[0].remove();
											}
										}
									}
									if(!laySet.footer){
										var footer = vEncodeCode.getElementsByClassName("qv-footer-wrapper");
										footer[0].remove();
									}
									var vEncodeBody = vEncodeCode.innerHTML.replace("Load previous", "").replace("Load more", "");
									var blob = new Blob([vEncodeHead + vEncodeBody + vTextSelections + '</html>'], {
										type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
										});
									saveAs(blob, "Report.xls");
								}

								WordButton.onclick = function() {
									document.getElementById('BOX01').style.width = vWidth;
									document.getElementById('QVSmartExport01').style.width = vWidth;
									var elements = document.getElementById('QVSmartExport01').getElementsByClassName('lui-button');
								    while(elements.length > 0){
								    	elements[0].parentNode.removeChild(elements[0]);									    	
								    }
									var vTextSelections = '';
									if(laySet.selections){
										var iterator = currentSelections.length;
										
										vTextSelections = '<i><u><b style="color:#1f7044">Current Selections</b></u><br>';										
										
										if (iterator == 0) {
											vTextSelections += 'none</i>';
										}
										
										for (var ai = 0;ai < iterator;ai++ ) {
										    var value = currentSelections[ai];
											
											if (value.qSelectedCount > 6) {
											    vTextSelections += '<a style = "color:#375623">';
											    vTextSelections += value.qField + ' : ' + value.translation;
											    vTextSelections +=  '</a><br>';
																	    
											} else {
											    vTextSelections += '<a style = "color:#375623">';
											    vTextSelections += value.qField + ' : ' + value.qSelected;
											    vTextSelections +=  '</a><br>';											    
											}
										}
										vTextSelections += '</i>';
									}

									
									
									var newNode = document.createElement('div');      
									newNode.innerHTML = vTextSelections;
									
									document.getElementById('QVSmartExport01').appendChild(newNode);
									var vEncodeHead = '<html><head><meta charset="UTF-8"></head>';
									var vEncodeCode = document.getElementById('QVSmartExport01');	
									var labels = vEncodeCode.getElementsByTagName("label");
									
									if(labels.length > 1 && labels[1].title == ""){
										labels[1].remove();	
									}
									
									for(var vLabel = 0;vLabel < labels.length;vLabel++){
										if(labels[vLabel].innerText == 'Table' || labels[vLabel].innerText == 'Pivot table' || labels[vLabel].innerText == 'Load previous' || labels[vLabel].innerText == 'Load more'){
											labels[vLabel].remove();
										}
									}

									var header = vEncodeCode.getElementsByTagName("header");
									if(!laySet.title){											
										header[0].remove();
									}else{
										var H1s = header[0].getElementsByTagName("h1");
										if(H1s.length > 0){
									        H1s[0].outerHTML = H1s[0].outerHTML.replace("<h1", "<div").replace("</h1>","</div>");
									        
									        	
											if(!laySet.subtitle && reply.subtitle != ""){
												var header = vEncodeCode.getElementsByTagName("header");
												var subtitle = header[0].getElementsByTagName("h2");
												subtitle[0].remove();
											}
										}
									}
									if(!laySet.footer){
										var footer = vEncodeCode.getElementsByClassName("qv-footer-wrapper");
										footer[0].remove();
									}
									//var vEncodeBody = vEncodeCode.innerHTML.replace("Load previous", "").replace("Load more", "").replace("get_app", "");	


									$("#QVSmartExport01").wordExport();
									modal.style.display = "none";
								}
								PDFButton.onclick = function() {											
									//var vPortLand = document.getElementById('form_port_land');
									var vPortLandTxt = 'portrait';
									/*if(vPortLand[0].checked){
										vPortLandTxt = 'portrait';
									}*/
									
									var elements = document.getElementById('QVSmartExport01').getElementsByClassName('lui-button');
								    while(elements.length > 0){
								    	elements[0].parentNode.removeChild(elements[0]);									    	
								    }
								    var vTextSelections = '';
								    if(laySet.selections){
										var iterator = currentSelections.length;
										
										vTextSelections = '<i id="SmartExportAdded"><u><b style="color:#1f7044">Current Selections</b></u><br>';											
										
										if (iterator == 0) {
											vTextSelections += 'none</i>';
										}
										
										for (var ai = 0;ai < iterator;ai++ ) {
										    var value = currentSelections[ai];
											
											if (value.qSelectedCount > 6) {
											    vTextSelections += '<a style = "color:#375623">';
											    vTextSelections += value.qField + ' : ' + value.translation;
											    vTextSelections += '</a><br>';
											} else {
											    vTextSelections += '<a style = "color:#375623">';
											    vTextSelections += value.qField + ' : ' + value.qSelected;
											    vTextSelections += '</a><br>';
											}
										}
										vTextSelections += '</i>';
										//$('#QVSmartExport01').append(vTextSelections);
									}

									var vEncodeHead = '<html><head><meta charset="UTF-8"></head>';
									var vEncodeCode = document.getElementById('QVSmartExport01');	
									var vArticles = vEncodeCode.getElementsByTagName('article');
									$(vArticles[(vArticles.length - 1)]).append(vTextSelections);

									var labels = vEncodeCode.getElementsByTagName("label");
									
									if(labels.length > 1 && labels[1].title == ""){
										labels[1].remove();	
									}
									
									for(var vLabel = 0;vLabel < labels.length;vLabel++){
										if(labels[vLabel].innerText == 'Table' || labels[vLabel].innerText == 'Pivot table' || labels[vLabel].innerText == 'Load previous' || labels[vLabel].innerText == 'Load more'){
											labels[vLabel].remove();
										}
									}

									var header = vEncodeCode.getElementsByTagName("header");
									if(!laySet.title){											
										header[0].remove();
									}else{
										var H1s = header[0].getElementsByTagName("h1");
										if(H1s.length > 0){
									        H1s[0].outerHTML = H1s[0].outerHTML.replace("<h1", "<div").replace("</h1>","</div>");								        
									        	
											if(!laySet.subtitle && reply.subtitle != ""){
												var header = vEncodeCode.getElementsByTagName("header");
												var subtitle = header[0].getElementsByTagName("h2");
												subtitle[0].remove();
											}
										}
									}
									if(!laySet.footer){
										var footer = vEncodeCode.getElementsByClassName("qv-footer-wrapper");
										footer[0].remove();
									}
									
									var vEncodeBody = vEncodeCode.innerHTML.replace("Load previous", "").replace("Load more", "");	
									
									//get rows to define how much height I need to apply in the PDF doc
									var heightPDF = ((((vEncodeBody.match(/<tr/g) || []).length) + 3) * 25) + 'px';	
									
									var au = document.getElementById('QVSmartExport01');
									if(vObjectType == 'pivot-table'){
										var headerElements = au.getElementsByClassName('left-meta-headers');
									    while(headerElements.length > 0){										    	
									        headerElements[0].parentNode.removeChild(headerElements[0]);
									    }
									}
									var iconElements = au.getElementsByClassName('lui-icon');
									while(iconElements.length > 0){
										iconElements[0].parentNode.removeChild(iconElements[0]);
									}
									au.style.height = heightPDF;										
																		
									htmltopdf(au, {
							          	margin:       15,
							          	filename:     'QSExport.pdf',
							          	image:        { type: 'jpeg', quality: 0.98 },
							          	html2canvas:  { dpi: 192, letterRendering: false },
							          	jsPDF:        { unit: 'mm', format: 'a4', orientation: vPortLandTxt }
							        });										
									document.getElementById("SmartExportAdded").remove();
									modal.style.display = "none";
								}
								// When the user clicks on <span> (x), close the modal
								span.onclick = function() {
									modal.style.display = "none";    									    									
								}									
							})								
						})
					})
				} 
			})			
		}

		return {
			initialProperties: {
				version: 1.0,
				showTitles: false
			}, 
			definition : properties,
			paint: function ( $element,layout ) {	
				var app = qlik.currApp();
				//var mySelectedFields;
				app.getList("CurrentSelections", function(reply) {
					var mySelectedFields = reply.qSelectionObject.qSelections;					
				
					laySet = { "title":layout.titlebool,"subtitle":layout.subtitlebool,"footer":layout.footerbool,"selections":layout.selectionsbool,"background":layout.iconbackground.color,"color":layout.iconcolor.color};
					$( ".SmartExport-tooltip" ).remove();
					toggleId(mySelectedFields);
				})
			}
		};
	});

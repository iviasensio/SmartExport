define( ["jquery","qlik","css!./SmartExport.css","./FileSaver","./jquery.wordexport"],
	
	function (jquery,qlik) {
		$( '<link href="https://fonts.googleapis.com/icon?family=Material+Icons"rel="stylesheet">' ).appendTo( "head" );
		
		function toggleId () {
			var ancho = '130px';
			var cnt = $( ".SmartExport-tooltip" ).remove();
			if ( cnt.length === 0 ) {
                $( '.qv-object, .qv-panel-sheet' ).each( function ( i, el ) {
					var s = angular.element( el ).scope();
					if ( s.layout || (s.$$childHead && s.$$childHead.layout) ) {
						
						if(s.model.layout.qInfo.qType == 'table' || s.model.layout.qInfo.qType == 'pivot-table'){
							var layout = s.layout || s.$$childHead.layout, model = s.model || s.$$childHead.model;
							$( el ).append( '<div class="SmartExport-tooltip">' +
							'<a class="SmartExport-btn" title="properties"><i class="small material-icons">face</i></a>' +
							
							"</div>" );
						}
						$( el ).find( '.SmartExport-btn' ).on( 'click', function () {
							model.getProperties().then( function ( reply ) {
								var app = qlik.currApp();
								
								var vObjectId = reply.qInfo.qId;
								
								
								
								app.getObject('CurrentSelections').then(function(model){
									var QV01 = app.getObject( 'QV01', vObjectId );																										
									
									
									var vModal = '<div id="myModal" class="modal">' +
									'<div class="modal-content">' +
									  '<div class="modal-header">' +
									    '<span class="close"> x </span>' +
									    '<h4> ( need preview ) </h4>' +									    
									    
									  '</div>' +
									  '<div class="modal-body">' +
									    '<div class="box" style="width:20000px;height: 50000px">' +
										'<div class="qvobject" id="QV01" style="position: relative; width: 20000px;height: 50000px;"></div>' +
										'<div id="ExportEditor" style="position: fixed; z-index:2; width: 100%; height: 100%; left: 0; top: 125px;background:#ccc;opacity:0.8">' +
											'<button id="XLSButton" class="XLSbtn">XLS</button>' +
											'<button id="WordButton" class="Wordbtn">Word</button>' +
										'</div>' +
									    '</div>' +
									  '</div>' +
									  '<div class="modal-footer">' +
									    '<h3>Modal Footer</h3>' +
									  '</div>' +
									'</div>' +
									'</div>';									
									
									
									$( document.body ).append( vModal );
								
									var modal = document.getElementById('myModal');

									
									var span = document.getElementsByClassName("close")[0];
									var btn = document.getElementById("XLSButton");
									modal.style.display = "block";
								
									XLSButton.onclick = function() {
										var iterator = 0;
										iterator = model.layout.qSelectionObject.qSelections.length;
										var currentSelections = new Array();
										currentSelections = model.layout.qSelectionObject.qSelections;
										var vTextSelections='';
										var vTextSelections = '<i><u><b style="color:#1f7044">Current Selections</b></u><br>';
										
										
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
										
										modal.style.display = "none";   
										var vEncodeHead = '<html><head><meta charset="UTF-8"></head>';
										var vEncodeBody = document.getElementById('QV01').innerHTML;
										
										var vWidthIndex = vEncodeBody.lastIndexOf('style="width: ');
										
										var txt = vEncodeBody.substring(vWidthIndex,(vWidthIndex + 24));
										var numb = txt.match(/\d/g);
										numb = numb.join("");
										var numpx = numb + 'px';
										
										
										var re = new RegExp(numpx,"g");

										
										vEncodeBody = vEncodeBody.replace( re,ancho) ;
										var blob = new Blob([vEncodeHead + vEncodeBody + vTextSelections + '</html>'], {
											type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
											});
									
										saveAs(blob, "Report.xls");
									}
									WordButton.onclick = function() {
										var iterator = 0;
										iterator = model.layout.qSelectionObject.qSelections.length;
										var currentSelections = new Array();
										currentSelections = model.layout.qSelectionObject.qSelections;
										var vTextSelections='';
										var vTextSelections = '<i><u><b style="color:#1f7044">Current Selections</b></u><br>';
										
										
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
										modal.style.display = "none";
										
										var newNode = document.createElement('div');      
										newNode.innerHTML = vTextSelections;
										
										document.getElementById('QV01').appendChild(newNode);
										$("#QV01").wordExport();
									}
									
									// When the user clicks on <span> (x), close the modal
									span.onclick = function() {
										modal.style.display = "none";    									    									
									}									
									//$( document.body ).remove( vModal );
								});
								
							});
							
						});
					} 
				} );
			}
		}

		return {
			initialProperties: {
				version: 1.0,
				showTitles: false
			}, paint: function ( $element ) {
				$( ".SmartExport-btn" ).remove();
				$( document.body ).append( "<button class='SmartExport-btn fab'><i class='material-icons'>get_app</i></button>" );
				$( ".SmartExport-btn" ).on( "click", toggleId );
			}
		};

	} );

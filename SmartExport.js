define( ["jquery","qlik","css!./SmartExport.css","./FileSaver"],
	
	function (jquery,qlik) {
		$( '<link href="https://fonts.googleapis.com/icon?family=Material+Icons"rel="stylesheet">' ).appendTo( "head" );
		
		
		function toggleId () {
			var cnt = $( ".SmartExport-tooltip" ).remove();
			if ( cnt.length === 0 ) {
                $( '.qv-object, .qv-panel-sheet' ).each( function ( i, el ) {
					var s = angular.element( el ).scope();
					if ( s.layout || (s.$$childHead && s.$$childHead.layout) ) {
						if(s.model.layout.qInfo.qType == 'table' || s.model.layout.qInfo.qType == 'pivot-table'){
							var layout = s.layout || s.$$childHead.layout, model = s.model || s.$$childHead.model;
							$( el ).append( '<div class="SmartExport-tooltip">' +
							'<a class="SmartExport-btn" title="properties"><i class="small material-icons">input</i></a>' +
							
							"</div>" );
						}
						$( el ).find( '.SmartExport-btn' ).on( 'click', function () {
							model.getProperties().then( function ( reply ) {
								var app = qlik.currApp();
								var vObjectId = reply.qInfo.qId;
								var iterator = 0;
								var currentSelections = new Array();
								app.getObject('CurrentSelections').then(function(model){
									iterator = model.layout.qSelectionObject.qSelections.length;
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
								
									var vEncodeHead = '<html><head><meta charset="UTF-8"></head>';
									var vInputReplace = '<div class="SmartExport-tooltip"><a class="SmartExport-btn" title="properties"><i class="small material-icons">input</i></a></div>';
									var blob = new Blob([vEncodeHead + ((jquery(jquery.find("div[tid*='"+vObjectId+"']")).html().split('<button').join('<!--<button')).split('/button>').join('/button>-->')).split(vInputReplace).join(vTextSelections) + '</html>'], {
										type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
										});
								
									saveAs(blob, "Report.xls");
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

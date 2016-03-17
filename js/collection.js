document.addEventListener('DOMContentLoaded', function () {
	var editor = ace.edit("ace");
    editor.setTheme("ace/theme/monokai");
    editor.getSession().setMode("ace/mode/lucene");
    editor.setValue("", -1);
    editor.setShowPrintMargin(false);

	var request = new XMLHttpRequest();
	request.open('GET', 'http://betterbin.co/aoe2/strategies', true);

	request.onload = function() {
	  if (request.status >= 200 && request.status < 400) {
	    var data = JSON.parse(request.responseText);
	    inflate(data);
	  } else {

	  }
	};
	request.onerror = function() {
	  // There was a connection error of some sort
	};

	request.send();
});



var tmpl_list = `<li>
					
						<div class="">
							<div class="font120 wb">
								TITLE_ELEM
							</div>
							<div class="space20">
							</div>
							<div class="split-box split-box-3">
								<div class="split">
									<div class="op6 font70">
										Civilization:
									</div>
									<div>
										CIV_INFO
									</div>
								</div>
								<div class="split">
									<div class="op6 font70">
										Map:
									</div>
									<div>
										MAP_INFO
									</div>
								</div>
								<div class="split">
									<div class="op6 font70">
										Author:
									</div>
									<div>
										AUTHOR_INFO
									</div>
								</div>
							</div>
						</div>
					
				</li>`;

function inflate(data){
	console.log(data)
	var ul = document.getElementById("listView");
	var list = "";
	data.forEach(function(elem){
		
		list += tmpl_list 	.replace("TITLE_ELEM", elem.title)
							.replace("CIV_INFO", elem.civ)
							.replace("MAP_INFO", elem.map)
							.replace("AUTHOR_INFO", elem.author);
	});

	ul.innerHTML = list;   
}
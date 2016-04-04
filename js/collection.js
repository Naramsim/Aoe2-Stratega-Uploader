var data;
var dataDictionary;
var editor;

document.addEventListener('DOMContentLoaded', function () {
	editor = ace.edit("ace");
    editor.setTheme("ace/theme/monokai");
    editor.getSession().setMode("ace/mode/lucene");
    editor.setValue("", -1);
    editor.setShowPrintMargin(false);

	var request = new XMLHttpRequest();
	request.open('GET', 'http://betterbin.co/aoe/last/10/0', true);

	request.onload = function() {
	  if (request.status >= 200 && request.status < 400) {
	    data = JSON.parse(request.responseText);
	    inflate(data);
	    dataDictionary = reconstructData(data);
	    console.log(dataDictionary);
	  } else {

	  }
	};
	request.onerror = function() {
	  // There was a connection error of some sort
	};

	request.send();
});



var tmpl_list = `<li onclick="changeStrategy('ID');">
					
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
		list += tmpl_list 	.replace("TITLE_ELEM", elem.title_declared)
							.replace("CIV_INFO", elem.civ)
							.replace("MAP_INFO", elem.map)
							.replace("ID", elem._id)
							.replace("AUTHOR_INFO", elem.author);
	});

	ul.innerHTML = list;   
}

function reconstructData(list) {
	var map = {};
	for (var i = 0; i < list.length; ++i) {
	    var id = list[i]._id;
	    if (!map[id]){
	        map[id] = [];
	    }
	    map[id].push(list[i]);
	}
	return map;
}

function changeStrategy(id) {
	try{
		document.getElementsByClassName("hidden")[0].classList.remove("hidden");
	}catch(e){}
	var text = dataDictionary[id];
	var strName = document.getElementById("strName").textContent =text[0].title_declared;
	var strMap = document.getElementById("strMap").textContent =text[0].map;
	var strCiv = document.getElementById("strCiv").textContent =text[0].civ;
	var strAuthor = document.getElementById("strAuthor").textContent =text[0].author;
	editor.setValue(text[0].content, 0);
}
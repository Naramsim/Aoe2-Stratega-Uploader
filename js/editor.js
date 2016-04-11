fc = `Str@v1
Civ: any
Map: any
Name: Fast Castle 
Author: Naramsim
Icon: castle

- 6 on food [sheep]
- 3 on wood [lumber]
    + A R
- house near boar [house]
    + A Q
- loom [tc]
- boar [boar]
- next vil on wood [lumber]
- next vil on boar building a house [house]
    + A Q
- when out of boars berries and two farms [mill]
    + A W, A A
- click feudal with 21 vils [tc]
    + H
- take two on berries and switch them to gold [gold]
    + A E
- swich one on berries and palisade [palisade]
    + S A
- switch two on berries to a new lumbercamp [lumber]
    + A R
- when feudal no upgrades [tc]
- one vil build blacksmith and market afterward [market]
    + A S, A D
- click when 800Food and 200Gold [tc]`;

var re = new RegExp("^Str@(.*)[\r\n]*^Civ:?\s?(.*)[\r\n]*^Map:?\s?(.*)[\r\n]*Name:?\s?(.*)[\r\n]*Author:?\s?(.*)[\r\n]*^Icon:\s?(.*)", "m");

getLocal = function(name) {
	return localStorage.getItem(name);
};

setLocal = function (argument) {
    var s = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789£$&^";
    var X = Array(9).join().split(',').map(function() { return s.charAt(Math.floor(Math.random() * s.length)); }).join('');
    localStorage.setItem("XDAB", X);
};

function star(id){
    var request = new XMLHttpRequest();
    request.open('POST', 'betterbin.co/aoe/stars', true);
    request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    request.onreadystatechange = function () { 
        if (request.readyState == 4 && request.status == 200) {
            var json = JSON.parse(request.responseText);
            console.log(json);
        }
    }
    request.send(JSON.stringify({"id":id}));
}

function download(id){
    var request = new XMLHttpRequest();
    request.open('POST', 'betterbin.co/aoe/download', true);
    request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    request.onreadystatechange = function () { 
        if (request.readyState == 4 && request.status == 200) {
            var json = JSON.parse(request.responseText);
            console.log(json);
        }
    }
    request.send(JSON.stringify({"id":id}));
}

function _delete(id, xdab){
    var request = new XMLHttpRequest();
    request.open('POST', 'betterbin.co/aoe/delete', true);
    request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    request.onreadystatechange = function () { 
        if (request.readyState == 4 && request.status == 200) {
            var json = JSON.parse(request.responseText);
            console.log(json);
            myToast.start("Your strategy has been deleted", "SUCCESS");
        }
    }
    request.send(JSON.stringify({"id":id, "xdab":xdab}));
}

function search(what){
    var request = new XMLHttpRequest();
    request.open('POST', 'betterbin.co/aoe/search', true);
    request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    request.onreadystatechange = function () { 
        if (request.readyState == 4 && request.status == 200) {
            var json = JSON.parse(request.responseText);
            console.log(json);
        }
    }
    request.send(JSON.stringify({"match":what}));
}

document.addEventListener('DOMContentLoaded', function () {
	var XDAB;
    if(getLocal("XDAB") !== null){
        XDAB = getLocal("XDAB");
    }else{
        setLocal("XDAB");
    }

	var editor = ace.edit("ace");
    editor.setTheme("ace/theme/monokai");
    editor.getSession().setMode("ace/mode/lucene");
    editor.setValue(fc, -1);
    editor.setShowPrintMargin(false);

    var myToast = new Toast(); //create the object
    myToast.stayOnFor(2100);

    var submit = document.getElementById("submit-strategy");
    var author;
    var title_declared;
    submit.addEventListener("click", function() {
        var name = DOMPurify.sanitize(document.getElementById("strategy_name").value).trim();
        var strategy_content = editor.getValue();
        strategy_content = DOMPurify.sanitize(strategy_content);
        strategy_content = strategy_content.replace(/"|'|`/g , "");
        match = strategy_content.match(re);
        if(match !== null ){
            title_declared = match[4].trim();
            author = match[5].trim();
            if(title_declared !== name) {
                console.log("titles should be equals");
                myToast.start("Titles should be equals", "ERROR");
            }else{
                var to_send = {
                    name: "",
                    content: "",
                    xdab: "default"
                };

                to_send.name = name;
                to_send.content = strategy_content;
                XDAB === undefined ? XDAB = "default" : XDAB = XDAB;
                to_send.xdab = XDAB;
                to_send = JSON.stringify(to_send);
                console.log(to_send);

                var request = new XMLHttpRequest();
                request.open('POST', 'betterbin.co/aoe/strategies', true);
                request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
                request.onreadystatechange = function () { 
                    if (request.readyState == 4 && request.status == 200) {
                        var json = JSON.parse(request.responseText);
                        console.log(json);
                        myToast.start("Your strategy has been uploaded", "SUCCESS");
                    }
                }
                request.send(to_send);
            }
        }else{
            console.log("invalid");
            myToast.start("Invalid pattern in your strategy", "ERROR");
        }
        
    });
});


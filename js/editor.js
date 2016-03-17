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

document.addEventListener('DOMContentLoaded', function () {
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
        match = /*re.match(strategy_content);*/strategy_content.match(re);
        if(match !== null ){
            title_declared = match[4].trim();
            author = match[5].trim();
            if(title_declared !== name) {
                console.log("titles should be equals");
                myToast.start("Titles should be equals", "ERROR");
            }else{
                console.log("success " + author);
                myToast.start("Your strategy has been uploaded", "SUCCESS");
            }
        }else{
            console.log("invalid");
            myToast.start("Invalid pattern in your strategy", "ERROR");
        }

        var to_send = {
            name: "",
            content: ""
        };

        to_send.name = name;
        to_send.content = strategy_content;
        to_send = JSON.stringify(to_send);

        // var request = new XMLHttpRequest();
        // request.open('POST', 'http://localhost:3000/aoe2/strategies', true);
        // request.setRequestHeader('Content-Type', 'text/plain; charset=UTF-8');
        // request.onreadystatechange = function () { 
        //     if (request.readyState == 4 && request.status == 201) {
        //         var json = JSON.parse(request.responseText);
        //         console.log(json);
        //         //Notify.startToast(2000,"GOOD", "your strategy have been uploaded")
        //     }
        // }
        // request.send(to_send);
    });
});


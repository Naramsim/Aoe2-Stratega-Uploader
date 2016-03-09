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

document.addEventListener('DOMContentLoaded', function () {
	var editor = ace.edit("ace");
    editor.setTheme("ace/theme/monokai");
    editor.getSession().setMode("ace/mode/lucene");
    editor.setValue(fc, -1);
    editor.setShowPrintMargin(false);
});
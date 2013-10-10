// ==UserScript==
// @name           Bottom My Threads Link
// @namespace      KeenIIDX
// @description    Adds 'My Threads' Link to the bottom of forum pages
// @include        http://arstechnica.com/civis/*
// @author         Elliott Wilcoxon
// @require        http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.0/jquery-ui.js
// @grant          none

// ==/UserScript==

function with_jquery(f) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.textContent = "(" + f.toString() + ")(jQuery)";
    document.body.appendChild(script);
};

with_jquery(function($) {
link='<div style="float: left; margin-right: 1em; background: url(http://cdn.arstechnica.net/civis/ars/imageset/topic_unread_mine.png) no-repeat scroll transparent;"><a href="./search.php?search_id=egosearch">My Threads</a></div>'
$('.subscribe-actions').append(link)
});

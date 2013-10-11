// ==UserScript==
// @name           Unparticipate in Threads
// @namespace      KeenIIDX
// @description    Whitelist/Blacklist posted-in threads to behave like you haven't posted in them.
// @include        http://arstechnica.com/civis/viewforum.php*
// @author         Elliott Wilcoxon
// @grant          none

// ==/UserScript==

function with_jquery(f) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.textContent = "(" + f.toString() + ")(jQuery)";
    document.body.appendChild(script);
};

with_jquery(function($) {
	var prefix = "participatedThreads";
	function setStorage (key, value) {
		localStorage.setItem(prefix + key, JSON.stringify(value));
	}
	function getStorage (key) {
		return JSON.parse(localStorage.getItem(prefix + key));
	}
	function removeStorage (key) {
		localStorage.removeItem(prefix + key);
	}

	var imgNormalRead = document.createElement('img');
	imgNormalRead.setAttribute("src", "//cdn.arstechnica.net/civis/ars/imageset/topic_read.png");
	imgNormalRead.setAttribute("width", "17");
	imgNormalRead.setAttribute("height", "17");
	imgNormalRead.setAttribute("alt", "No unread posts");
	imgNormalRead.setAttribute("title", "No unread posts");

	var imgNormalUnread = document.createElement('img');
	imgNormalUnread.setAttribute("src", "//cdn.arstechnica.net/civis/ars/imageset/topic_unread.png");
	imgNormalUnread.setAttribute("width", "17");
	imgNormalUnread.setAttribute("height", "17");
	imgNormalUnread.setAttribute("alt", "Unread posts");
	imgNormalUnread.setAttribute("title", "Unread posts");

	var imgPostedRead = document.createElement('img');
	imgPostedRead.setAttribute("src", "//cdn.arstechnica.net/civis/ars/imageset/topic_unread_mine.png");
	imgPostedRead.setAttribute("width", "17");
	imgPostedRead.setAttribute("height", "17");
	imgPostedRead.setAttribute("alt", "Unread posts");
	imgPostedRead.setAttribute("title", "Unread posts");
	
	var imgPostedUnread = document.createElement('img');
	imgPostedUnread.setAttribute("src", "//cdn.arstechnica.net/civis/ars/imageset/topic_unread_mine.png");
	imgPostedUnread.setAttribute("width", "17");
	imgPostedUnread.setAttribute("height", "17");
	imgPostedUnread.setAttribute("alt", "Unread posts");
	imgPostedUnread.setAttribute("title", "Unread posts");
	
	var imgLockedRead = document.createElement('img');
	imgLockedRead.setAttribute("src", "//cdn.arstechnica.net/civis/ars/imageset/topic_locked.png");
	imgLockedRead.setAttribute("width", "17");
	imgLockedRead.setAttribute("height", "17");
	imgLockedRead.setAttribute("alt", "This topic is locked, you cannot edit posts or make further replies.");
	imgLockedRead.setAttribute("title", "This topic is locked, you cannot edit posts or make further replies.");

	var imgLockedUnread = document.createElement('img');
	imgLockedUnread.setAttribute("src", "//cdn.arstechnica.net/civis/ars/imageset/topic_locked.png");
	imgLockedUnread.setAttribute("width", "17");
	imgLockedUnread.setAttribute("height", "17");
	imgLockedUnread.setAttribute("alt", "Unread posts");
	imgLockedUnread.setAttribute("title", "Unread posts");

	// TODO: Add Stickies.
	/* We have two posting states, posted in and unposted in.  Then we have two read states, read and unread.  On top of that, we have 3 types of threads: normal, stickies, and locked.
	*/

});

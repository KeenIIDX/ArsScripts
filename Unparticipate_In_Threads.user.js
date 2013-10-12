// ==UserScript==
// @name           Unparticipate in Threads
// @namespace      KeenIIDX
// @description    Whitelist/Blacklist posted-in threads to behave like you haven't posted in them.
// @include        http://arstechnica.com/civis/*
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
	imgPostedRead.setAttribute("src", "//cdn.arstechnica.net/civis/ars/imageset/topic_read_mine.png");
	imgPostedRead.setAttribute("width", "17");
	imgPostedRead.setAttribute("height", "17");
	imgPostedRead.setAttribute("alt", "No unread posts");
	imgPostedRead.setAttribute("title", "No unread posts");
	
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

	var imgStickyRead = document.createElement('img');
	imgStickyRead.setAttribute("src", "//cdn.arstechnica.net/civis/ars/imageset/sticky_read_mine.png");
	imgStickyRead.setAttribute("width", "17");
	imgStickyRead.setAttribute("height", "17");
	imgStickyRead.setAttribute("alt", "No unread posts");
	imgStickyRead.setAttribute("title", "No unread posts");

	var imgStickyUnread = document.createElement('img');
	imgStickyUnread.setAttribute("src", "//cdn.arstechnica.net/civis/ars/imageset/sticky_unread_mine.png");
	imgStickyUnread.setAttribute("width", "17");
	imgStickyUnread.setAttribute("height", "17");
	imgStickyUnread.setAttribute("alt", "Unread posts");
	imgStickyUnread.setAttribute("title", "Unread posts");


	/* We have two posting states, posted in and unposted in.  Then we have two read states, read and unread.  On top of that, we have 3 types of threads: normal, stickies, and locked.
	
	
	URL formats:
	Forum homepage:
	http://arstechnica.com/civis/index.php
	
	Forum group:
	http://arstechnica.com/civis/viewforum.php?f=1
	
	Forum:
	http://arstechnica.com/civis/viewforum.php?f=3
	
	Thread:
	http://arstechnica.com/civis/viewtopic.php?f=3&t=1108141
	
	Specific post in a thread:
	http://arstechnica.com/civis/viewtopic.php?f=3&t=1108141&p=25464013#p25464013
	
	First unread post:
	http://arstechnica.com/civis/viewtopic.php?f=3&t=1108141&view=unread#unread
	*/
	
	if (document.URL.indexOf("viewforum") !== -1) {
	// We're looking at a forum or forum group.
	}
	
	if (document.URL.indexOf("viewtopic") !== -1) {
	// We're in a thread.
	
		var toggleButton = document.createElement('div');
		var toggleLink = document.createElement('a');

		$(toggleLink).attr('href', 'javascript:void(0);')
					.html('Toggle posted-in')
					.css({		display: 'block',
								'padding-left': '21px',
								background: 'url(http://cdn.arstechnica.net/civis/ars//imageset/en/_mark_read.png) no-repeat scroll left top transparent'
						});

		// TODO add event handler
						
		$(toggleButton).append(toggleLink)
						.addClass('toggle')
						.css({	float: 'left',
								'margin-right': '1em',
							});

		$('.subscribe-actions').append(toggleButton);
	}
});

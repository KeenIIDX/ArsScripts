// ==UserScript==
// @name           Unparticipate in Threads
// @namespace      KeenIIDX
// @description    Whitelist/Blacklist posted-in threads to behave like you haven't posted in them.
// @include        http://arstechnica.com/civis/*
// @author         Elliott Wilcoxon
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.js
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
	var threads = "uninitialized";
	
	function setStorage (key, value) {
		localStorage.setItem(prefix + key, JSON.stringify(value));
	}
	function getStorage (key) {
		return JSON.parse(localStorage.getItem(prefix + key));
	}
	function removeStorage (key) {
		localStorage.removeItem(prefix + key);
	}

	var imgPrefix = "http://cdn.arstechnica.net/civis/ars/imageset/"
	var imgNormalReadUnposted 	= imgPrefix + "topic_read.png";
	var imgNormalUnreadUnposted	= imgPrefix + "topic_unread.png";
	var imgNormalReadPosted		= imgPrefix + "topic_read_mine.png";
	var imgNormalUnreadPosted	= imgPrefix + "topic_unread_mine.png";
	var imgStickyReadPosted		= imgPrefix + "sticky_read_mine.png";
	var imgStickyUnreadPosted	= imgPrefix + "sticky_unread_mine.png";
	var imgStickyReadUnposted	= imgPrefix + "sticky_read.png";
	var imgStickyUnreadUnposted	= imgPrefix + "sticky_unread.png";
	var imgPollReadUnposted		= imgPrefix + "poll_read.png";
	var imgPollUnreadUnposted	= imgPrefix + "poll_unread.png";
	var imgPollReadPosted		= imgPrefix + "poll_read_mine.png";
	var imgPollUnreadPosted		= imgPrefix + "poll_unread_mine.png";

	function syncThreads () {
		if (Array.isArray(threads)) {
			setStorage("threads", threads);
		} else {
			threads = getStorage("threads") || [];
		}
	}

	function toggleThread (fullLink) {
		var thread = /f=\d+&t=\d+/.exec(fullLink)[0];
		var threadIndex = threads.indexOf(thread);
		
		if (threadIndex === -1) {
			threads.push(thread);
		} else {
			threads.splice(threadIndex, 1);
		}
		
		$(toggleLink).children().toggle();
		
		syncThreads();
	}

	// Initialize threads variable.
	syncThreads();
	
	// Do stuff.
	
	if (document.URL.indexOf("viewforum") !== -1) {
	// We're looking at a forum or forum group.
		
		// Build selector that matches all the toggled threads.
		var threadsSelector = "";
		threads.forEach( function (item) {
			threadsSelector += 'a[href*="' + item + '&"]>img,';
		});
		threadsSelector = threadsSelector.slice(0,-1);
		
		// Grab list of threads.  For each of the ones in threads, toggle the icon type.
		$(threadsSelector).each(function () {
			if (this.src === imgNormalReadUnposted) {
				this.src = imgNormalReadPosted;
			} else if (this.src === imgNormalReadPosted) {
				this.src = imgNormalReadUnposted;
			} else if (this.src === imgNormalUnreadUnposted) {
				this.src = imgNormalUnreadPosted;
			} else if (this.src === imgNormalUnreadPosted) {
				this.src = imgNormalUnreadUnposted;
			} else if (this.src === imgStickyReadPosted) {
				this.src = imgStickyReadUnposted;
			} else if (this.src === imgStickyReadUnposted) {
				this.src = imgStickyReadPosted;
			} else if (this.src === imgStickyUnreadPosted) {
				this.src = imgStickyUnreadUnposted;
			} else if (this.src === imgStickyUnreadUnposted) {
				this.src = imgStickyUnreadPosted;
			} else if (this.src === imgPollReadPosted) {
				this.src = imgPollReadUnposted;
			} else if (this.src === imgPollReadUnposted) {
				this.src = imgPollReadPosted;
			} else if (this.src === imgPollUnreadPosted) {
				this.src = imgPollUnreadUnposted;
			} else if (this.src === imgPollUnreadUnposted) {
				this.src = imgPollUnreadPosted;
			}
		});
	}
	
	if (document.URL.indexOf("egosearch") !== -1) {
	// We're in My Threads.
	
		var toggleEgo = $('<a>').attr('href', 'javascript:void(0);')
			.addClass('toggle')
			.html('<img src="http://cdn.arstechnica.net/civis/ars/imageset/en/_mark_read.png">')
			.css({ float: 'right' })
			.click(function () {toggleThread($(this).siblings('.topictitle').attr('href'));
								$(this).parents('tr').fadeOut('slow', function() {$(this).remove();});})
			.appendTo('.topic-title');
	
		// Build selector that matches all the toggled threads.
		var threadsSelector = "";
		threads.forEach( function (item) {
			threadsSelector += 'a[href*="' + item + '&"]>img,';
		});
		threadsSelector = threadsSelector.slice(0,-1);
		
		// Grab list of threads.  For each of the ones that should be shown as unposted, hide.
		$(threadsSelector).parents('tr').remove();
	}
	
	if (document.URL.indexOf("viewtopic") !== -1) {
	// We're in a thread.
	
		var toggleLink = $('<a>').attr('href', 'javascript:void(0);')
			.html('<span style="" >Toggle participation</span><span style="display: none;" >Untoggle participation</span>')
			.css({	display: 'block',
					'padding-left': '21px',
					background: 'url(http://cdn.arstechnica.net/civis/ars/imageset/en/_mark_read.png) no-repeat scroll left top transparent'
		});
		
		var toggleButton = $('<div>').append(toggleLink)
			.addClass('toggle')
			.css({	float: 'left',
					'margin-right': '1em'
			})
			.click(function () {toggleThread(document.URL);});
		
		$('.subscribe-actions').append(toggleButton);
		
		var thread = /f=\d+&t=\d+/.exec(document.URL)[0];
		if (threads.indexOf(thread) !== -1) {
			$(toggleLink).children().toggle();
		}
	}
});

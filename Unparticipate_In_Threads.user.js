// ==UserScript==
// @name           Unparticipate in Threads
// @namespace      KeenIIDX
// @description    Whitelist/Blacklist posted-in threads to behave like you haven't posted in them.
// @include        http://arstechnica.com/civis/*
// @author         Elliott Wilcoxon
// @require        http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.1/jquery-ui.js
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

	var imgNormalReadUnposted = "http://cdn.arstechnica.net/civis/ars/imageset/topic_read.png";
	var imgNormalUnreadUnposted = "http://cdn.arstechnica.net/civis/ars/imageset/topic_unread.png";
	var imgNormalReadPosted = "http://cdn.arstechnica.net/civis/ars/imageset/topic_read_mine.png";
	var imgNormalUnreadPosted = "http://cdn.arstechnica.net/civis/ars/imageset/topic_unread_mine.png";
	var imgStickyReadPosted = "http://cdn.arstechnica.net/civis/ars/imageset/sticky_read_mine.png";
	var imgStickyUnreadPosted = "http://cdn.arstechnica.net/civis/ars/imageset/sticky_unread_mine.png";
	var imgStickyReadUnposted = "http://cdn.arstechnica.net/civis/ars/imageset/sticky_read.png";
	var imgStickyUnreadUnposted = "http://cdn.arstechnica.net/civis/ars/imageset/sticky_unread.png";
	var imgPollReadUnposted = "http://cdn.arstechnica.net/civis/ars/imageset/poll_read.png";
	var imgPollUnreadUnposted = "http://cdn.arstechnica.net/civis/ars/imageset/poll_unread.png";
	var imgPollReadPosted = "http://cdn.arstechnica.net/civis/ars/imageset/poll_read_mine.png";
	var imgPollUnreadPosted = "http://cdn.arstechnica.net/civis/ars/imageset/poll_unread_mine.png";

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
	
		var toggleButton = document.createElement('div');
		var toggleLink = document.createElement('a');

		$(toggleLink).attr('href', 'javascript:void(0);')
			.html('Toggle posted-in')
			.css({	display: 'block',
					'padding-left': '21px',
					background: 'url(http://cdn.arstechnica.net/civis/ars/imageset/en/_mark_read.png) no-repeat scroll left top transparent'
		});
		
		$(toggleButton).append(toggleLink)
			.addClass('toggle')
			.css({	float: 'left',
					'margin-right': '1em'
			})
			.click(function () {toggleThread(document.URL)});

		$('.subscribe-actions').append(toggleButton);
	}
});

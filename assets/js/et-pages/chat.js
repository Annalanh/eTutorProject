"use strict";
/**
 * DOM Elements
 */
const $chatListBox = KTUtil.getByID('kt_chat_aside');
const $messageBox = KTUtil.getByID('kt_chat_content');

/**
 * initialize beautiful scroll bar for chat list box (left)
 */
function initChatListBoxScrollBar(){
    /**
     * Mobile offcanvas for mobile mode
     */
    let offcanvas = new KTOffcanvas($chatListBox, {
        overlay: true,  
        baseClass: 'kt-app__aside',
        closeBy: 'kt_chat_aside_close',
        toggleBy: 'kt_chat_aside_mobile_toggle'
    }); 
    /**
     * get scroll bar element within the chat box element
     */
    let scrollBarEl = KTUtil.find($chatListBox, '.kt-scroll');
    if (!scrollBarEl) {
        return;
    }
    /**
     *  Initialize perfect scrollbar
     */
    KTUtil.scrollInit(scrollBarEl, {
        mobileNativeScroll: true,  // enable native scroll for mobile
        desktopNativeScroll: false, // disable native scroll and use custom scroll for desktop 
        resetHeightOnDestroy: true,  // reset css height on scroll feature destroyed
        handleWindowResize: true, // recalculate hight on window resize
        rememberPosition: true, // remember scroll position in cookie
        height: function() {  // calculate height
            let height;
            let portletBodyEl = KTUtil.find($chatListBox, '.kt-portlet > .kt-portlet__body');
            let widgetEl = KTUtil.find($chatListBox, '.kt-widget.kt-widget--users');
            let searchbarEl = KTUtil.find($chatListBox, '.kt-searchbar');

            if (KTUtil.isInResponsiveRange('desktop')) {
                height = KTLayout.getContentHeight();
            } else {
                height = KTUtil.getViewPort().height;
            }

            if ($chatListBox) {
                height = height - parseInt(KTUtil.css($chatListBox, 'margin-top')) - parseInt(KTUtil.css($chatListBox, 'margin-bottom'));
                height = height - parseInt(KTUtil.css($chatListBox, 'padding-top')) - parseInt(KTUtil.css($chatListBox, 'padding-bottom'));
            }

            if (widgetEl) {
                height = height - parseInt(KTUtil.css(widgetEl, 'margin-top')) - parseInt(KTUtil.css(widgetEl, 'margin-bottom'));
                height = height - parseInt(KTUtil.css(widgetEl, 'padding-top')) - parseInt(KTUtil.css(widgetEl, 'padding-bottom'));
            }

            if (portletBodyEl) {
                height = height - parseInt(KTUtil.css(portletBodyEl, 'margin-top')) - parseInt(KTUtil.css(portletBodyEl, 'margin-bottom'));
                height = height - parseInt(KTUtil.css(portletBodyEl, 'padding-top')) - parseInt(KTUtil.css(portletBodyEl, 'padding-bottom'));
            }

            if (searchbarEl) {
                height = height - parseInt(KTUtil.css(searchbarEl, 'height'));
                height = height - parseInt(KTUtil.css(searchbarEl, 'margin-top')) - parseInt(KTUtil.css(searchbarEl, 'margin-bottom'));
            }

            // remove additional space
            height = height - 5;
            
            return height;
        } 
    });
}
initChatListBoxScrollBar()

/**
 * initialize beautiful scroll bar for chat message box (right)
 */
function initMessageBoxScrollBar(){
    var messageListEl = KTUtil.find($messageBox, '.kt-scroll');

    if (!messageListEl) {
        return;
    }

    // initialize perfect scrollbar(see:  https://github.com/utatti/perfect-scrollbar)
    KTUtil.scrollInit(messageListEl, {
        windowScroll: false, // allow browser scroll when the scroll reaches the end of the side
        mobileNativeScroll: true,  // enable native scroll for mobile
        desktopNativeScroll: false, // disable native scroll and use custom scroll for desktop
        resetHeightOnDestroy: true,  // reset css height on scroll feature destroyed
        handleWindowResize: true, // recalculate hight on window resize
        rememberPosition: true, // remember scroll position in cookie
        height: function() {  // calculate height
            var height;

            // Mobile mode
            if (KTUtil.isInResponsiveRange('tablet-and-mobile')) {
                return KTUtil.hasAttr(messageListEl, 'data-mobile-height') ? parseInt(KTUtil.attr(messageListEl, 'data-mobile-height')) : 300;
            }

            // Desktop mode
            if (KTUtil.isInResponsiveRange('desktop') && KTUtil.hasAttr(messageListEl, 'data-height')) {
                return parseInt(KTUtil.attr(messageListEl, 'data-height'));
            }

            var chatEl = KTUtil.find($messageBox, '.kt-chat');
            var portletHeadEl = KTUtil.find($messageBox, '.kt-portlet > .kt-portlet__head');
            var portletBodyEl = KTUtil.find($messageBox, '.kt-portlet > .kt-portlet__body');
            var portletFootEl = KTUtil.find($messageBox, '.kt-portlet > .kt-portlet__foot');

            if (KTUtil.isInResponsiveRange('desktop')) {
                height = KTLayout.getContentHeight();
            } else {
                height = KTUtil.getViewPort().height;
            }

            if (chatEl) {
                height = height - parseInt(KTUtil.css(chatEl, 'margin-top')) - parseInt(KTUtil.css(chatEl, 'margin-bottom'));
                height = height - parseInt(KTUtil.css(chatEl, 'padding-top')) - parseInt(KTUtil.css(chatEl, 'padding-bottom'));
            }

            if (portletHeadEl) {
                height = height - parseInt(KTUtil.css(portletHeadEl, 'height'));
                height = height - parseInt(KTUtil.css(portletHeadEl, 'margin-top')) - parseInt(KTUtil.css(portletHeadEl, 'margin-bottom'));
            }

            if (portletBodyEl) {
                height = height - parseInt(KTUtil.css(portletBodyEl, 'margin-top')) - parseInt(KTUtil.css(portletBodyEl, 'margin-bottom'));
                height = height - parseInt(KTUtil.css(portletBodyEl, 'padding-top')) - parseInt(KTUtil.css(portletBodyEl, 'padding-bottom'));
            }

            if (portletFootEl) {
                height = height - parseInt(KTUtil.css(portletFootEl, 'height'));
                height = height - parseInt(KTUtil.css(portletFootEl, 'margin-top')) - parseInt(KTUtil.css(portletFootEl, 'margin-bottom'));
            }

            // remove additional space
            height = height - 5;

            return height;
        }
    });

    // messaging
    var handleMessaging = function() {
        var scrollEl = KTUtil.find($messageBox, '.kt-scroll');
        var messagesEl = KTUtil.find($messageBox, '.kt-chat__messages');
        var textarea = KTUtil.find($messageBox, '.kt-chat__input textarea');

        if (textarea.value.length === 0 ) {
            return;
        }

        var node = document.createElement("DIV");
        KTUtil.addClass(node, 'kt-chat__message kt-chat__message--brand kt-chat__message--right');

        var html =
            '<div class="kt-chat__user">' +
                '<span class="kt-chat__datetime">Just now</span>' +
                '<a href="#" class="kt-chat__username">Jason Muller</span></a>' +
                '<span class="kt-media kt-media--circle kt-media--sm">' +
                    '<img src="./assets/media/users/100_12.jpg" alt="image">'  +
                '</span>' +
            '</div>' +
            '<div class="kt-chat__text kt-bg-light-brand">' +
                textarea.value
            '</div>';

        KTUtil.setHTML(node, html);
        messagesEl.appendChild(node);
        textarea.value = '';
        scrollEl.scrollTop = parseInt(KTUtil.css(messagesEl, 'height'));

        var ps;
        if (ps = KTUtil.data(scrollEl).get('ps')) {
            ps.update();
        }

        setTimeout(function() {
            var node = document.createElement("DIV");
            KTUtil.addClass(node, 'kt-chat__message kt-chat__message--success');

            var html =
                '<div class="kt-chat__user">' +
                    '<span class="kt-media kt-media--circle kt-media--sm">' +
                        '<img src="./assets/media/users/100_13.jpg" alt="image">'  +
                    '</span>' +
                    '<a href="#" class="kt-chat__username">Max Born</span></a>' +
                    '<span class="kt-chat__datetime">Just now</span>' +
                '</div>' +
                '<div class="kt-chat__text kt-bg-light-success">' +
                'Right before vacation season we have the next Big Deal for you. <br>Book the car of your dreams and save up to <b>25%*</b> worldwide.' +
                '</div>';

            KTUtil.setHTML(node, html);
            messagesEl.appendChild(node);
            textarea.value = '';
            scrollEl.scrollTop = parseInt(KTUtil.css(messagesEl, 'height'));

            var ps;
            if (ps = KTUtil.data(scrollEl).get('ps')) {
                ps.update();
            }
        }, 2000);
    }

    // attach events
    KTUtil.on($messageBox, '.kt-chat__input textarea', 'keydown', function(e) {
        if (e.keyCode == 13) {
            handleMessaging();
            e.preventDefault();

            return false;
        }
    });

    KTUtil.on($messageBox, '.kt-chat__input .kt-chat__reply', 'click', function(e) {
        handleMessaging();
    });
	
}
initMessageBoxScrollBar()
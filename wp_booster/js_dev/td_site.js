/*
    tagDiv - 2014
    Our portfolio:  http://themeforest.net/user/tagDiv/portfolio
    Thanks for using our theme! :)
*/


/* global jQuery:false */
/* global tdUtil:false */
/* global tdModalImageLastEl:{} */
/* global tdEvents:{} */


"use strict";





/*  ----------------------------------------------------------------------------
    On load
 */
jQuery().ready(function jQuery_ready() {

    //retina images
    td_retina();



    // the mobile pull left menu (off canvas)
    //td_mobile_menu();

    //handles the toogle efect on mobile menu
    td_mobile_menu_toogle();


    //resize all the videos if we have them
    td_resize_videos();

    //fake placeholder for ie
    jQuery('input, textarea').placeholder();

    //more stories box
    td_more_articles_box.init();

    //used for smart lists
    td_smart_lists_magnific_popup();

    //smart list drop down pagination
    td_smart_list_dropdown();

    // the top menu date
    if (typeof tdsDateFormat !== 'undefined') {

        // php time() equivalent - js deals in milliseconds and php in seconds
        var tdsDateTimestamp = Math.floor(new Date().getTime() / 1000);

        // replace the date
        var tdNewDateI18n = td_date_i18n(tdsDateFormat, tdsDateTimestamp);
        jQuery('.td_data_time').text(tdNewDateI18n);
    }

    setMenuMinHeight();

    // prevents comments form submission without filing the required form fields
    td_comments_form_validation();

}); //end on load


/**
 * smart lists drop down pagination redirect
 */
function td_smart_list_dropdown() {
    jQuery('.td-smart-list-dropdown').on('change', function() {
        window.location = this.value;
    });
}


/**
 * More stories box
 */
var td_more_articles_box = {
    is_box_visible:false,
    cookie:'',
    distance_from_top:400,

    init: function init() {


        //read the cookie
        td_more_articles_box.cookie = td_read_site_cookie('td-cookie-more-articles');


        //setting distance from the top
        if(!isNaN(parseInt(tds_more_articles_on_post_pages_distance_from_top)) && isFinite(tds_more_articles_on_post_pages_distance_from_top) && parseInt(tds_more_articles_on_post_pages_distance_from_top) > 0){
            td_more_articles_box.distance_from_top = parseInt(tds_more_articles_on_post_pages_distance_from_top);
        } else {
            td_more_articles_box.distance_from_top = 400;
        }

        //adding event to hide the box
        jQuery('.td-close-more-articles-box').click(function(){

            //hiding the box
            jQuery('.td-more-articles-box').removeClass('td-front-end-display-block');
            jQuery('.td-more-articles-box').hide();

            //cookie life
            if(!isNaN(parseInt(tds_more_articles_on_post_time_to_wait)) && isFinite(tds_more_articles_on_post_time_to_wait)){
                //setting cookie
                td_set_cookies_life(['td-cookie-more-articles', 'hide-more-articles-box', parseInt(tds_more_articles_on_post_time_to_wait)*86400000]);//86400000 is the number of milliseconds in a day
            }
        });
    },

    /**
     * called by tdEvents.js on scroll
     */
    td_events_scroll: function td_events_scroll(scrollTop) {

        if(tdIsScrollingAnimation) { //do not fire the event on animations
            return;
        }

        //check to see if it's enable form panel and also from cookie
        if(tdUtil.getBackendVar('tds_more_articles_on_post_enable') == "show" && td_more_articles_box.cookie != 'hide-more-articles-box') {

            if (scrollTop > td_more_articles_box.distance_from_top ) {
                if (td_more_articles_box.is_box_visible === false) {
                    jQuery('.td-more-articles-box').addClass('td-front-end-display-block');
                    td_more_articles_box.is_box_visible = true;
                }
            } else {
                if (td_more_articles_box.is_box_visible === true) {
                    jQuery('.td-more-articles-box').removeClass('td-front-end-display-block');
                    td_more_articles_box.is_box_visible = false;
                }
            }
        }
    }
};






var td_resize_timer_id;
jQuery(window).resize(function() {
    clearTimeout(td_resize_timer_id);
    td_resize_timer_id = setTimeout(function() {
        td_done_resizing();
    }, 200);

});

function td_done_resizing(){
    td_resize_videos();
}



/*  ----------------------------------------------------------------------------
    Resize the videos
 */
function td_resize_videos() {
    //youtube in content
    jQuery(document).find('iframe[src*="youtube.com"]').each(function() {
        var videoMainContainer = jQuery(this).parent().parent().parent(),
            videoInPlaylist = jQuery(this).parent().hasClass("td_wrapper_playlist_player_vimeo"),
            video43AspectRatio = videoMainContainer.hasClass("vc_video-aspect-ratio-43"), //the video is set to 4:3 aspect ratio
            video235AspectRatio = videoMainContainer.hasClass("vc_video-aspect-ratio-235"); //the video is set to 2.35:1 aspect ratio
        if(videoInPlaylist || video43AspectRatio || video235AspectRatio) {
            //do nothing for playlist player youtube or aspect ratios 4:3 and 2.35:1
            //the video aspect ratio can be set on Visual Composer - Video Player widget settings
        } else {
            var td_video = jQuery(this);
            td_video.attr('width', '100%');
            var td_video_width = td_video.width();
            td_video.css('height', td_video_width * 0.5625, 'important');
        }
    });


    //vimeo in content
    jQuery(document).find('iframe[src*="vimeo.com"]').each(function() {
        var videoMainContainer = jQuery(this).parent().parent().parent(),
            videoInPlaylist = jQuery(this).parent().hasClass("td_wrapper_playlist_player_vimeo"),
            video43AspectRatio = videoMainContainer.hasClass("vc_video-aspect-ratio-43"), //the video is set to 4:3 aspect ratio
            video235AspectRatio = videoMainContainer.hasClass("vc_video-aspect-ratio-235"); //the video is set to 2.35:1 aspect ratio
        if(videoInPlaylist || video43AspectRatio || video235AspectRatio) {
            //do nothing for playlist player vimeo or aspect ratios 4:3 and 2.35:1
            //the video aspect ratio can be set on Visual Composer - Video Player widget settings
        } else {
            var td_video = jQuery(this);
            td_video.attr('width', '100%');
            var td_video_width = td_video.width();
            td_video.css('height', td_video_width * 0.5625, 'important');
        }
    });


    //daily motion in content
    jQuery(document).find('iframe[src*="dailymotion.com"]').each(function() {
        var videoMainContainer = jQuery(this).parent().parent().parent(),
            video43AspectRatio = videoMainContainer.hasClass("vc_video-aspect-ratio-43"), //video aspect ratio 4:3
            video235AspectRatio = videoMainContainer.hasClass("vc_video-aspect-ratio-235"); //video aspect ratio 2.35:1
        if (video43AspectRatio || video235AspectRatio) {
            //do nothing for video aspect ratios 4:3 and 2.35:1
            //the video aspect ratio can be set on Visual Composer - Video Player widget settings
        } else {
            var td_video = jQuery(this);
            td_video.attr('width', '100%');
            var td_video_width = td_video.width();
            td_video.css('height', td_video_width * 0.6, 'important');
        }

    });

    //facebook in content
    jQuery(document).find('iframe[src*="facebook.com/plugins/video.php"]').each(function() {
        var td_video = jQuery(this);
        if ( td_video.parent().hasClass('wpb_video_wrapper') ) {
            td_video.attr('width', '100%');
            var td_video_width = td_video.width();
            td_video.css('height', td_video_width * 0.5625, 'important');
        } else {
            td_video.css('max-width', '100%');
        }
    });


    //wordpress embedded
    //jQuery(document).find(".wp-video-shortcode").each(function() {
    //    var td_video = jQuery(this);
    //
    //    var td_video_width = td_video.width() + 3;
    //    jQuery(this).parent().css('height', td_video_width * 0.56, 'important');
    //    //td_video.css('height', td_video_width * 0.6, 'important')
    //    td_video.css('width', '100%', 'important');
    //    td_video.css('height', '100%', 'important');
    //})
}






//handles mobile menu
function td_mobile_menu() {
    //jQuery('#td-top-mobile-toggle a, .td-mobile-close a').click(function(){
    //    if(jQuery('body').hasClass('td-menu-mob-open-menu')) {
    //        jQuery('body').removeClass('td-menu-mob-open-menu');
    //    } else {
    //        if (tdDetect.isMobileDevice) {
    //            // on mobile devices scroll to top instantly and wait a bit and open the menu
    //            window.scrollTo(0, 0);
    //            setTimeout(function(){
    //                jQuery('body').addClass('td-menu-mob-open-menu');
    //            }, 100);
    //        } else {
    //            // on desktop open it with full animations
    //            jQuery('body').addClass('td-menu-mob-open-menu');
    //            setTimeout(function(){
    //                tdUtil.scrollToPosition(0, 1200);
    //            }, 200);
    //        }
    //    }
    //});
}


//handles open/close mobile menu
function td_mobile_menu_toogle() {

    //jQuery('#td-mobile-nav .menu-item-has-children ul').hide();
    //
    ////move thru all the menu and find the item with sub-menues to atach a custom class to them
    //jQuery(document).find('#td-mobile-nav .menu-item-has-children').each(function(i) {
    //
    //    var class_name = 'td_mobile_elem_with_submenu_' + i;
    //    jQuery(this).addClass(class_name);
    //
    //    //add an element to click on
    //    //jQuery(this).children("a").append('<div class="td-element-after" data-parent-class="' + class_name + '"></div>');
    //    jQuery(this).children("a").append('<i class="td-icon-menu-down td-element-after" data-parent-class="' + class_name + '"></i>');
    //
    //
    //    //click on link elements with #
    //    jQuery(this).children("a").addClass("td-link-element-after").attr("data-parent-class", class_name);
    //});
    //
    //jQuery(".td-element-after, .td-link-element-after").click(function(event) {
    //
    //    if(jQuery(this).hasClass("td-element-after") || jQuery(this).attr("href") == "#" ){
    //        event.preventDefault();
    //        event.stopPropagation();
    //    }
    //
    //
    //    //take the li parent class
    //    var parent_class = jQuery(this).data('parent-class');
    //
    //    //target the sub-menu to open
    //    var target_to_open = '#td-mobile-nav .' + parent_class + ' > a + ul';
    //    if(jQuery(target_to_open).css('display') == 'none') {
    //        jQuery(target_to_open).show();
    //    } else {
    //        jQuery(target_to_open).hide();
    //    }
    //
    //
    //});

    jQuery( '#td-top-mobile-toggle a, .td-mobile-close a' ).click(function(){
        if ( jQuery( 'body' ).hasClass( 'td-menu-mob-open-menu' ) ) {
            jQuery( 'body' ).removeClass( 'td-menu-mob-open-menu' );
        } else {
            jQuery( 'body' ).addClass( 'td-menu-mob-open-menu' );
        }
    });


    //handles open/close mobile menu

    //move thru all the menu and find the item with sub-menues to atach a custom class to them
    jQuery( document ).find( '#td-mobile-nav .menu-item-has-children' ).each(function( i ) {

        var class_name = 'td_mobile_elem_with_submenu_' + i;
        jQuery(this).addClass( class_name );

        //click on link elements with #
        jQuery(this).children('a').addClass( 'td-link-element-after' );

        jQuery(this).click(function( event ) {

            /**
             * currentTarget - the li element
             * target - the element clicked inside of the currentTarget
             */

            var jQueryTarget = jQuery( event.target );

            // html i element
            if ( jQueryTarget.length &&
                ( ( jQueryTarget.hasClass( 'td-element-after') || jQueryTarget.hasClass( 'td-link-element-after') ) &&
                ( '#' === jQueryTarget.attr( 'href' ) || undefined === jQueryTarget.attr( 'href' ) ) ) ) {

                event.preventDefault();
                event.stopPropagation();

                jQuery( this ).toggleClass( 'td-sub-menu-open' );
            }
        });
    });
}



/*  ----------------------------------------------------------------------------
    Add retina support
 */

function td_retina() {
    if (window.devicePixelRatio > 1) {
        jQuery('.td-retina').each(function(i) {
            var lowres = jQuery(this).attr('src');
            var highres = lowres.replace(".png", "@2x.png");
            highres = highres.replace(".jpg", "@2x.jpg");
            jQuery(this).attr('src', highres);

        });


        //custom logo support
        jQuery('.td-retina-data').each(function(i) {
            jQuery(this).attr('src', jQuery(this).data('retina'));
            //fix logo aligment on retina devices
            jQuery(this).addClass('td-retina-version');
        });

    }
}

/*
jQuery('body').click(function(e){
    if(! jQuery(e.target).hasClass('custom-background')){
        alert('clicked on something that has not the class theDIV');
    }

});*/

//click only on BACKGROUND, for devices that don't have touch (ex: phone, tablets)
if(!tdDetect.isTouchDevice && tdUtil.getBackendVar('td_ad_background_click_link') != '') {

    //var ev = ev || window.event;
    //var target = ev.target || ev.srcElement;
    jQuery('body').click(function(event) {

        //getting the target element that the user clicks - for W3C and MSIE
        var target = (event.target) ? event.target : event.srcElement;

        //only click on background

        var target_jquery_obj = jQuery(target);

        // td-outer-container for NEWSMAG and td-boxex-layout for NEWSPAPER
        if (target_jquery_obj.hasClass('td-outer-container') || target_jquery_obj.hasClass('td-theme-wrap') || target_jquery_obj.hasClass('td-header-wrap')) {

            //open the link ad page
            if(td_ad_background_click_target == '_blank') {
                //open in a new window
                window.open(td_ad_background_click_link);
            } else {
                //open in the same window
                location.href = td_ad_background_click_link;
            }
        }

        //e.stopPropagation();
        //stopBubble(event);
    });
}





/**
 * reading cookies
 * @param name
 * @returns {*}
 */
function td_read_site_cookie(name) {
    var nameEQ = escape(name) + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return unescape(c.substring(nameEQ.length, c.length));
    }
    return null;
}


/**
 *
 * @param td_time_cookie_array
 *
 * @param[0]: name of the cookie
 * @param[1]: value of the cookie
 * @param[2]: expiration time
 */
function td_set_cookies_life(td_time_cookie_array) {
    var expiry = new Date();
    expiry.setTime(expiry.getTime() + td_time_cookie_array[2]);

    // Date()'s toGMTSting() method will format the date correctly for a cookie
    document.cookie = td_time_cookie_array[0] + "=" + td_time_cookie_array[1] + "; expires=" + expiry.toGMTString() + "; path=/";
}




















/*  ----------------------------------------------------------------------------
    Scroll to top + animation stop
 */

var tdIsScrollingAnimation = false;
var td_mouse_wheel_or_touch_moved = false; //we want to know if the user stopped the animation via touch or mouse move

//stop the animation on mouse wheel
jQuery(document).bind('mousewheel DOMMouseScroll MozMousePixelScroll', function(e){


    if (tdIsScrollingAnimation === false) {
        return;
    } else {

        tdIsScrollingAnimation = false;
        td_mouse_wheel_or_touch_moved = true;

        jQuery("html, body").stop();
    }
});

//stop the animation on touch
if (document.addEventListener){
    document.addEventListener('touchmove', function(e) {
        if (tdIsScrollingAnimation === false) {
            return;
        } else {
            tdIsScrollingAnimation = false;
            td_mouse_wheel_or_touch_moved = true;
            jQuery("html, body").stop();
        }
    }, false);
}

/**
 * called by tdEvents.js on scroll - back to top
 */
var td_scroll_to_top_is_visible = false;
function td_events_scroll_scroll_to_top(scrollTop) {
    if(tdIsScrollingAnimation) {  //do not fire the event on animations
        return;
    }
    if (scrollTop > 400) {
        if (td_scroll_to_top_is_visible === false) { //only add class if needed
            td_scroll_to_top_is_visible = true;
            jQuery('.td-scroll-up').addClass('td-scroll-up-visible');
        }
    } else {
        if (td_scroll_to_top_is_visible === true) { //only add class if needed
            td_scroll_to_top_is_visible = false;
            jQuery('.td-scroll-up').removeClass('td-scroll-up-visible');
        }
    }
}


jQuery('.td-scroll-up').click(function(){
    if(tdIsScrollingAnimation) { //double check - because when we remove the class, the button is still visible for a while
        return;
    }

    //hide the button
    td_scroll_to_top_is_visible = false;
    jQuery('.td-scroll-up').removeClass('td-scroll-up-visible');

    //hide more articles box
    td_more_articles_box.is_box_visible = false;
    jQuery('.td-more-articles-box').removeClass('td-front-end-display-block');

    //scroll to top
    tdUtil.scrollToPosition(0, 1200);

    return false;
});









// small down arrow on template 6 and full width index
jQuery('.td-read-down a').click(function(event){
    event.preventDefault();
    tdUtil.scrollToPosition(jQuery('.td-full-screen-header-image-wrap').height(), 1200);
    //tdUtil.scrollToPosition(jQuery('.td-full-screen-header-image-wrap').height() + jQuery('.td-full-screen-header-image-wrap').offset().top, 1200);
});

/**
 * make td-post-template-6 title move down and blurry
 * called from single_tempalte_6.php via the js buffer
 */
function td_post_template_6_title() {



    //define all the variables - for better performance ?
    var td_parallax_el = document.getElementById('td_parallax_header_6');

    var td_parallax_bg_el = document.getElementById('td-full-screen-header-image');

    var scroll_from_top = '';
    var distance_from_bottom;

    //attach the animation tick on scroll
    jQuery(window).scroll(function(){
        // with each scroll event request an animation frame (we have a polyfill for animation frame)
        // the requestAnimationFrame is called only once and after that we wait
        td_request_tick();
    });


    var td_animation_running = false; //if the tick is running, we set this to true

    function td_request_tick() {
        if (td_animation_running === false) {
            window.requestAnimationFrame(td_do_animation);
        }
        td_animation_running = true;
    }

    /**
     * the animation loop
     */
    function td_do_animation() {
        scroll_from_top = jQuery(document).scrollTop();
        if (scroll_from_top <= 950) { //stop the animation after scroll from top

            var blur_value = 1 - (scroll_from_top / 800); // @todo trebuie verificata formula??
            if (tdDetect.isIe8 === true) {
                blur_value = 1;
            }


            blur_value = Math.round(blur_value * 100) / 100;

            //opacity
            td_parallax_el.style.opacity = blur_value;

            //move the bg
            var parallax_move = -Math.round(scroll_from_top / 4);
            tdUtil.tdMoveY(td_parallax_bg_el,-parallax_move);


            //move the title + cat
            distance_from_bottom = -Math.round(scroll_from_top / 8);
            tdUtil.tdMoveY(td_parallax_el,-distance_from_bottom);
            //td_parallax_el.style.bottom = distance_from_bottom + "px";  //un accelerated version


        }

        td_animation_running = false;
    }



}

//used for smart lists
function td_smart_lists_magnific_popup() {
    //magnific popup
    jQuery(".td-lightbox-enabled").magnificPopup({
        delegate: "a",
        type: "image",
        tLoading: "Loading image #%curr%...",
        mainClass: "mfp-img-mobile",
        gallery: {
            enabled: true,
            navigateByImgClick: true,
            preload: [0,1],
            tCounter: tdUtil.getBackendVar('td_magnific_popup_translation_tCounter') // Markup for "1 of 7" counter
        },
        image: {
            tError: "<a href=\'%url%\'>The image #%curr%</a> could not be loaded.",
            titleSrc: function(item) {//console.log(item.el);
                //alert(jQuery(item.el).data("caption"));
                return item.el.attr("data-caption");
            }
        },
        zoom: {
            enabled: true,
            duration: 300,
            opener: function(element) {
                return element.find("img");
            }
        },
        callbacks: {
            change: function(item) {
                /**
                 * if we have pictures only on 3 from 4 slides then remove, from magnific popup, the one with no image
                 */
                //console.log(item);
                //console.log(item.el[0].id);
                //console.log(parseInt(nr_slide[1]) + 1);
                if(item.el[0].id != '') {
                    var nr_slide = item.el[0].id.split("_");

                    // Will fire when popup is closed
                    //jQuery(".td-iosSlider").iosSlider("goToSlide", this.currItem.index + 1 );
                    jQuery(".td-iosSlider").iosSlider("goToSlide", parseInt(nr_slide[1]) + 1);
                } else {
                    tdModalImageLastEl = item.el;
                    setTimeout(function(){
                        tdUtil.scrollIntoView(item.el);
                    }, 100);
                }
            },
            beforeClose: function() {
                if (tdModalImageLastEl != '') {

                    tdUtil.scrollIntoView(tdModalImageLastEl);
                }
            }
        }
    });
}





function td_get_document_width() {
    var x = 0;
    if (self.innerHeight)
    {
        x = self.innerWidth;
    }
    else if (document.documentElement && document.documentElement.clientHeight)
    {
        x = document.documentElement.clientWidth;
    }
    else if (document.body)
    {
        x = document.body.clientWidth;
    }
    return x;
}

function td_get_document_height() {
    var y = 0;
    if (self.innerHeight)
    {
        y = self.innerHeight;
    }
    else if (document.documentElement && document.documentElement.clientHeight)
    {
        y = document.documentElement.clientHeight;
    }
    else if (document.body)
    {
        y = document.body.clientHeight;
    }
    return y;
}


/*  ----------------------------------------------------------------------------
 Set the mobile menu min-height property

 This is usually used to force vertical scroll bar appearance from the beginning.
 Without it, on some mobile devices (ex Android), at scroll bar appearance there are some
 visual issues.

 */
function setMenuMinHeight() {

    if ( 'undefined' === typeof tdEvents.previousWindowInnerWidth ) {

        // Save the previous width
        tdEvents.previousWindowInnerWidth = tdEvents.window_innerWidth;

    } else if ( tdEvents.previousWindowInnerWidth === tdEvents.window_innerWidth ) {

        // Stop if the width has not been modified
        return;
    }

    tdEvents.previousWindowInnerWidth = tdEvents.window_innerWidth;

    var $tdMobileMenu = jQuery( '#td-mobile-nav' ),
        cssHeight = tdEvents.window_innerHeight + 1;

    if ( $tdMobileMenu.length ) {
        $tdMobileMenu.css( 'min-height' , cssHeight + 'px' );
    }

    // Stop if we are not on mobile
    if ( ! tdDetect.isMobileDevice ) {
        return;
    }

    var $tdMobileBg = jQuery( '.td-menu-background' ),
        $tdMobileBgSearch = jQuery( '.td-search-background' );

    if ( $tdMobileBg.length ) {
        $tdMobileBg.css( 'height' , ( cssHeight + 70 ) + 'px' );
    }

    if ( $tdMobileBgSearch.length ) {
        $tdMobileBgSearch.css( 'height' , ( cssHeight + 70 ) + 'px' );
    }


}

/**
 * Used on comments form to prevent comments form submission without filing the required fields
 */

function td_comments_form_validation() {

    //on form submit
    jQuery('.comment-form').submit( function(event) {

        jQuery('form#commentform :input').each( function() {

            var current_input_field = jQuery(this);
            var form = jQuery(this).parent().parent();

            if (current_input_field.attr('aria-required')){
                if (current_input_field.val() == '') {
                    event.preventDefault();
                    form.addClass('td-comment-form-warnings');

                    if (current_input_field.attr('id') == 'comment') {
                        form.find('.td-warning-comment').show(200);
                        current_input_field.css('border', '1px solid #ff7a7a');
                    } else if (current_input_field.attr('id') == 'author') {
                        form.find('.td-warning-author').show(200);
                        current_input_field.css('border', '1px solid #ff7a7a');
                    } else if (current_input_field.attr('id') == 'email') {
                        form.find('.td-warning-email').show(200);
                        current_input_field.css('border', '1px solid #ff7a7a');
                    }
                } else if ( current_input_field.attr('id') == 'email' && tdUtil.isEmail( current_input_field.val() ) === false ) {
                    event.preventDefault();
                    form.addClass('td-comment-form-warnings');
                    form.find('.td-warning-email-error').show(200);
                }
            }
        });

    });

    //on form input fields focus
    jQuery('form#commentform :input').each( function() {

        var form = jQuery(this).parent().parent();
        var current_input_field = jQuery(this);

        current_input_field.focus( function(){

            if (current_input_field.attr('id') == 'comment') {
                form.find('.td-warning-comment').hide(200);
                current_input_field.css('border', '1px solid #e1e1e1');

            } else if (current_input_field.attr('id') == 'author') {
                form.find('.td-warning-author').hide(200);
                current_input_field.css('border', '1px solid #e1e1e1');


            } else if (current_input_field.attr('id') == 'email') {
                form.find('.td-warning-email').hide(200);
                form.find('.td-warning-email-error').hide(200);
                current_input_field.css('border', '1px solid #e1e1e1');
            }
        });
    })
}
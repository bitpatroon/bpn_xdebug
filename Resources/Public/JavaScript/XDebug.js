/***************************************************************
 *  Copyright notice
 *
 *  (c) 2018 Sjoerd Zonneveld  <typo3@bitpatroon.nl>
 *  Date: 15-1-2018 14:01
 *
 *  All rights reserved
 *
 *  This script is part of the TYPO3 project. The TYPO3 project is
 *  free software; you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation; either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  The GNU General Public License can be found at
 *  http://www.gnu.org/copyleft/gpl.html.
 *
 *  This script is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  This copyright notice MUST APPEAR in all copies of the script!
 ***************************************************************/

define(['jquery'], function($){
    var self = this;

    var XDEBUG_COOKIENAME = 'XDEBUG_SESSION';
    var XDEBUG_COOKIEVALUE = 'TYPO3_BE';
    var XDEBUG_COOKIE_EXPIRATION_DAYS = 30;
    var XDEBUG_TOGGLECLASS = 'enabled';

    self.createControl = function () {

        var id = 'typo3-cms-backend-backend-toolbaritems-tx_bpnxdebug';
        var newControl = '<li class="toolbar-item t3js-toolbar-item" id="' + id+ '">XDebug</li>';
        $('.t3js-topbar-toolbar .toolbar-item-search').before(newControl);

        var $topbarItems = $('.scaffold-toolbar.t3js-scaffold-toolbar .toolbar-list');
        var $xdebugElem = $topbarItems.find('#typo3-cms-backend-backend-toolbaritems-tx_bpnxdebug');
        if (self.getCookie(XDEBUG_COOKIENAME)) {
            $xdebugElem.addClass(XDEBUG_TOGGLECLASS);
        }

        $xdebugElem.click(function () {
            $xdebugElem.toggleClass(XDEBUG_TOGGLECLASS);
            if ($xdebugElem.hasClass(XDEBUG_TOGGLECLASS)) {
                self.setCookie(XDEBUG_COOKIENAME, XDEBUG_COOKIEVALUE);
                $xdebugElem.attr('title', 'Active');
            } else {
                self.removeCookie(XDEBUG_COOKIENAME);
                $xdebugElem.attr('title', 'Inactive');
            }
        });
    };

    self.getCookie = function (name) {
        if (name === null) return null;

        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) {
                return c.substring(nameEQ.length, c.length).trim();
            }
        }
        return null;
    };

    self.setCookie = function (name, value, days) {
        days = parseInt(days || XDEBUG_COOKIE_EXPIRATION_DAYS);
        if (days > 30) {
            days = 30;
        }

        var expires = '';
        if (days != 0) {
            /** @type {Date} */
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + value + expires + "; path=/";
    };

    self.removeCookie = function (name) {
        self.setCookie(name, '', -1);
    };

    /**
     * Start
     */
    $(document).ready(function () {
        createControl();
    });
});

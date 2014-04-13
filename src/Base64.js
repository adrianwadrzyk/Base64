/* global module */

/**!
 * Base64 encode/decode
 *
 * @version 1.0.0
 * @link https://github.com/adrianwadrzyk/Base64
 * @author Adrian Wądrzyk
 * @license MIT License
 */
(function (global) {
    "use strict";

    var CHARACTER_SET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
        PADDING_CHAR_INDEX = 64;

    function encode (str) {
        if (/[^\u0000-\u00ff]/.test(str)) {
            throw new Error("String contains non-ASCII character. Can't encode!");
        }

        var result = "",
            first8bit, second8bit, third8bit,
            first6bit, second6bit, third6bit, fourth6bit;

        for(var i = 0, len = str.length; i < len; i += 3) {
            first8bit  = str.charCodeAt(i);
            second8bit = str.charCodeAt(i + 1);
            third8bit  = str.charCodeAt(i + 2);

            first6bit  = first8bit >> 2;
            second6bit = (first8bit & 3) << 4 | second8bit >> 4;
            third6bit  = (second8bit & 15) << 2 | third8bit >> 6;
            fourth6bit = third8bit & 63;

//          Some strings aren't divisible by 3, so we have to add one or two padding characters
            if (isNaN(second8bit)) {
                third6bit = PADDING_CHAR_INDEX;
            }

            if (isNaN(third8bit)) {
                fourth6bit = PADDING_CHAR_INDEX;
            }

            result += CHARACTER_SET.charAt(first6bit) +
                      CHARACTER_SET.charAt(second6bit) +
                      CHARACTER_SET.charAt(third6bit) +
                      CHARACTER_SET.charAt(fourth6bit);
        }

        return result;
    }

    function decode (str) {
        str = str.trim();

        if (/^[a-zA-Z0-9\+\/]+\={0,2}$/.test(str) === false) {
            throw new Error("String contains character outside the base64 character set. Can't decode!");
        }

        var result = "",
            first8bit, second8bit, third8bit,
            first6bit, second6bit, third6bit, fourth6bit;

        str = str.replace(/=/g, '');

        for (var i = 0, len = str.length; i < len; i += 4) {
            first6bit  = CHARACTER_SET.indexOf(str.charAt(i));
            second6bit = CHARACTER_SET.indexOf(str.charAt(i + 1));
            third6bit  = CHARACTER_SET.indexOf(str.charAt(i + 2));
            fourth6bit = CHARACTER_SET.indexOf(str.charAt(i + 3));

            first8bit  = first6bit << 2 | second6bit >> 4;
            second8bit = (second6bit & 15) << 4 | third6bit >> 2;
            third8bit  = (third6bit & 3) << 6 | fourth6bit;

            result += String.fromCharCode(first8bit);

//          Last 2 characters may be only a padding, we remove it from string
//          before decoding, so method charAt could return empty string
            if (str.charAt(i + 2) !== '') {
                result += String.fromCharCode(second8bit);
            }

            if (str.charAt(i + 3) !== '') {
                result += String.fromCharCode(third8bit);
            }

        }

        return result;
    }

    /**
     * Base64 encode/decode
     *
     * @class Base64
     */
    var Base64 = {
        /**
         * Encode a given string
         *
         * @method encode
         * @param {String} str string to encode
         * @return {String} encoded string
         */
        'encode': encode,

        /**
         * Decode a given string
         *
         * @method decode
         * @param {String} str string to decode
         * @return {String} decode string
         */
        'decode': decode
    };

    if (typeof module === "object" && typeof module.exports === "object") {
        module.exports = Base64;
    } else {
        global.Base64 = Base64;
    }
}(this));

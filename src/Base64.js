/* global module */

(function (global) {
    "use strict";

    var INDEX_TABLE  = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcedfghijklmnopqrstuvwxyz0123456789+/",
        PADDING_CHAR = "=";

    function encode (str) {
        var result = "",
            first8bit, second8bit, third8bit,
            first6bit, second6bit, third6bit, fourth6bit;

        for(var i = 0, len = str.length; i < len; i += 3) {
            first8bit  = str.charCodeAt(i);
            second8bit = str.charCodeAt(i+1);
            third8bit  = str.charCodeAt(i+2);

            first6bit  = first8bit >> 2;
            if (second8bit) {
                second6bit = (first8bit & 3) << 4 | second8bit >> 4;

                if (third8bit) {
                    third6bit  = (second8bit & 15) << 2 | third8bit >> 6;
                    fourth6bit = third8bit & 63;
                }
            }

            result += INDEX_TABLE.charAt(first6bit);

            if (second8bit) {
                result += INDEX_TABLE.charAt(second6bit);

                if(third8bit) {
                    result += INDEX_TABLE.charAt(third6bit);
                    result += INDEX_TABLE.charAt(fourth6bit);
                }
            }
        }

        switch(str.length % 3) {
            case 1:
                second6bit = (first8bit & 3) << 4;
                result += INDEX_TABLE.charAt(second6bit);
                result += PADDING_CHAR + PADDING_CHAR;
                break;
            case 2:
                third6bit = (second8bit & 15) << 2;
                result += INDEX_TABLE.charAt(third6bit);
                result += PADDING_CHAR;
                break;
        }

        return result;
    }

    function decode () {

    }

    var Base64 = {
        'encode': encode,
        'decode': decode
    };

    if (typeof module === "object" && typeof module.exports === "object") {
        module.exports = Base64;
    } else {
        global.Base64 = Base64;
    }
}(this));
/* global describe, expect, it, Base64 */

describe("Encoding Base64", function () {
    "use strict";

    var input = [
            "Man",
            "any carnal pleasure,",
            "any carnal pleasure",
            "any carnal pleasur",
            "any carnal pleasu",
            "any carnal pleas",
            "pleasure.",
            "leasure.",
            "easure.",
            "asure.",
            "sure."
        ],

        output = [
            "TWFu",
            "YW55IGNhcm5hbCBwbGVhc3VyZSw=",
            "YW55IGNhcm5hbCBwbGVhc3VyZQ==",
            "YW55IGNhcm5hbCBwbGVhc3Vy",
            "YW55IGNhcm5hbCBwbGVhc3U=",
            "YW55IGNhcm5hbCBwbGVhcw==",
            "cGxlYXN1cmUu",
            "bGVhc3VyZS4=",
            "ZWFzdXJlLg==",
            "YXN1cmUu",
            "c3VyZS4="
        ];

    it("should encode string correctly to base64", function () {
        for (var i = 0; i < input.length; i++) {
            expect(Base64.encode(input[i])).toEqual(output[i]);
        }
    });

});

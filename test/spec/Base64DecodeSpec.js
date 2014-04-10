/* global describe, expect, it, Base64 */

describe("Decoding Base64", function () {
    "use strict";

    var input = [
            "YW55IGNhcm5hbCBwbGVhcw==",
            "YW55IGNhcm5hbCBwbGVhc3U=",
            "YW55IGNhcm5hbCBwbGVhc3Vy",
            "YW55IGNhcm5hbCBwbGVhcw",
            "YW55IGNhcm5hbCBwbGVhc3U"
        ],

        output = [
            "any carnal pleas",
            "any carnal pleasu",
            "any carnal pleasur",
            "any carnal pleas",
            "any carnal pleasu"
        ];

    it("should decode base64 correctly to string", function () {
        for (var i = 0; i < input.length; i++) {
            expect(Base64.decode(input[i])).toEqual(output[i]);
        }
    });

    it("should throw error, when string contains character outside  from base64 character set", function () {
       expect(function () {
           Base64.decode("abc|de");
       }).toThrowError("String contains characters outside the base64 character set. Can't decode!");
    });
});

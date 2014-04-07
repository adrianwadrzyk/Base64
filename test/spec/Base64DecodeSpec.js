/* global describe, expect, it, Base64 */

describe("Decoding Base64", function () {
    "use strict";

    var input = [
            "YW55IGNhcm5hbCBwbGVhcw==",
            "YW55IGNhcm5hbCBwbGVhc3U=",
            "YW55IGNhcm5hbCBwbGVhc3Vy",
            "YW55IGNhcm5hbCBwbGVhcw",
            "YW55IGNhcm5hbCBwbGVhc3U",
            "YW55IGNhcm5hbCBwbGVhc3Vy"
        ],

        output = [
            "any carnal pleas",
            "any carnal pleasu",
            "any carnal pleasur",
            "any carnal pleas",
            "any carnal pleasu",
            "any carnal pleasur"
        ];

    it("should decode base64 correctly to string", function () {
        for (var i = 0; i < input.length; i++) {
            expect(Base64.decode(input[i])).toBe(output[i]);
        }
    });
});

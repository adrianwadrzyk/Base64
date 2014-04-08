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

    xit("should decode base64 correctly to string", function () {
        for (var i = 0; i < input.length; i++) {
            var test1 = Base64.decode(input[i]);
            console.log('-----------------------');
            console.log(test1.length);
            console.log(output[i].length);

            expect(test1).toEqual(output[i]);
        }
    });
});

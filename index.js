var Transform = require("readable-stream").Transform;
var util = require("util");

var whack = function (options) {
    options = options || {};

    var limit = options.limit || 80;
    var separator = options.separator || "\n";
    var splitOnWord = options.splitOnWord || true;
    var stripNewline = options.stripNewline || false;

    var stream = new Transform();
    var buffer = "";

    stream.on("end", function() {
        this.push(buffer);
    });

    stream._transform = function (chunk, encoding, done) {
        chunk = chunk.toString();

        if (stripNewline)
            chunk = chunk.replace(/\r|\n/g, "");

        buffer += chunk;

        while (buffer.length > limit) {
            var sliced = buffer.slice(0, limit);
            var nlIndex = sliced.indexOf("\n");

            if (nlIndex !== -1) {
                var truncated = sliced.slice(0, nlIndex)
                this.push(truncated + separator);
                buffer = buffer.slice(truncated.length + 1);
                continue;
            }

            var lastChar = sliced[limit - 1];

            if (splitOnWord && lastChar !== " ") {
                var lastIndex = sliced.lastIndexOf(" ");
                if (lastIndex === -1) {
                    this.push(sliced + separator);
                    continue;
                } else {
                    var truncated = sliced.slice(0, lastIndex);
                    buffer = buffer.slice(truncated.length + 1)

                    this.push(truncated + separator);
                    continue;
                }
            }

            this.push(sliced + separator);
            buffer = buffer.slice(limit);
        }

        done();
    }

    return stream;
};

module.exports = whack;

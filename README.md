# whack
> text formatter stream

whack allows you to cap text to a specific width, similar to `fmt -w <len>`.

## Installation

    npm install whack

## Usage

### `whack(options)`

Create a Transform stream, where `options` can contain:

* `limit` - limit to split text. Defaults to `80`.
* `separator` - A string to insert when separating text. Defaults to `\n`.
* `splitOnWord` - Only split after full words. Defaults to `true`.
* `stripNewline` - Remove both `\n`  and `\r` characters from the chunk before processing. Defaults to `false`.

```js
var whack = require("whack");
var fs = require("fs");

fs.createReadStream("README.md")
  .pipe(whack({ limit: 80 }))    // limits line size to 80 chars
  .pipe(process.stdout);
```

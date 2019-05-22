# @scenejs/iframe [![npm version](https://badge.fury.io/js/%40scenejs%2Fiframe.svg)](https://badge.fury.io/js/%40scenejs%2Fiframe)

A library that control the animation of iframe with [**scenejs**](https://github.com/daybrush/scenejs)


## Installation
### npm
```bash
$ npm install @scenejs/iframe
```

### scripts
* dependency in [**scenejs**](https://github.com/daybrush/scenejs)

```html
<script src="//daybrush.com/@scenejs/iframe/release/latest/dist/iframe.min.js"></script>
```

## API Documents

* [API Documentation](https://daybrush.com/scenejs-iframe/release/latest/doc)

## Getting Started
* [index.html](https://daybrush.com/scenejs-iframe/release/latest/examples/index.html) (parent)
```html
<iframe id="iframe1" src="./motion.html"></iframe>
<iframe id="iframe2" src="./motion.html"></iframe>
<iframe id="iframe3" src="./motion.html"></iframe>
<iframe id="iframe4" src="./motion.html"></iframe>
```
```js
import Scene from "scenejs";
import IframeItem from "@scenejs/iframe";

new Scene({
    "#iframe1": new IframeItem({}, { duration: 3.4, delay: 0 }),
    "#iframe2": new IframeItem({}, { duration: 3.4, delay: 0.15 }),
    "#iframe3": new IframeItem({}, { duration: 3.4, delay: 0.3 }),
    "#iframe4": new IframeItem({}, { duration: 3.4, delay: 0.45 }),
}, {
    selector: true,
    iterationCount: "infinite",
}).play();
```
* [motion.html](https://daybrush.com/scenejs-iframe/release/latest/examples/motion.html)
```js
import { register } from "@scenejs/iframe";
var scene = new Scene({
    ....
});

// IframeItem.register(scene);
register(scene);
```

```
MIT License

Copyright (c) 2019 Daybrush

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
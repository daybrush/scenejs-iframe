/*
Copyright (c) 2019 Daybrush
name: @scenejs/iframe
license: MIT
author: Daybrush
repository: git+https://github.com/daybrush/scenejs-iframe.git
version: 0.0.4
*/
'use strict';

var scenejs = require('scenejs');
var utils = require('@daybrush/utils');

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

/* global Reflect, Promise */
var extendStatics = function (d, b) {
  extendStatics = Object.setPrototypeOf || {
    __proto__: []
  } instanceof Array && function (d, b) {
    d.__proto__ = b;
  } || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
  };

  return extendStatics(d, b);
};

function __extends(d, b) {
  extendStatics(d, b);

  function __() {
    this.constructor = d;
  }

  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

utils.addEvent(window, "message", function (e) {
  var result = parseMessage(e.data);

  if (!result) {
    return;
  }

  if (result[1] === "ready") {
    sendMessage(e.source, "end");
  }
});
function sendMessage(target, message) {
  target.postMessage("scene:" + message, "*");
}
function parseMessage(message) {
  if (!utils.isString(message)) {
    return;
  }

  return /(?:^scene\:)([^:]+)(?:\:([^:]+))*/g.exec(message);
}
/**
 * Register an animator to be controlled by the parent.
 * @memberof IframeItem
 * @param - The target to register
 * @example
import Scene from "scenejs";
import { register } from "@scenejs/iframe";
var scene = new Scene({
    ....
});
// IframeItem.register(scene);
register(scene);
 */

function register(item) {
  if (window.parent && window !== window.parent && window.parent.postMessage) {
    sendMessage(window.parent, "ready");
  }

  utils.addEvent(window, "message", function (e) {
    var data = e.data;
    var result = parseMessage(data);

    if (!result) {
      return;
    }

    var type = result[1];
    var value = result[2];

    switch (type) {
      case "start":
        item.start(0);
        break;

      case "pause":
        item.pause();
        break;

      case "end":
        item.finish();
        break;

      case "time":
      case "animate":
        item.setTime(parseFloat(value), type === "animate", true);
        break;
    }
  });
}

/**
 * Control the animation of iframe
 * @sort 1
 * @param {any} properties - properties
 * @param {SceneItemOptions} options - options
 * @example
// index.html (parent)
import Scene from "scenejs";
import IframeItem from "@scenejs/iframe";

var scene = new Scene({
    "#iframe1": new IframeItem({}, { duration: 3.4, delay: 0 }),
    "#iframe2": new IframeItem({}, { duration: 3.4, delay: 0.15 }),
    "#iframe3": new IframeItem({}, { duration: 3.4, delay: 0.3 }),
    "#iframe4": new IframeItem({}, { duration: 3.4, delay: 0.45 }),
}, {
    selector: true,
    iterationCount: "infinite",
});
 */

var IframeItem =
/*#__PURE__*/
function (_super) {
  __extends(IframeItem, _super);

  function IframeItem() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  var __proto = IframeItem.prototype;

  __proto.setTime = function (time, isTick, isParent, parentEasing) {
    _super.prototype.setTime.call(this, time, isTick, isParent, parentEasing);

    var iterationTime = this.getIterationTime();
    this.sendMessage((isTick ? "animate" : "time") + ":" + iterationTime);
    return this;
  };

  __proto.end = function () {
    _super.prototype.end.call(this);

    this.sendMessage("end");
    return this;
  };

  __proto.pause = function () {
    _super.prototype.pause.call(this);

    this.sendMessage("pause");
    return this;
  };

  __proto.start = function (delay) {
    var result = _super.prototype.start.call(this, delay);

    this.sendMessage("start");
    return result;
  };

  __proto.sendMessage = function (message) {
    var elements = this.getElements();
    elements.forEach(function (el) {
      if (!el.contentWindow) {
        return;
      }

      sendMessage(el.contentWindow, message);
    });
  };

  return IframeItem;
}(scenejs.SceneItem);

exports.default = IframeItem;
exports.register = register;
//# sourceMappingURL=iframe.cjs.js.map

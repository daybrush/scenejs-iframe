/*
Copyright (c) 2019 Daybrush
name: @scenejs/iframe
license: MIT
author: Daybrush
repository: git+https://github.com/daybrush/scenejs-iframe.git
version: 0.0.1
*/
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('scenejs')) :
    typeof define === 'function' && define.amd ? define(['scenejs'], factory) :
    (global = global || self, global.IframeItem = factory(global.Scene));
}(this, function (scenejs) { 'use strict';

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

          el.contentWindow.postMessage("scene:" + message, "*");
        });
      };

      return IframeItem;
    }(scenejs.SceneItem);

    /*
    Copyright (c) 2018 Daybrush
    @name: @daybrush/utils
    license: MIT
    author: Daybrush
    repository: https://github.com/daybrush/utils
    @version 0.9.0
    */
    /**
    * get string "string"
    * @memberof Consts
    * @example
    import {STRING} from "@daybrush/utils";

    console.log(STRING); // "string"
    */

    var STRING = "string";
    /**
    * Check the type that the value is string.
    * @memberof Utils
    * @param {string} value - Value to check the type
    * @return {} true if the type is correct, false otherwise
    * @example
    import {isString} from "@daybrush/utils";

    console.log(isString("1234")); // true
    console.log(isString(undefined)); // false
    console.log(isString(1)); // false
    console.log(isString(null)); // false
    */


    function isString(value) {
      return typeof value === STRING;
    }
    /**
    * Sets up a function that will be called whenever the specified event is delivered to the target
    * @memberof DOM
    * @param - event target
    * @param - A case-sensitive string representing the event type to listen for.
    * @param - The object which receives a notification (an object that implements the Event interface) when an event of the specified type occurs
    * @param - An options object that specifies characteristics about the event listener. The available options are:
    * @example
    import {addEvent} from "@daybrush/utils";

    addEvent(el, "click", e => {
      console.log(e);
    });
    */


    function addEvent(el, type, listener, options) {
      el.addEventListener(type, listener, options);
    }

    function register(item) {
      addEvent(window, "message", function (e) {
        var data = e.data;

        if (!isString(data)) {
          return;
        }

        var result = /(?<=^scene\:)([^:]+)(?:\:([^:]+))?/g.exec(data);

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
            item.end();
            break;

          case "time":
          case "animate":
            item.setTime(parseFloat(value), type === "animate", true);
            break;
        }
      });
    }

    IframeItem.register = register;

    return IframeItem;

}));
//# sourceMappingURL=iframe.js.map

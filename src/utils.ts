import { Animator } from "scenejs";
import { addEvent, isString } from "@daybrush/utils";

addEvent(window, "message", e => {
    const result = parseMessage(e.data);

    if (!result) {
        return;
    }

    if (result[1] === "ready") {
        sendMessage(e.source, "end");
    }
});

export function sendMessage(target: any, message: string) {
    target.postMessage(`scene:${message}`, "*");
}
export function parseMessage(message: string) {
    if (!isString(message)) {
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
export function register(item: Animator): void {
    if (
        window.parent
        && window !== window.parent
        && window.parent.postMessage
    ) {
        sendMessage(window.parent, "ready");
    }
    addEvent(window, "message", e => {
        const data = e.data;
        const result = parseMessage(data);

        if (!result) {
            return;
        }
        const type = result[1];
        const value = result[2];

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

import { Animator } from "scenejs";
import { addEvent, isString } from "@daybrush/utils";

export function register(item: Animator) {
    addEvent(window, "message", e => {
        const data = e.data;

        if (!isString(data)) {
            return;
        }
        const result = /(?<=^scene\:)([^:]+)(?:\:([^:]+))?/g.exec(data);

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
                item.end();
                break;
            case "time":
            case "animate":
                item.setTime(parseFloat(value), type === "animate", true);
                break;
        }
    });
}

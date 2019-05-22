import { Animator } from "scenejs";
import { addEvent } from "@daybrush/utils";

export function registerIframe(name: string, item: Animator) {
    addEvent(window, "hashchange", e => {
        const hash = location.hash;
    });
}

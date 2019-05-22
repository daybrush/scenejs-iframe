import { SceneItem, EasingType } from "scenejs";
import { sendMessage } from "./utils";

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
class IframeItem extends SceneItem {
    public setTime(time: number | string, isTick?: boolean, isParent?: boolean, parentEasing?: EasingType): this {
        super.setTime(time, isTick, isParent, parentEasing);
        const iterationTime = this.getIterationTime();

        this.sendMessage(`${isTick ? "animate" : "time"}:${iterationTime}`);
        return this;
    }
    public end(): this {
        super.end();
        this.sendMessage("end");
        return this;
    }
    public pause(): this {
        super.pause();
        this.sendMessage("pause");
        return this;
    }
    public start(delay?: number): boolean {
        const result = super.start(delay);

        this.sendMessage("start");
        return result;
    }
    private sendMessage(message: string) {
        const elements = this.getElements() as HTMLIFrameElement[];

        elements.forEach(el => {
            if (!el.contentWindow) {
                return;
            }
            sendMessage(el.contentWindow, message);
        });

    }
}
export default IframeItem;

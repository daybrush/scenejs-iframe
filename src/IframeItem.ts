import { SceneItem, EasingType } from "scenejs";
import { postMessage } from "./utils";

export default class IframeItem extends SceneItem {
    constructor(duration: number) {
        super();
        this.setDuration(duration);
    }
    public setTime(time: number | string, isTick?: boolean, isParent?: boolean, parentEasing?: EasingType): this {
        super.setTime(time, isTick, isParent, parentEasing);
        const iterationTime = this.getIterationTime();

        postMessage(`scene:animate:${iterationTime}`);
        return this;
    }
    public end(): this {
        super.end();
        postMessage("scene:end");
        return this;
    }
    public pause(): this {
        super.pause();
        postMessage("scene:pause");
        return this;
    }
    public start(delay?: number): boolean {
        const result = super.start(delay);

        postMessage("scene:start");
        return result;
    }
}

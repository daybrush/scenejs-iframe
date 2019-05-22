import { SceneItem, EasingType, AnimateElement } from "scenejs";
import { IArrayFormat } from "@daybrush/utils";

export default class IframeItem extends SceneItem {
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
            el.contentWindow.postMessage(`scene:${message}`, "*");
        });

    }
}

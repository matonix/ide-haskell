"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const atom_1 = require("atom");
const utils_1 = require("../utils");
class TooltipRegistry {
    constructor(pluginManager) {
        this.pluginManager = pluginManager;
        this.providers = [];
    }
    dispose() {
        this.providers = [];
    }
    register(pluginName, provider) {
        const idx = this.providers.findIndex(({ priority }) => priority < provider.priority);
        const record = Object.assign({ pluginName }, provider);
        this.providers.splice(idx, 0, record);
        return new atom_1.Disposable(() => {
            const ix = this.providers.indexOf(record);
            this.providers.splice(ix, 1);
        });
    }
    showTooltip(editor, type, pos, spec) {
        return __awaiter(this, void 0, void 0, function* () {
            const controller = this.pluginManager.controller(editor);
            if (!controller) {
                return;
            }
            let pluginName, tooltipData;
            const eventRange = controller.getEventRange(type);
            if (!eventRange) {
                return;
            }
            if (spec) {
                let tooltip;
                ({ pluginName, tooltip } = spec);
                tooltipData = yield Promise.resolve(tooltip(eventRange.crange));
            }
            else {
                const tooltip = yield this.defaultTooltipFunction(editor, type, eventRange.crange);
                if (!tooltip) {
                    return;
                }
                ({ pluginName, tooltipData } = tooltip);
            }
            const newEventRange = controller.getEventRange(type);
            if (!newEventRange || !eventRange.crange.isEqual(newEventRange.crange)) {
                return;
            }
            const { persistOnCursorMove = false } = tooltipData;
            let msg;
            if (Array.isArray(tooltipData.text)) {
                msg = tooltipData.text.map(utils_1.MessageObject.fromObject.bind(utils_1.MessageObject));
            }
            else {
                msg = utils_1.MessageObject.fromObject(tooltipData.text);
            }
            controller.tooltips.show(tooltipData.range, msg, type, pluginName, { persistOnCursorMove });
        });
    }
    defaultTooltipFunction(editor, type = 'mouse', crange) {
        return __awaiter(this, void 0, void 0, function* () {
            for (const { pluginName, handler } of this.providers) {
                try {
                    const tooltipData = yield Promise.resolve(handler(editor, crange, type));
                    if (!tooltipData) {
                        continue;
                    }
                    return { pluginName, tooltipData };
                }
                catch (e) {
                    this.pluginManager.outputView.backendStatus(pluginName, e);
                    continue;
                }
            }
        });
    }
}
exports.TooltipRegistry = TooltipRegistry;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdG9vbHRpcC1yZWdpc3RyeS9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsK0JBQXlEO0FBQ3pELG9DQUFnRDtBQWlCaEQ7SUFFRSxZQUFxQixhQUE0QjtRQUE1QixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUMvQyxJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQTtJQUNyQixDQUFDO0lBRU0sT0FBTztRQUNaLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFBO0lBQ3JCLENBQUM7SUFFTSxRQUFRLENBQUUsVUFBa0IsRUFBRSxRQUE2QjtRQUNoRSxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUMsUUFBUSxFQUFDLEtBQUssUUFBUSxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQTtRQUNsRixNQUFNLE1BQU0sbUJBQUksVUFBVSxJQUFLLFFBQVEsQ0FBQyxDQUFBO1FBQ3hDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUE7UUFDckMsTUFBTSxDQUFDLElBQUksaUJBQVUsQ0FBQztZQUNwQixNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQTtZQUN6QyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUE7UUFDOUIsQ0FBQyxDQUFDLENBQUE7SUFDSixDQUFDO0lBRVksV0FBVyxDQUN0QixNQUFrQixFQUFFLElBQXFCLEVBQ3pDLEdBQVcsRUFBRSxJQUFtQjs7WUFFaEMsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUE7WUFDeEQsRUFBRSxDQUFDLENB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LENBQUMsYUFBYSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQTtvQkFDMUQsUUFBUSxDQUFBO2dCQUNWLENBQUM7WUFDSCxDQUFDO1FBQ0gsQ0FBQztLQUFBO0NBQ0Y7QUFsRUQsMENBa0VDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtUZXh0RWRpdG9yLCBEaXNwb3NhYmxlLCBSYW5nZSwgUG9pbnR9IGZyb20gJ2F0b20nXG5pbXBvcnQge1RNZXNzYWdlLCBNZXNzYWdlT2JqZWN0fSBmcm9tICcuLi91dGlscydcbmltcG9ydCB7UGx1Z2luTWFuYWdlcn0gZnJvbSAnLi4vcGx1Z2luLW1hbmFnZXInXG5pbXBvcnQge1RFdmVudFJhbmdlVHlwZX0gZnJvbSAnLi4vZWRpdG9yLWNvbnRyb2wvdG9vbHRpcC1tYW5hZ2VyJ1xuXG5leHBvcnQgdHlwZSBUVG9vbHRpcEZ1bmN0aW9uID0gKGNyYW5nZTogUmFuZ2UpID0+IElUb29sdGlwRGF0YSB8IFByb21pc2U8SVRvb2x0aXBEYXRhPlxuZXhwb3J0IGludGVyZmFjZSBJVG9vbHRpcERhdGEge1xuICByYW5nZTogUmFuZ2VcbiAgdGV4dDogVE1lc3NhZ2UgfCBUTWVzc2FnZVtdXG4gIHBlcnNpc3RPbkN1cnNvck1vdmU/OiBib29sZWFuXG59XG5leHBvcnQgdHlwZSBUVG9vbHRpcEhhbmRsZXIgPVxuICAoZWRpdG9yOiBUZXh0RWRpdG9yLCBjcmFuZ2U6IFJhbmdlLCB0eXBlOiBURXZlbnRSYW5nZVR5cGUpXG4gID0+IElUb29sdGlwRGF0YSB8IHVuZGVmaW5lZCB8IFByb21pc2U8SVRvb2x0aXBEYXRhIHwgdW5kZWZpbmVkPlxuXG5leHBvcnQgdHlwZSBUVG9vbHRpcEhhbmRsZXJTcGVjID0ge3ByaW9yaXR5OiBudW1iZXIsIGhhbmRsZXI6IFRUb29sdGlwSGFuZGxlcn1cbnR5cGUgVFRvb2x0aXBTcGVjID0ge3BsdWdpbk5hbWU6IHN0cmluZywgdG9vbHRpcDogVFRvb2x0aXBGdW5jdGlvbn1cblxuZXhwb3J0IGNsYXNzIFRvb2x0aXBSZWdpc3RyeSB7XG4gIHByaXZhdGUgcHJvdmlkZXJzOiBBcnJheTxUVG9vbHRpcEhhbmRsZXJTcGVjICYge3BsdWdpbk5hbWU6IHN0cmluZ30+XG4gIGNvbnN0cnVjdG9yIChwcml2YXRlIHBsdWdpbk1hbmFnZXI6IFBsdWdpbk1hbmFnZXIpIHtcbiAgICB0aGlzLnByb3ZpZGVycyA9IFtdXG4gIH1cblxuICBwdWJsaWMgZGlzcG9zZSAoKSB7XG4gICAgdGhpcy5wcm92aWRlcnMgPSBbXVxuICB9XG5cbiAgcHVibGljIHJlZ2lzdGVyIChwbHVnaW5OYW1lOiBzdHJpbmcsIHByb3ZpZGVyOiBUVG9vbHRpcEhhbmRsZXJTcGVjKTogRGlzcG9zYWJsZSB7XG4gICAgY29uc3QgaWR4ID0gdGhpcy5wcm92aWRlcnMuZmluZEluZGV4KCh7cHJpb3JpdHl9KSA9PiBwcmlvcml0eSA8IHByb3ZpZGVyLnByaW9yaXR5KVxuICAgIGNvbnN0IHJlY29yZCA9IHtwbHVnaW5OYW1lLCAuLi5wcm92aWRlcn1cbiAgICB0aGlzLnByb3ZpZGVycy5zcGxpY2UoaWR4LCAwLCByZWNvcmQpXG4gICAgcmV0dXJuIG5ldyBEaXNwb3NhYmxlKCgpID0+IHtcbiAgICAgIGNvbnN0IGl4ID0gdGhpcy5wcm92aWRlcnMuaW5kZXhPZihyZWNvcmQpXG4gICAgICB0aGlzLnByb3ZpZGVycy5zcGxpY2UoaXgsIDEpXG4gICAgfSlcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBzaG93VG9vbHRpcCAoXG4gICAgZWRpdG9yOiBUZXh0RWRpdG9yLCB0eXBlOiBURXZlbnRSYW5nZVR5cGUsXG4gICAgcG9zPzogUG9pbnQsIHNwZWM/OiBUVG9vbHRpcFNwZWNcbiAgKSB7XG4gICAgY29uc3QgY29udHJvbGxlciA9IHRoaXMucGx1Z2luTWFuYWdlci5jb250cm9sbGVyKGVkaXRvcilcbiAgICBpZiAoIWNvbnRyb2xsZXIpIHsgcmV0dXJuIH1cbiAgICBsZXQgcGx1Z2luTmFtZSwgdG9vbHRpcERhdGFcbiAgICBjb25zdCBldmVudFJhbmdlID0gY29udHJvbGxlci5nZXRFdmVudFJhbmdlKHR5cGUpXG4gICAgaWYgKCFldmVudFJhbmdlKSB7IHJldHVybiB9XG4gICAgaWYgKHNwZWMpIHtcbiAgICAgIGxldCB0b29sdGlwXG4gICAgICAoe3BsdWdpbk5hbWUsIHRvb2x0aXB9ID0gc3BlYylcbiAgICAgIHRvb2x0aXBEYXRhID0gYXdhaXQgUHJvbWlzZS5yZXNvbHZlKHRvb2x0aXAoZXZlbnRSYW5nZS5jcmFuZ2UpKVxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCB0b29sdGlwID0gYXdhaXQgdGhpcy5kZWZhdWx0VG9vbHRpcEZ1bmN0aW9uKGVkaXRvciwgdHlwZSwgZXZlbnRSYW5nZS5jcmFuZ2UpXG4gICAgICBpZiAoIXRvb2x0aXApIHsgcmV0dXJuIH1cbiAgICAgICh7cGx1Z2luTmFtZSwgdG9vbHRpcERhdGF9ID0gdG9vbHRpcClcbiAgICB9XG4gICAgY29uc3QgbmV3RXZlbnRSYW5nZSA9IGNvbnRyb2xsZXIuZ2V0RXZlbnRSYW5nZSh0eXBlKVxuICAgIGlmICghbmV3RXZlbnRSYW5nZSB8fCAhZXZlbnRSYW5nZS5jcmFuZ2UuaXNFcXVhbChuZXdFdmVudFJhbmdlLmNyYW5nZSkpIHsgcmV0dXJuIH1cbiAgICBjb25zdCB7cGVyc2lzdE9uQ3Vyc29yTW92ZSA9IGZhbHNlfSA9IHRvb2x0aXBEYXRhXG4gICAgbGV0IG1zZ1xuICAgIGlmIChBcnJheS5pc0FycmF5KHRvb2x0aXBEYXRhLnRleHQpKSB7XG4gICAgICBtc2cgPSB0b29sdGlwRGF0YS50ZXh0Lm1hcChNZXNzYWdlT2JqZWN0LmZyb21PYmplY3QuYmluZChNZXNzYWdlT2JqZWN0KSlcbiAgICB9IGVsc2Uge1xuICAgICAgbXNnID0gTWVzc2FnZU9iamVjdC5mcm9tT2JqZWN0KHRvb2x0aXBEYXRhLnRleHQpXG4gICAgfVxuICAgIGNvbnRyb2xsZXIudG9vbHRpcHMuc2hvdyhcbiAgICAgIHRvb2x0aXBEYXRhLnJhbmdlLCBtc2csIHR5cGUsIHBsdWdpbk5hbWUsIHtwZXJzaXN0T25DdXJzb3JNb3ZlfVxuICAgIClcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgZGVmYXVsdFRvb2x0aXBGdW5jdGlvbiAoZWRpdG9yOiBUZXh0RWRpdG9yLCB0eXBlOiBURXZlbnRSYW5nZVR5cGUgPSAnbW91c2UnLCBjcmFuZ2U6IFJhbmdlKSB7XG4gICAgZm9yIChjb25zdCB7cGx1Z2luTmFtZSwgaGFuZGxlcn0gb2YgdGhpcy5wcm92aWRlcnMpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHRvb2x0aXBEYXRhID0gYXdhaXQgUHJvbWlzZS5yZXNvbHZlKGhhbmRsZXIoZWRpdG9yLCBjcmFuZ2UsIHR5cGUpKVxuICAgICAgICBpZiAoIXRvb2x0aXBEYXRhKSB7XG4gICAgICAgICAgY29udGludWVcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge3BsdWdpbk5hbWUsIHRvb2x0aXBEYXRhfVxuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICB0aGlzLnBsdWdpbk1hbmFnZXIub3V0cHV0Vmlldy5iYWNrZW5kU3RhdHVzKHBsdWdpbk5hbWUsIGUpXG4gICAgICAgIGNvbnRpbnVlXG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iXX0=
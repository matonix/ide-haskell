"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const atom_1 = require("atom");
function create(pluginName, pluginManager) {
    return {
        status(status) {
            pluginManager.outputView.backendStatus(pluginName, status);
        },
        add(messages, types) {
            messages = messages.map((m) => {
                if (m.position) {
                    m.position = atom_1.Point.fromObject(m.position);
                }
                return m;
            });
            pluginManager.checkResults.appendResults(messages, types);
        },
        set(messages, types) {
            messages = messages.map((m) => {
                if (m.position) {
                    m.position = atom_1.Point.fromObject(m.position);
                }
                return m;
            });
            pluginManager.checkResults.setResults(messages, types);
        },
        clear(types) {
            pluginManager.checkResults.setResults([], types);
        },
        setTypes(types) {
            for (const type of Object.keys(types)) {
                const opts = types[type];
                pluginManager.outputView.createTab(type, opts);
            }
        },
    };
}
exports.create = create;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvdXBpLTMvaW5zdGFuY2UvbWVzc2FnZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwrQkFBMEI7QUE0RDFCLGdCQUF3QixVQUFrQixFQUFFLGFBQTRCO0lBQ3RFLE1BQU0sQ0FBQztRQUNMLE1BQU0sQ0FBRSxNQUFNO1lBQ1osYUFBYSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsVUFBVSxFQUFFLE1BQU0sQ0FBQyxDQUFBO1FBQzVELENBQUM7UUFDRCxHQUFHLENBQUUsUUFBUSxFQUFFLEtBQUs7WUFDbEIsUUFBUSxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUN4QixFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztvQkFDZixDQUFDLENBQUMsUUFBUSxHQUFHLFlBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFBO2dCQUMzQyxDQUFDO2dCQUNELE1BQU0sQ0FBQyxDQUFDLENBQUE7WUFDVixDQUFDLENBQUMsQ0FBQTtZQUNGLGFBQWEsQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQTtRQUMzRCxDQUFDO1FBQ0QsR0FBRyxDQUFFLFFBQVEsRUFBRSxLQUFLO1lBQ2xCLFFBQVEsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDeEIsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7b0JBQ2YsQ0FBQyxDQUFDLFFBQVEsR0FBRyxZQUFLLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQTtnQkFDM0MsQ0FBQztnQkFDRCxNQUFNLENBQUMsQ0FBQyxDQUFBO1lBQ1YsQ0FBQyxDQUFDLENBQUE7WUFDRixhQUFhLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUE7UUFDeEQsQ0FBQztRQUNELEtBQUssQ0FBRSxLQUFLO1lBQ1YsYUFBYSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFBO1FBQ2xELENBQUM7UUFDRCxRQUFRLENBQUUsS0FBSztZQUNiLEdBQUcsQ0FBQyxDQUFDLE1BQU0sSUFBSSxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN0QyxNQUFNLElBQUksR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUE7Z0JBQ3hCLGFBQWEsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQTtZQUNoRCxDQUFDO1FBQ0gsQ0FBQztLQUNGLENBQUE7QUFDSCxDQUFDO0FBakNELHdCQWlDQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7UG9pbnR9IGZyb20gJ2F0b20nXG5pbXBvcnQge1BsdWdpbk1hbmFnZXJ9IGZyb20gJy4uLy4uL3BsdWdpbi1tYW5hZ2VyJ1xuaW1wb3J0IHtJUmVzdWx0SXRlbSwgVFNldmVyaXR5fSBmcm9tICcuLi8uLi9yZXN1bHRzLWRiJ1xuaW1wb3J0IHtJU3RhdHVzLCBJU2V0VHlwZXNQYXJhbXN9IGZyb20gJy4uLy4uL291dHB1dC1wYW5lbCdcblxuZXhwb3J0IGludGVyZmFjZSBJTWFpbkludGVyZmFjZSB7XG4gIC8qKlxuICBTZXRzIGJhY2tlbmQgc3RhdHVzXG4gIEBwYXJhbSBzdGF0dXMge09iamVjdH1cbiAgICBzdGF0dXM6IG9uZSBvZiAncHJvZ3Jlc3MnLCAncmVhZHknLCAnZXJyb3InLCAnd2FybmluZydcbiAgICBwcm9ncmVzczogZmxvYXQgYmV0d2VlbiAwIGFuZCAxLCBvbmx5IHJlbGV2YW50IHdoZW4gc3RhdHVzIGlzICdwcm9ncmVzcydcbiAgICAgICAgICAgICAgaWYgMCBvciB1bmRlZmluZWQsIHByb2dyZXNzIGJhciBpcyBub3Qgc2hvd25cbiAgKi9cbiAgc3RhdHVzIChzdGF0dXM6IElTdGF0dXMpOiB2b2lkXG5cbiAgLyoqXG4gIEFkZCBtZXNzYWdlcyB0byBpZGUtaGFza2VsbCBvdXRwdXRcbiAgQHBhcmFtIG1lc3NhZ2VzOiB7QXJyYXk8T2JqZWN0Pn1cbiAgICB1cmk6IFN0cmluZywgRmlsZSBVUkkgbWVzc2FnZSByZWxhdGVzIHRvXG4gICAgcG9zaXRpb246IFBvaW50LCBvciBQb2ludC1saWtlIE9iamVjdCwgcG9zaXRpb24gdG8gd2hpY2ggbWVzc2FnZSByZWxhdGVzXG4gICAgbWVzc2FnZTogU3RyaW5nIG9yIHs8dGV4dCB8IGh0bWw+LCBoaWdobGlnaHRlcj99LCBtZXNzYWdlXG4gICAgc2V2ZXJpdHk6IFN0cmluZywgb25lIG9mICdlcnJvcicsICd3YXJuaW5nJywgJ2xpbnQnLCAnYnVpbGQnLFxuICAgICAgICAgICAgICBvciB1c2VyLWRlZmluZWQsIHNlZSBgc2V0TWVzc2FnZVR5cGVzYFxuICBAcGFyYW0gdHlwZXM6IEFycmF5IG9mIFN0cmluZywgY29udGFpbmluZyBwb3NzaWJsZSBtZXNzYWdlIGBzZXZlcml0eWAuIElmIHVuZGVmaW5lZCxcbiAgICAgICAgIHdpbGwgYmUgdGFrZW4gZnJvbSBgbWVzc2FnZXNgXG4gICovXG4gIGFkZCAobWVzc2FnZXM6IElSZXN1bHRJdGVtW10sIHR5cGVzOiBUU2V2ZXJpdHlbXSk6IHZvaWRcblxuICAvKipcbiAgU2V0IG1lc3NhZ2VzIGluIGlkZS1oYXNrZWxsIG91dHB1dC4gQ2xlYXJzIGFsbCBleGlzdGluZyBtZXNzYWdlcyB3aXRoXG4gIGBzZXZlcml0eWAgaW4gYHR5cGVzYFxuICBtZXNzYWdlczogQXJyYXkgb2YgT2JqZWN0XG4gICAgdXJpOiBTdHJpbmcsIEZpbGUgVVJJIG1lc3NhZ2UgcmVsYXRlcyB0b1xuICAgIHBvc2l0aW9uOiBQb2ludCwgb3IgUG9pbnQtbGlrZSBPYmplY3QsIHBvc2l0aW9uIHRvIHdoaWNoIG1lc3NhZ2UgcmVsYXRlc1xuICAgIG1lc3NhZ2U6IFN0cmluZywgbWVzc2FnZVxuICAgIHNldmVyaXR5OiBTdHJpbmcsIG9uZSBvZiAnZXJyb3InLCAnd2FybmluZycsICdsaW50JywgJ2J1aWxkJyxcbiAgICAgICAgICAgICAgb3IgdXNlci1kZWZpbmVkLCBzZWUgYHNldE1lc3NhZ2VUeXBlc2BcbiAgdHlwZXM6IEFycmF5IG9mIFN0cmluZywgY29udGFpbmluZyBwb3NzaWJsZSBtZXNzYWdlIGBzZXZlcml0eWAuIElmIHVuZGVmaW5lZCxcbiAgICAgICAgIHdpbGwgYmUgdGFrZW4gZnJvbSBgbWVzc2FnZXNgXG4gICovXG4gIHNldCAobWVzc2FnZXM6IElSZXN1bHRJdGVtW10sIHR5cGVzOiBUU2V2ZXJpdHlbXSk6IHZvaWRcblxuICAvKipcbiAgQ2xlYXIgYWxsIGV4aXN0aW5nIG1lc3NhZ2VzIHdpdGggYHNldmVyaXR5YCBpbiBgdHlwZXNgXG4gIFRoaXMgaXMgc2hvcnRoYW5kIGZyb20gYHNldE1lc3NhZ2VzKFtdLHR5cGVzKWBcbiAgKi9cbiAgY2xlYXIgKHR5cGVzOiBUU2V2ZXJpdHlbXSk6IHZvaWRcblxuICAvKipcbiAgU2V0IHBvc3NpYmxlIG1lc3NhZ2UgYHNldmVyaXR5YCB0aGF0IHlvdXIgcGFja2FnZSB3aWxsIHVzZS5cbiAgdHlwZXM6IE9iamVjdCB3aXRoIGtleXMgcmVwcmVzZW50aW5nIHBvc3NpYmxlIG1lc3NhZ2UgYHNldmVyaXR5YCAoaS5lLiB0YWIgbmFtZSlcbiAgICAgICAgIGFuZCB2YWx1ZXMgYmVpbmcgT2JqZWN0cyB3aXRoIGtleXNcbiAgICB1cmlGaWx0ZXI6IEJvb2wsIHNob3VsZCB1cmkgZmlsdGVyIGFwcGx5IHRvIHRhYj9cbiAgICBhdXRvU2Nyb2xsOiBCb29sLCBzaG91bGQgdGFiIGF1dG8tc2Nyb2xsP1xuXG4gIFRoaXMgYWxsb3dzIHRvIGRlZmluZSBjdXN0b20gb3V0cHV0IHBhbmVsIHRhYnMuXG4gICovXG4gIHNldFR5cGVzICh0eXBlczogSVNldFR5cGVzUGFyYW1zKTogdm9pZCAvLyBUT0RPOiBzaG91bGQgYWRkIGRpc3Bvc2FibGVcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZSAocGx1Z2luTmFtZTogc3RyaW5nLCBwbHVnaW5NYW5hZ2VyOiBQbHVnaW5NYW5hZ2VyKTogSU1haW5JbnRlcmZhY2Uge1xuICByZXR1cm4ge1xuICAgIHN0YXR1cyAoc3RhdHVzKSB7XG4gICAgICBwbHVnaW5NYW5hZ2VyLm91dHB1dFZpZXcuYmFja2VuZFN0YXR1cyhwbHVnaW5OYW1lLCBzdGF0dXMpXG4gICAgfSxcbiAgICBhZGQgKG1lc3NhZ2VzLCB0eXBlcykge1xuICAgICAgbWVzc2FnZXMgPSBtZXNzYWdlcy5tYXAoKG0pID0+IHtcbiAgICAgICAgaWYgKG0ucG9zaXRpb24pIHtcbiAgICAgICAgICBtLnBvc2l0aW9uID0gUG9pbnQuZnJvbU9iamVjdChtLnBvc2l0aW9uKVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBtXG4gICAgICB9KVxuICAgICAgcGx1Z2luTWFuYWdlci5jaGVja1Jlc3VsdHMuYXBwZW5kUmVzdWx0cyhtZXNzYWdlcywgdHlwZXMpXG4gICAgfSxcbiAgICBzZXQgKG1lc3NhZ2VzLCB0eXBlcykge1xuICAgICAgbWVzc2FnZXMgPSBtZXNzYWdlcy5tYXAoKG0pID0+IHtcbiAgICAgICAgaWYgKG0ucG9zaXRpb24pIHtcbiAgICAgICAgICBtLnBvc2l0aW9uID0gUG9pbnQuZnJvbU9iamVjdChtLnBvc2l0aW9uKVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBtXG4gICAgICB9KVxuICAgICAgcGx1Z2luTWFuYWdlci5jaGVja1Jlc3VsdHMuc2V0UmVzdWx0cyhtZXNzYWdlcywgdHlwZXMpXG4gICAgfSxcbiAgICBjbGVhciAodHlwZXMpIHtcbiAgICAgIHBsdWdpbk1hbmFnZXIuY2hlY2tSZXN1bHRzLnNldFJlc3VsdHMoW10sIHR5cGVzKVxuICAgIH0sXG4gICAgc2V0VHlwZXMgKHR5cGVzKSB7XG4gICAgICBmb3IgKGNvbnN0IHR5cGUgb2YgT2JqZWN0LmtleXModHlwZXMpKSB7XG4gICAgICAgIGNvbnN0IG9wdHMgPSB0eXBlc1t0eXBlXVxuICAgICAgICBwbHVnaW5NYW5hZ2VyLm91dHB1dFZpZXcuY3JlYXRlVGFiKHR5cGUsIG9wdHMpXG4gICAgICB9XG4gICAgfSxcbiAgfVxufVxuIl19
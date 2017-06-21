"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("core-js/client/shim");
require("reflect-metadata");
require('zone.js/dist/zone');
require("ts-helpers");
if (process.env.ENV === 'build') {
    // Production
}
else {
    // Development
    Error['stackTraceLimit'] = Infinity;
    require('zone.js/dist/long-stack-trace-zone');
}
//# sourceMappingURL=polyfills.js.map
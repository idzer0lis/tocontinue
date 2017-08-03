/**
 * Avaya Inc. - Proprietary (Restricted)
 * Solely for authorized persons having a need to know pursuant to Company instructions.
 *
 * Copyright © Avaya Inc. All rights reserved.
 *
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 * The copyright notice above does not evidence any actual or intended publication of such source code.
 */
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
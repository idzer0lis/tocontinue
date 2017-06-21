"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const api_service_1 = require("../api.service");
const http_1 = require("@angular/http");
const angular_in_memory_web_api_1 = require("angular-in-memory-web-api");
const in_memory_data_service_1 = require("../in-memory-data.service");
describe('Api Service', () => {
    beforeEach(() => {
        testing_1.TestBed.configureTestingModule({
            imports: [http_1.HttpModule, angular_in_memory_web_api_1.InMemoryWebApiModule.forRoot(in_memory_data_service_1.UserData)],
            providers: [api_service_1.ApiService]
        });
    });
    it('should ...', testing_1.inject([api_service_1.ApiService], (api) => {
        expect(api.title).toBe('World');
    }));
});
//# sourceMappingURL=api.service.spec.js.map

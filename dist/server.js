"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Crawler_1 = require("./src/Crawler/Crawler");
var crawler = new Crawler_1.default(10, "http://www.arstechnica.com", "stemming");
crawler.crawl();
//# sourceMappingURL=server.js.map
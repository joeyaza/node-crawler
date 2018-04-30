"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var request = require('request');
var cheerio = require('cheerio');
var URL = require('url-parse');
var Crawler = (function () {
    function Crawler(maxPagesToVisit, urls, searchWord) {
        this.maxPagesToVisit = maxPagesToVisit;
        this.urls = urls;
        this.searchWord = searchWord;
        this.numPagesVisited = 0;
        this.pagesToVisit = [];
        this.pagesVisited = {};
        this.url = new URL(this.urls[0]);
        this.baseUrl = this.url.protocol + "//" + this.url.hostname;
        this.maxPagesToVisit = maxPagesToVisit;
        this.urls = urls;
        this.searchWord = searchWord;
        this.pagesToVisit = this.urls;
    }
    Crawler.prototype.crawl = function () {
        if (this.numPagesVisited >= this.maxPagesToVisit) {
            console.log("Reached max limit of number of pages to visit.");
            return;
        }
        console.log(">>>", this.pagesToVisit);
        var nextPage = this.pagesToVisit.pop();
        if (!nextPage) {
            console.log("pages finished!!!");
            return;
        }
        if (nextPage in this.pagesVisited) {
            this.crawl();
        }
        else {
            this.visitPage(nextPage, this.crawl);
        }
    };
    Crawler.prototype.visitPage = function (url, callback) {
        var _this = this;
        this.pagesVisited[url] = true;
        this.numPagesVisited++;
        console.log("Visiting page " + url);
        request(url, function (error, response, body) {
            if (response.statusCode !== 200) {
                return callback();
            }
            var $ = cheerio.load(body);
            var isWordFound = _this.searchForWord($, _this.searchWord);
            if (isWordFound) {
                console.log('Word ' + _this.searchWord + ' found at page ' + url);
            }
            else {
                callback.apply(_this);
            }
        });
    };
    Crawler.prototype.searchForWord = function ($, word) {
        var bodyText = $('html > body').text().toLowerCase();
        return (bodyText.indexOf(word.toLowerCase()) !== -1);
    };
    return Crawler;
}());
exports.default = Crawler;
//# sourceMappingURL=Crawler.js.map
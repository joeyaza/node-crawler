"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var request = require('request');
var cheerio = require('cheerio');
var URL = require('url-parse');
var Crawler = (function () {
    function Crawler(maxPagesToVisit, startUrl, searchWord) {
        this.maxPagesToVisit = maxPagesToVisit;
        this.startUrl = startUrl;
        this.searchWord = searchWord;
        this.numPagesVisited = 0;
        this.pagesToVisit = [];
        this.pagesVisited = {};
        this.url = new URL(this.startUrl);
        this.baseUrl = this.url.protocol + "//" + this.url.hostname;
        this.maxPagesToVisit = maxPagesToVisit;
        this.startUrl = startUrl;
        this.searchWord = searchWord;
        this.pagesToVisit.push(this.startUrl);
    }
    Crawler.prototype.crawl = function () {
        console.log("1");
        console.log("this>>>>>", this);
        if (this.numPagesVisited >= this.maxPagesToVisit) {
            console.log("Reached max limit of number of pages to visit.");
            return;
        }
        var nextPage = this.pagesToVisit.pop();
        if (!nextPage) {
            console.log("pages finished!!!");
            return;
        }
        if (nextPage in this.pagesVisited) {
            console.log(2);
            this.crawl();
        }
        else {
            console.log(3);
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
                _this.collectInternalLinks($);
                callback.apply(_this);
            }
        });
    };
    Crawler.prototype.searchForWord = function ($, word) {
        var bodyText = $('html > body').text().toLowerCase();
        return (bodyText.indexOf(word.toLowerCase()) !== -1);
    };
    Crawler.prototype.collectInternalLinks = function ($) {
        var _this = this;
        var relativeLinks = $("a[href^='/']");
        relativeLinks.each(function () {
            _this.pagesToVisit.push(_this.baseUrl + $(_this).attr('href'));
        });
    };
    return Crawler;
}());
exports.default = Crawler;
//# sourceMappingURL=Crawler.js.map
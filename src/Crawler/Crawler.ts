const request = require('request');
const cheerio = require('cheerio');
const URL = require('url-parse');

export default class Crawler {

    private numPagesVisited: number = 0;
    private pagesToVisit: any = [];
    private pagesVisited: object = {};
    private url = new URL(this.urls[0]);
    private baseUrl = this.url.protocol + "//" + this.url.hostname;

    constructor (
        public maxPagesToVisit: number,
        public urls: any,
        public searchWord: string) {

        this.maxPagesToVisit = maxPagesToVisit;
        this.urls = urls;
        this.searchWord = searchWord;
        this.pagesToVisit = this.urls;

    }

    crawl() {

        if (this.numPagesVisited >= this.maxPagesToVisit) {

            console.log("Reached max limit of number of pages to visit.");
            return;

        }

        const nextPage = this.pagesToVisit.shift();

        if (!nextPage) {

            console.log("pages finished!!!");
            return;

        }

        if (nextPage in this.pagesVisited) {

            this.crawl();
        
        } else {

            this.visitPage(nextPage, this.crawl);

        }

    }

    visitPage(url, callback) {

        this.pagesVisited[url] = true;
        this.numPagesVisited++;

        console.log("Visiting page " + url);

        request(url, (error, response, body) => {

         if(response.statusCode !== 200) {

           return callback();

         }

         const $: any = cheerio.load(body);

         const isWordFound = this.searchForWord($, this.searchWord);

         if(isWordFound) {

           console.log('Word ' + this.searchWord + ' found at page ' + url);

         } else {

           // this.collectInternalLinks($);

           callback.apply(this);

         }

      });


    }


    searchForWord($, word) {

          const bodyText: any = $('html > body').text().toLowerCase();
          
          return(bodyText.indexOf(word.toLowerCase()) !== -1);

    }

    // collectInternalLinks($) {

    //    const relativeLinks: any = $("a[href^='/']");

    //    console.log("Found " + relativeLinks.length + " relative links on page");

    //    const that = this;

    //    relativeLinks.each(function() {
        
    //       that.pagesToVisit.push(that.baseUrl + $(this).attr('href'));

    //    });

    // }


}






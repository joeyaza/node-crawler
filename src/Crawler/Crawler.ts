const request = require('request');
const cheerio = require('cheerio');
const URL = require('url-parse');

export default class Crawler {

    private numPagesVisited: number = 0;
    private pagesToVisit: any = [];
    private pagesVisited: object = {};
    private url = new URL(this.startUrl);
    private baseUrl = this.url.protocol + "//" + this.url.hostname;

    constructor(
        public maxPagesToVisit,
        public startUrl,
        public searchWord) {

        this.maxPagesToVisit = maxPagesToVisit;
        this.startUrl = startUrl;
        this.searchWord = searchWord;
        this.pagesToVisit.push(this.startUrl);

    }

    crawl() {

        if (this.numPagesVisited >= this.maxPagesToVisit) {

            console.log("Reached max limit of number of pages to visit.");
            return;

        }

        const nextPage = this.pagesToVisit.pop();

        if (!nextPage) {

            console.log("pages finished!!!");
            return;

        }

        if (nextPage in this.pagesVisited) {

            console.log(2);

            this.crawl();
        
        } else {

            console.log(3);

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

           this.collectInternalLinks($);

           callback.apply(this);

         }

      });


    }


    searchForWord($, word) {

          const bodyText: any = $('html > body').text().toLowerCase();
          
          return(bodyText.indexOf(word.toLowerCase()) !== -1);

    }

    collectInternalLinks($) {

        const relativeLinks: any = $("a[href^='/']");

        relativeLinks.each(() => {

            this.pagesToVisit.push(this.baseUrl + $(this).attr('href'));

        });

    }


}






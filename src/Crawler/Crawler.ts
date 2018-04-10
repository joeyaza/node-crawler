

export class Crawler {

    constructor(
        private numPagesVisited /*0*/ , private maxPagesToVisit /*10*/ , private pagesToVisit /*0*/ , private pagesVisited) {
    }

    crawl() {

        if (this.numPagesVisited >= this.maxPagesToVisit) {
            console.log("Reached max limit of number of pages to visit.");
            return;
        }

        let nextPage = pagesToVisit.pop();

        if (nextPage in pagesVisited) {
            // We've already visited this page, so repeat the crawl
            // crawl();
        } else {
            // New page we haven't visited
            // visitPage(nextPage, crawl);
        }


    }



}
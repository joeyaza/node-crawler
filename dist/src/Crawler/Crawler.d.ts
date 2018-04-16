export default class Crawler {
    maxPagesToVisit: any;
    startUrl: any;
    searchWord: any;
    private numPagesVisited;
    private pagesToVisit;
    private pagesVisited;
    private url;
    private baseUrl;
    constructor(maxPagesToVisit: any, startUrl: any, searchWord: any);
    crawl(): void;
    visitPage(url: any, callback: any): void;
    searchForWord($: any, word: any): boolean;
    collectInternalLinks($: any): void;
}

export default class Crawler {
    maxPagesToVisit: number;
    urls: any;
    searchWord: string;
    private numPagesVisited;
    private pagesToVisit;
    private pagesVisited;
    private url;
    private baseUrl;
    constructor(maxPagesToVisit: number, urls: any, searchWord: string);
    crawl(): void;
    visitPage(url: any, callback: any): void;
    searchForWord($: any, word: any): boolean;
}

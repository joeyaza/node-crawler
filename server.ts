import Crawler from "./src/Crawler/Crawler";

const crawler = new Crawler(10, ["http://www.arstechnica.com/", "http://www.google.com"], "nee nee");

crawler.crawl();
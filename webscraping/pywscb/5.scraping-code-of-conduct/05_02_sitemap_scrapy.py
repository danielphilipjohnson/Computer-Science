import scrapy
from scrapy.crawler import CrawlerProcess

class Spider(scrapy.spiders.SitemapSpider):
    name = 'spider'
    sitemap_urls = ['https://www.nasa.gov/sitemap.xml']

    def parse(self, response):
        print("Parsing: ", response)

if __name__ == "__main__":
    process = CrawlerProcess()
    process.crawl(Spider)
    process.start()


# https://www.microsoft.com/en-us/sitemap.aspx
# make https://www.semrush.com/blog/10-awesome-visual-proven-sitemap-generator-tools/
# https://dynomapper.com/blog/13-create-sitemaps/524-sitemap-mapping-the-ultimate-guide-to-sitemaps
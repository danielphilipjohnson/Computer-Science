import feedparser
import datetime
import delorean
import requests

rss = feedparser.parse('http://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml')

# https://www.theguardian.com/help/feeds
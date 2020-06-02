Detecting the opportunities
Creating personalized coupon codes
Sending a notification to the customer on their preferred channel
Preparing sales information
Generating a sales report



Let's take an example. For our project, our company wishes to set up up a marketing
campaign to improve engagement and sales. A very laudable effort. To do so, we can
divide the action into several steps:
1. We want to detect the best moment to launch the campaign, so we will be
notified from different sources about keywords that will help us make an
informed decision
2. The campaign will include the generation of individual codes to be sent to
potential customers
3. Parts of these codes will be sent directly to users over their preferred channel,
text message or email
4. To monitor the result of the campaign, the sales information will be compiled
and a sales report will be generated


Detecting the opportunities
In this recipe, we present a marketing campaign that is divided into several steps:
1. Detect the best moment to launch the campaign
2. Generate individual codes to be sent to potential customers
3. Send the codes directly to users over their preferred channel, text message or
email
4. Collate the results of the campaign and generate a sales report with analysis of
the results
This recipe shows step 1 of the campaign.


Our first stage is to detect the best time to launch a campaign. To do so, we will monitor a
list of news sites, searching for news containing one of our defined keywords. Any article
that matches these keywords will be added to a report that will be sent in an email.

requirements.txt
ronment if not already there:
$
 echo "delorean==1.0.0" >> requirements.txt
$
 echo "requests==2.18.3" >> requirements.txt
$
 echo "beautifulsoup4==4.6.0" >> requirements.txt
$
 echo "feedparser==5.2.1" >> requirements.txt
$
 echo "jinja2==2.10" >> requirements.txt
$
 echo "mistune==0.8.3" >> requirements.txt
$
 pip install -r requirements.txt


You need to make a list of RSS feeds, from which we will put our data.


in well-known news sites:
http:/​/​feeds.​reuters.​com/​reuters/​technologyNews
http:/​/​rss.​nytimes.​com/​services/​xml/​rss/​nyt/​Technology.​xml
http:/​/​feeds.​bbci.​co.​uk/​news/​science_​and_​environment/​rss.​xml


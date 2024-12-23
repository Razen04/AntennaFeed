import { opmlToJSON } from "opml-to-json";

const opml2 = 
`<?xml version="1.0" encoding="UTF-8"?>
<opml version="2.0">
  <head>
    <title>Default Subscriptions</title>
  </head>
  <body>
    <!-- Foldered feeds -->
    <outline text="General News">
      <outline text="The Hindu" title="The Hindu" type="rss" xmlUrl="https://www.thehindu.com/feeder/default.rss"/>
      <outline text="NDTV" title="NDTV" type="rss" xmlUrl="https://feeds.feedburner.com/ndtvnews-top-stories"/>
      <outline text="BBC News" title="BBC News" type="rss" xmlUrl="https://www.bbc.co.uk/feeds/rss/news/world/rss.xml"/>
      <outline text="The Guardian" title="The Guardian" type="rss" xmlUrl="https://www.theguardian.com/world/india/rss"/>
      <outline text="India Today" title="India Today" type="rss" xmlUrl="https://www.indiatoday.in/rss/home"/>
    </outline>
    <outline text="Technology">
      <outline text="The Verge" title="The Verge" type="rss" xmlUrl="https://www.theverge.com/tech/rss/index.xml"/>
      <outline text="9to5Google" title="9to5Google" type="rss" xmlUrl="https://9to5google.com/feed/"/>
      <outline text="TechCrunch" title="TechCrunch" type="rss" xmlUrl="https://techcrunch.com/feed/"/>
      <outline text="Gadgets360 by NDTV" title="Gadgets360 by NDTV" type="rss" xmlUrl="https://gadgets.ndtv.com/tech/rss/feeds"/>
    </outline>
    <outline text="Science">
      <outline text="NASA" title="NASA" type="rss" xmlUrl="https://www.nasa.gov/rss/dyn/breaking_news.rss"/>
      <outline text="The Verge" title="The Verge" type="rss" xmlUrl="https://www.theverge.com/science/rss/index.xml"/>
    </outline>
    <outline text="Sports">
      <outline text="BBC Sport" title="BBC Sport" type="rss" xmlUrl="http://feeds.bbci.co.uk/sport/rss.xml"/>
      <outline text="NDTV Sports" title="NDTV Sports" type="rss" xmlUrl="https://sports.ndtv.com/rss/all"/>
      <outline text="Bleacher Report" title="Bleacher Report" type="rss" xmlUrl="https://bleacherreport.com/rss"/>
      <outline text="GoalServe" title="GoalServe" type="rss" xmlUrl="https://www.goalserve.com/rss"/>
    </outline>
    <outline text="Entertainment">
      <outline text="The Verge" title="The Verge" type="rss" xmlUrl="https://www.theverge.com/rss/entertainment/index.xml"/>
    </outline>
    <outline text="Finance">
      <outline text="Moneycontrol" title="Moneycontrol" type="rss" xmlUrl="http://www.moneycontrol.com/rss/latestnews.xml"/>
      <outline text="Economic Times" title="Economic Times" type="rss" xmlUrl="https://economictimes.indiatimes.com/rssfeedsdefault.cms"/>
      <outline text="Business Line" title="Business Line" type="rss" xmlUrl="https://www.thehindubusinessline.com/feeder/default.rss"/>
    </outline>
  </body>
</opml>
`

const show = async () => {
    const json = await opmlToJSON(opml2)
    console.log(JSON.stringify(json, null, 2));
}

show();


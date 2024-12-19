import Parser from "rss-parser";
let parser = new Parser();

const parseFeed = async (url) => {
    try {
        let feed = await parser.parseURL(url)
        return feed;
    } catch (err) {
        console.error(err);
    }
    
}

export default parseFeed;
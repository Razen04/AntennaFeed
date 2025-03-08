import { gzip, ungzip } from "pako";

export const decompressFeed = (compressedFeeds) => {
    if (compressedFeeds.length === 0) {
        return [];
    }
    try {
        const decompressed = ungzip(compressedFeeds, { to: 'string' });
        return JSON.parse(decompressed);
    } catch (error) {
        console.error("Error decompressing feed:", error);
        return null;
    }
}

export const compressFeed = (feeds) => {
    if (feeds.length === 0) {
        return [];
    }
    try {
        if (feeds) {
            const feedString = JSON.stringify(feeds);
            const compressed = gzip(feedString);
            return compressed;
        } else {
            return feeds;
        }

    } catch (error) {
        console.error("Error compressing feed:", error);
        return null;
    }
};

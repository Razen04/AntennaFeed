import { gzip, ungzip } from "pako";

const testFeed = [];

const decompressFeed = (compressedFeeds) => {
    const decompressed = ungzip(compressedFeeds, { to: 'string' });
    return JSON.parse(decompressed);
}

// Compress
const compressedFeed = gzip(JSON.stringify(testFeed));
console.log("Compressed Feed:", compressedFeed);

// Decompress
const decompressedFeed = decompressFeed(compressedFeed);
console.log("Decompressed Feed:", decompressedFeed);

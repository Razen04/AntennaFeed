# Mewzfeed / AntennaFeed

Mewzfeed (also known as AntennaFeed) is a React-based RSS feed reader with text-to-speech and parsing features.

## Features
- Parses RSS feeds via [`src/Parser.js`](src/Parser.js ) (uses `rss-parser`).
- Shows feeds in [`src/components/ReaderPanel/Reader.jsx`](src/components/ReaderPanel/Reader.jsx ).  
- Text-to-speech highlighting in [`src/components/ReaderPanel/TextToSpeechWithHighlight.jsx`](src/components/ReaderPanel/TextToSpeechWithHighlight.jsx ).  
- Organizes feeds (e.g., BBC News, The Guardian, NASA) in [`src/userProfile.js`](src/userProfile.js ).  
- Lets users add feeds with [src/components/AddFeed/Add.jsx](src/components/AddFeed/Add.jsx).  
- Displays an article list in [`src/components/Articles/Articles.jsx`](src/components/Articles/Articles.jsx ).  
- Allows feed management and navigation in [`src/components/Sidebar/Sidebar.jsx`](src/components/Sidebar/Sidebar.jsx ).  

## Installation
1. Clone or download this repo.  
2. Install dependencies from [`package.json`](package.json ):  
```sh
npm install
```
3. Start development server:  
```sh
npm run dev
```

## Usage
After running the server, open http://localhost:5173/ (default Vite port) in your browser to view Mewzfeed. Modify preferences and add new feeds in-app.

## License
This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

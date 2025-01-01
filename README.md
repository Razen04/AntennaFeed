# Mewzfeed / AntennaFeed

Mewzfeed (also known as AntennaFeed) is a React-based RSS feed reader with text-to-speech and parsing features.

## Features
- Parses RSS feeds via [`src/Parser.js`](src/Parser.js) (uses `rss-parser`).
- Shows feeds in [`src/components/ReaderPanel/Reader.jsx`](src/components/ReaderPanel/Reader.jsx).
- Text-to-speech highlighting in [`src/components/ReaderPanel/TextToSpeechWithHighlight.jsx`](src/components/ReaderPanel/TextToSpeechWithHighlight.jsx).
- Organizes feeds (e.g., BBC News, The Guardian, NASA) in [`src/userProfile.js`](src/userProfile.js).
- Lets users add feeds with [`src/components/Add Feed/Add.jsx`](src/components/Add%20Feed/Add.jsx).
- Displays an article list in [`src/components/Articles/Articles.jsx`](src/components/Articles/Articles.jsx).
- Allows feed management and navigation in [`src/components/Sidebar/Sidebar.jsx`](src/components/Sidebar/Sidebar.jsx).

## Installation
1. Clone or download this repo.  
2. Install dependencies from [`package.json`](package.json):  
    ```sh
    npm install
    ```
3. Start development server:  
    ```sh
    npm run dev
    ```

## Usage
After running the server, open [http://localhost:5173/](http://localhost:5173/) (default Vite port) in your browser to view Mewzfeed. Modify preferences and add new feeds in-app.

## Development
### Project Structure
- [src](http://_vscodecontentref_/1): Contains the source code for the application.
  - [App.jsx](http://_vscodecontentref_/2): Main application component.
  - `assets/`: Contains static assets like images and styles.
  - `components/`: Contains React components.
    - `Add Feed/`: Components for adding new feeds.
    - `Articles/`: Components for displaying articles.
    - `ReaderPanel/`: Components for reading articles and text-to-speech.
    - `Sidebar/`: Components for feed management and navigation.
  - `index.css`: Global styles.
  - [main.jsx](http://_vscodecontentref_/3): Entry point for the React application.
  - `Parser.js`: RSS feed parser.
  - `userProfile.js`: User profile and feed organization.

### Scripts
- `dev`: Starts the development server.
- `build`: Builds the project for production.
- `lint`: Runs ESLint to check for code quality issues.
- `preview`: Previews the production build.

### Configuration
- [vite.config.js](http://_vscodecontentref_/4): Vite configuration file.
- [tailwind.config.js](http://_vscodecontentref_/5): Tailwind CSS configuration file.
- [postcss.config.js](http://_vscodecontentref_/6): PostCSS configuration file.
- [.eslintrc.cjs](http://_vscodecontentref_/7): ESLint configuration file.

## Contributing
Please read the [CODE_OF_CONDUCT.md](http://_vscodecontentref_/8) for details on our code of conduct, and the process for submitting pull requests.

## License
This project is licensed under the MIT License. See [LICENSE](http://_vscodecontentref_/9) for details.

## Acknowledgements
- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [rss-parser](https://www.npmjs.com/package/rss-parser)
- [DOMPurify](https://www.npmjs.com/package/dompurify)
- [cheerio](https://www.npmjs.com/package/cheerio)
- [moment](https://www.npmjs.com/package/moment)
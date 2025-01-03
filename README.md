# AntennaFeed

AntennaFeed is a React-based RSS feed reader with text-to-speech(not the best out there) and parsing features. This is a very common rss-reader app. Will try to make it unique as time passes. You can help me with it by contributing or raising issues.

## Features
- Parses RSS feeds via [`src/Parser.js`](src/Parser.js) (uses `rss-parser`).
- Shows feeds in [`src/components/ReaderPanel/Reader.jsx`](src/components/ReaderPanel/Reader.jsx).
- Text-to-speech highlighting in [`src/components/ReaderPanel/TextToSpeechWithHighlight.jsx`](src/components/ReaderPanel/TextToSpeechWithHighlight.jsx).
- Organizes feeds (e.g., BBC News, The Guardian, NASA) in [`src/userProfile.js`](src/userProfile.js).
- Lets users add feeds with [`src/components/Add Feed/AddFeed.jsx`](src/components/Add%20Feed/AddFeed.jsx).
- Displays an article list in [`src/components/Articles/Articles.jsx`](src/components/Articles/Articles.jsx).
- Allows feed management and navigation in [`src/components/Sidebar/Sidebar.jsx`](src/components/Sidebar/Sidebar.jsx).
- Supports OPML import/export in [`src/components/Add Feed/AddOpmlForm.jsx`](src/components/Add%20Feed/AddOpmlForm.jsx).
- Customizable themes and font settings in [`src/components/Sidebar/Theme.jsx`](src/components/Sidebar/Theme.jsx) and [`src/components/Sidebar/FontSetting.jsx`](src/components/Sidebar/FontSetting.jsx).

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
- [src](src): Contains the source code for the application.
  - [App.jsx](src/App.jsx): Main application component.
  - `assets/`: Contains static assets like images and styles.
  - `components/`: Contains React components.
    - `Add Feed/`: Components for adding new feeds.
    - `Articles/`: Components for displaying articles.
    - `MobileLayout/`: Components for mobile layout.
    - `ReaderPanel/`: Components for reading articles and text-to-speech.
    - `Sidebar/`: Components for feed management and navigation.
  - `index.css`: Global styles.
  - [main.jsx](src/main.jsx): Entry point for the React application.
  - `Parser.js`: RSS feed parser.
  - `userProfile.js`: User profile and feed organization.

### Scripts
- `dev`: Starts the development server.
- `build`: Builds the project for production.
- `lint`: Runs ESLint to check for code quality issues.
- `preview`: Previews the production build.

### Configuration
- [vite.config.js](vite.config.js): Vite configuration file.
- [tailwind.config.js](tailwind.config.js): Tailwind CSS configuration file.
- [postcss.config.js](postcss.config.js): PostCSS configuration file.
- [.eslintrc.cjs](.eslintrc.cjs): ESLint configuration file.

## Contributing
Please read the [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) for details on our code of conduct, and the process for submitting pull requests.

## License
This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

## Acknowledgements
- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [rss-parser](https://www.npmjs.com/package/rss-parser)
- [DOMPurify](https://www.npmjs.com/package/dompurify)
- [cheerio](https://www.npmjs.com/package/cheerio)
- [moment](https://www.npmjs.com/package/moment)
````
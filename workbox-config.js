module.exports = {
	globDirectory: 'dist/',
	globPatterns: [
		'**/*.{png,js,css,webmanifest,ico,svg,html}'
	],
	swDest: 'public/service-worker.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};
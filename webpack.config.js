const path = require('path');

module.exports = {
    mode: 'production',
    entry: './event',
    output: {
        path: path.resolve(__dirname, 'dist'), // string
        filename: 'event.min.js',
        library: 'event',
        libraryTarget: 'umd'
    }
};

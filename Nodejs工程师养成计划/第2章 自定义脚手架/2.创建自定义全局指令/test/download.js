const download = require('download-git-repo')
download('direct:git@github.com:Dante926/Express-template#main', './Express-template', { clone: true }, (err) => {
    if (err) {
        console.error('Clone failed:', err);
    } else {
        console.log('Clone successful!');
    }
});

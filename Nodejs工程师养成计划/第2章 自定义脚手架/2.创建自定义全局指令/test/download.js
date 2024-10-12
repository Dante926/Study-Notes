const download = require('download-git-repo')
download('direct:git@github.com:Dante926/Express-template#main', './xxx', { clone: true }, (err) => {
    console.log(err);
})
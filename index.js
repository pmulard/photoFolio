//Packages
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

var app = express();

var http = require('http').Server(app);

//Creates a public folder to store photos
app.use(express.static(path.join( __dirname, 'public')));

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');



/**
 * Reads and stores meta data from files in a directory and puts them into an array
 */

//Copied from https://stackoverflow.com/questions/10049557/reading-all-files-in-a-directory-store-them-in-objects-and-send-the-object
function readFiles(dirname, onFileContent, onError) {
  fs.readdir(dirname, function(err, filenames) {
    if (err) {
      onError(err);
      return;
    }
    filenames.forEach(function(filename) {
      fs.readFile(dirname + filename, 'utf-8', function(err, content) {
        if (err) {
          onError(err);
          return;
        }
        onFileContent(filename, content);
      });
    });
  });
}


/**
 * Renders ejs files based on the path
 */

app.get('/', function(req, res) {

	console.log('GETTING /');
	res.render('index', {});

});

app.get('/portfolio', function(req, res) {

	console.log('GETTING /portfolio');
	readFiles( 'public/photos')
		.then( files => {
			var imgs = [];
			files.forEach( (item, index) => {
				var name = item.filename;
				var prefix = name.split( '.')[0];
				imgs.push({
					title: prefix,
					url: '/photos/' + item.filename
				});
			});
			res.render('portfolio', {photos: imgs});
		}).catch( err => {
			console.log(err);
			res.render('index', {});
		});

});



/**
 * Boilerplate to start up the node server and have it listen
 */

http.listen(3001, function() {

	console.log('listening on #.3001');

});


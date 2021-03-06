const express = require('express');
const moment = require('moment');
const fs = require('fs');

var app = express();
app.set('port', process.env.PORT || 3000);


app.get('/', function(req, res) {
  fs.readFile('index.html', function (err, html) {
    if (err) {
        throw err;
    }
    res.write(html);
    res.end();
  });
});



app.get('/:tagId', function(req, res) {


  var unix_time = new RegExp(/\d{10}/)
  var natural_time = new RegExp(/(January|February|March|April|May|June?|July|August|September|October|November|December)\s(\d\d?).+?(\d\d\d\d)/)

  if (unix_time.test(req.params.tagId)){

      res.json({
        unix: req.params.tagId,
        natural: moment.unix(req.params.tagId).format("dddd, MMMM Do YYYY")

      });

  }
  else if (natural_time.test(req.params.tagId)) {
      res.json({
        unix: moment("January 31 1984").format("X"),
        natural: moment(req.params.tagId).format("dddd, MMMM Do YYYY")
      })
  }
  else {
      res.send({
        unix: null,
        natural: null
      })
  }



});

app.listen(app.get('port'), function () {
  console.log('Server started')
});

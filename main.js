const express = require('express');
const moment = require('moment')

var app = express();


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
      res.send({
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

app.listen(3000);

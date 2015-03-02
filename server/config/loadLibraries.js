var db = require('../db.js');
var DocSet = require('../models/docSet.js');
var DocElement = require('../models/docElement.js');
var fs = require('fs');
var ind = require('../models/index.js');

// Get library names
fs.readFile('./public/docs/docs.json', function(err, data){
  if (err) throw err

  // For each library, check if it exists, otherwise insert it
  JSON.parse(data).forEach(function(library){
    var libraryName = library.slug;
    var libraryData = {
      where: {name: libraryName},
      defaults: {
        name: libraryName,
        version: library.version
      }
    }
    DocSet.findOrCreate(libraryData)
      .then(function(result){
        if(result) {
          var docSetId = result[0].id;

          // Get the library methods
          fs.readFile('./public/docs/' + libraryName + '/index.json', function(err, data){
            if(err) throw err
            // For each method, update the method if it exists, otherwise insert it
            var methods = JSON.parse(data).entries;
            methods.forEach(function(method){
              var methodData = {
                name: method.name,
                DocSetId: docSetId
              };
              DocElement.upsert(methodData)
                .then(function(result){
                  console.log(method.name + ' is in the DB!');
                })
            });
          })
        }
      })
  })
});
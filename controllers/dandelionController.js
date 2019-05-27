const axios = require("axios");
const db = require("../models");

module.exports = { //this is a module for the ajax call from axios api for google here
  create: function(req, res) {
    //console.log(query);
    const { query, params } = req;
    const { q } = query;
    // We use axios to hit APIs
    // In this example, we hit the google books API (which lives on a separate server), from our API that we build using node express linked with a mongo databse
    // console.log(q);
    axios
      .get(`https://api.dandelion.eu/datatxt/nex/v1/?text=${q}&lang=en&social=False&top_entities=8&include=image%2Cabstract%2Ctypes%2Ccategories%2Clod&token=ff2ade2f45aa4e32bff9f308bd923a8c&min_confidence=0.1`
      , {
        params
      })
      .then(results => { 
        const { data } = results;
        const { id, title, abstract, image, confidence, uri}
         = data.annotations[0]; //grabs all from obj and applies to extracted results
        //console.log( data.annotations[0]);
        let card = { id, title, abstract, image: image.thumbnail, confidence, uri};  
        console.log(card)
        if (Object.keys(card).length == 0) throw new Error( "Currently, no results; Refine search.");
        res.json(card);// If we were able to successfully create Card, send it back to the client  
      }).catch(err => res.status(422).json(err));
    }
  };

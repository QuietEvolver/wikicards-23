import axios from "axios"; //api call from axios ajax for react
var hostName = process.env.NODE_ENV == "development" ? "http://localhost:3001" : ""; //calls local server
export default {
  getCard: function(q) { //TDD: return test first.
    //return { params: { q: "title:" + q } };
    return axios.get ( hostName + "/api/dandelion", { params: { q } });// q:q = { params: { q: "title:" + q} }
  },
  getSavedCard: function() {
    return axios.get( hostName + "/api/card");  //return {}  //TDD: return test first. 
  },
  getAllCards: function( id ) {
    console.log(id)
    return axios.get( hostName + "/api/card", { params: { id } }); 
  },
  deleteCard: function(id) {
    return axios.delete( hostName + "/api/card/" + id);  //return {} 
  },
  saveCard: function(cardData) {
    console.log(cardData)
    return axios.post( hostName + "/api/card", cardData);  //return {} 
  }, 
  createDeck: function(name, id) {
    console.log(name)
  return axios.post( hostName + "/api/deck", {name, id});  //deck:name
  }, 
  getAllDecks: function( id ) {
    return axios.get( hostName + "/api/deck?id=" + id ); //concats the id to query 
  }
  
};  
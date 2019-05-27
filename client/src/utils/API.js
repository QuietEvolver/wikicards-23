import axios from "axios"; //api call from axios ajax for react
var hostName = "http://localhost:3001";
export default {
  getCard: function(q) { //TDD: return test first.
    //return { params: { q: "title:" + q } };
    return axios.get ( hostName + "/api/dandelion", { params: { q } });// q:q = { params: { q: "title:" + q} }
  },
  getSavedCard: function() {
    return axios.get( hostName + "/api/card");  //return {}  //TDD: return test first. 
  },
  deleteCard: function(id) {
    return axios.delete( hostName + "/api/card/" + id);  //return {} 
  },
  saveCard: function(cardData) {
    console.log(cardData)
    return axios.post( hostName + "/api/card", cardData);  //return {} 
  }, 
  createDeck: function(name) {
    console.log(name)
  return axios.post( hostName + "/api/deck", {name});  //deck:name
  }, 
  getAllDecks: function() {
    return axios.get( hostName + "/api/deck"); 
  }
  
};  
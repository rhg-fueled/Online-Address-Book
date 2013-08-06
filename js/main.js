var _name="" ;
var _address="" ;
var _id ;
var _radioButtonSortByName;
var _radioButtonSortbyAddress;
var _sortBy="";
var _string = "";
var _radioButtonSortByName    = document.getElementById("radioButtonName");
var _radioButtonSortbyAddress = document.getElementById("radioButtonAddress"); 
var _search   = document.getElementById("Search");
var _delete   = document.getElementById("Delete");
var _name     = document.getElementById("Name");
var _address  = document.getElementById("Address");
var _displaySpace = "Address-Book";


var addressBook = {};
addressBook.webdb = {};
addressBook.webdb.db = null;


addressBook.webdb.open = function() {
  var dbSize = 5 * 1024 * 1024; // 5MB
  addressBook.webdb.db = openDatabase("Address-Book", "1.0", "Address-Book", dbSize);
}


addressBook.webdb.createTable = function() {
  var db = addressBook.webdb.db;
  db.transaction(function(tx) {
    tx.executeSql("CREATE TABLE IF NOT EXISTS addressBook (ID INTEGER PRIMARY KEY ASC, Name TEXT, Address TEXT)", []);
  });
}


addressBook.webdb.addaddressBook = function(_name, _address) {
  var db = addressBook.webdb.db;
  db.transaction(function(tx){
    tx.executeSql("INSERT INTO addressBook (Name, Address) VALUES (?,?)",
        [_name, _address],
        addressBook.webdb.onSuccess,
        addressBook.webdb.onError);
   });
}


addressBook.webdb.onError = function(tx, e) {
  alert("There has been an error: " + e.message);
}


addressBook.webdb.onSuccess = function(tx, r) {
  // re-render the data.
  //addressBook.webdb.getAlladdressBookItems(loadaddressBookItems);
}


addressBook.webdb.getAlladdressBookItems = function(renderFunc) {
  var db = addressBook.webdb.db;
  db.transaction(function(tx) {
    tx.executeSql("SELECT * FROM addressBook", [], renderFunc,
        addressBook.webdb.onError);
  });
}


addressBook.webdb.sortRecords = function(renderFunc, _sortBy) {
  var db = addressBook.webdb.db;
  db.transaction(function(tx) {
    tx.executeSql("SELECT * FROM addressBook ORDER BY " + _sortBy, [], renderFunc,
        addressBook.webdb.onError);
  });
}


addressBook.webdb.deleteaddressBook = function(id) {
  var db = addressBook.webdb.db;
  db.transaction(function(tx){
    tx.executeSql("DELETE FROM addressBook WHERE Name = ?", [id],
        addressBook.webdb.onSuccess,
        addressBook.webdb.onError);
    });
}


addressBook.webdb.searchaddressBook = function(renderFunc, id) {
  var db = addressBook.webdb.db;
  db.transaction(function(tx){
    tx.executeSql("SELECT * FROM addressBook WHERE Name LIKE ? ", [id+"%"], renderFunc,
        addressBook.webdb.onError);
    });
}

function loadaddressBookItems(tx, rs) {
 var rowOutput = "Address-Book";
 var _addressBook = document.getElementById(_displaySpace);

  rowOutput+="<table width='100%' > <tr>";

  rowOutput += "<th> ID </th>";
  rowOutput += "<th> Name </th>";
  rowOutput += "<th> Address </th>";

  rowOutput += "</tr>";

  for (var i=0; i < rs.rows.length; i++) {
    rowOutput +=" <tr>";
    rowOutput += renderaddressBook(rs.rows.item(i));
    rowOutput += "</tr>";
  }

  _addressBook.innerHTML = rowOutput;
}

function renderaddressBook(row) {

  return "<td>" + row.ID + "</td>" + 
         "<td>" + row.Name + "</td>" + 
         "<td>" + row.Address + "</td>";
}


function init() {
  _displaySpace = "Address-Book";
  addressBook.webdb.open();
  addressBook.webdb.createTable();
  addressBook.webdb.getAlladdressBookItems(loadaddressBookItems);
}



$( "#addButton" ).click(function() {
     _displaySpace = "Address-Book";
     addressBook.webdb.addaddressBook(_name.value, _address.value);
     addressBook.webdb.getAlladdressBookItems(loadaddressBookItems);
});



$("#deleteButton").click(function() {
    _displaySpace = "Address-Book";
    addressBook.webdb.deleteaddressBook(_delete.value);
    addressBook.webdb.getAlladdressBookItems(loadaddressBookItems);
});



$("#searchButton").click(function() {
    _displaySpace = "Search-Results";
    addressBook.webdb.searchaddressBook(loadaddressBookItems, _search.value);
});



$("#sortButton").click(function() {
    _displaySpace = "Address-Book";  
    if(_radioButtonSortByName.checked)
      _sortBy = "Name";

    else if(_radioButtonSortbyAddress.checked)
      _sortBy = "Address";

  addressBook.webdb.sortRecords(loadaddressBookItems, _sortBy);
});


$(document).ready(function (){
      init();
});









var _name="" ;
var _address="" ;
<<<<<<< HEAD
var _search="";
var _id ;
var _rb1;
var _rb2;
var type="";
var string = "";

var html5rocks = {};
html5rocks.webdb = {};
html5rocks.webdb.db = null;

html5rocks.webdb.open = function() {
  var dbSize = 5 * 1024 * 1024; // 5MB
  html5rocks.webdb.db = openDatabase("Todo", "1.0", "Todo manager", dbSize);
}

html5rocks.webdb.createTable = function() {
  var db = html5rocks.webdb.db;
  db.transaction(function(tx) {
    tx.executeSql("CREATE TABLE IF NOT EXISTS todo (ID INTEGER PRIMARY KEY ASC, Name TEXT, Address TEXT)", []);
  });
}

html5rocks.webdb.addTodo = function(_name, _address) {
  var db = html5rocks.webdb.db;
  db.transaction(function(tx){
    tx.executeSql("INSERT INTO todo (Name, Address) VALUES (?,?)",
        [_name, _address],
        html5rocks.webdb.onSuccess,
        html5rocks.webdb.onError);
   });
}

html5rocks.webdb.onError = function(tx, e) {
  alert("There has been an error: " + e.message);
}

html5rocks.webdb.onSuccess = function(tx, r) {
  // re-render the data.
  alert("onSuccess");
  //html5rocks.webdb.getAllTodoItems(loadTodoItems);
}


html5rocks.webdb.getAllTodoItems = function(renderFunc) {
  var db = html5rocks.webdb.db;
  db.transaction(function(tx) {
    tx.executeSql("SELECT * FROM todo", [], renderFunc,
        html5rocks.webdb.onError);
  });
}

html5rocks.webdb.sortRecords = function(renderFunc, type) {
  var db = html5rocks.webdb.db;
  db.transaction(function(tx) {
    tx.executeSql("SELECT * FROM todo ORDER BY " + type, [], renderFunc,
        html5rocks.webdb.onError);
=======
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
>>>>>>> gh-pages
  });
}


<<<<<<< HEAD
html5rocks.webdb.deleteTodo = function(id) {
  var db = html5rocks.webdb.db;
  db.transaction(function(tx){
    tx.executeSql("DELETE FROM todo WHERE Name=?", [id],
        html5rocks.webdb.onSuccess,
        html5rocks.webdb.onError);
    });
}

html5rocks.webdb.searchTodo = function(renderFunc, id) {
  var db = html5rocks.webdb.db;
  db.transaction(function(tx){
    tx.executeSql("SELECT * FROM todo WHERE Name=?", [id], renderFunc,
        html5rocks.webdb.onError);
    });
}

function loadTodoItems(tx, rs) {
 var rowOutput = "Address-Book";
 var _addressBook = document.getElementById("Address-Book");

  rowOutput+="<table width='100%' > <tr>";

  rowOutput += "<th align='center' bgcolor=\"#C0C0C0\" > ID </th>";
  rowOutput += "<th align='center' bgcolor=\"#C0C0C0\" > Name </th>";
  rowOutput += "<th align='center' bgcolor=\"#C0C0C0\" > Address </th>";
=======
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
>>>>>>> gh-pages

  rowOutput += "</tr>";

  for (var i=0; i < rs.rows.length; i++) {
    rowOutput +=" <tr>";
<<<<<<< HEAD
    rowOutput += renderTodo(rs.rows.item(i));
=======
    rowOutput += renderaddressBook(rs.rows.item(i));
>>>>>>> gh-pages
    rowOutput += "</tr>";
  }

  _addressBook.innerHTML = rowOutput;
}

<<<<<<< HEAD
function loadTodoItems2(tx, rs) {
  var rowOutput = "Search-Results";
  var _addressBook = document.getElementById("Search-Results");

  rowOutput+="<table width='100%' > <tr>";

  rowOutput += "<th align='center' bgcolor=\"#C0C0C0\" > ID </th>";
  rowOutput += "<th align='center' bgcolor=\"#C0C0C0\" > Name </th>";
  rowOutput += "<th align='center' bgcolor=\"#C0C0C0\" > Address </th>";

  rowOutput += "</tr>";

  for (var i=0; i < rs.rows.length; i++) {
    rowOutput +=" <tr>";
    rowOutput += renderTodo(rs.rows.item(i));
    rowOutput += "</tr>";
  }

  _addressBook.innerHTML = rowOutput;
}


function renderTodo(row) {

  return "<td>" + row.ID + "</td>" + 
         "<td>" + row.Name + "</td>" + 
         "<td>" + row.Address + "</td>";
 
}


function init() {
  html5rocks.webdb.open();
  html5rocks.webdb.createTable();
  html5rocks.webdb.getAllTodoItems(loadTodoItems);
}

function addTodo() {
   _name = document.getElementById("Name").value;
   _address = document.getElementById("Address").value;
   html5rocks.webdb.addTodo(_name, _address);
   html5rocks.webdb.getAllTodoItems(loadTodoItems);
}

function deleteRecord(){
	_id = document.getElementById("Delete").value;
	html5rocks.webdb.deleteTodo(_id);
  html5rocks.webdb.getAllTodoItems(loadTodoItems);
}

function searchRecord(){
	_id = (document.getElementById("Search").value);
	html5rocks.webdb.searchTodo(loadTodoItems2, _id);
}

function sortRecord(){
  _rb1 = (document.getElementById("radioButtonName").checked);
  //_rb2 = (document.getElementById("radioButtonAddress").checked); 
  if(_rb1)
    type = "Name";
  else
    type = "Address";

  html5rocks.webdb.sortRecords(loadTodoItems, type);
}
=======
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








>>>>>>> gh-pages

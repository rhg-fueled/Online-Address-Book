var _name="" ;
var _address="" ;
var _search="";
var _id ;
var _rb1;
var _rb2;
var type="";

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
  });
}


html5rocks.webdb.deleteTodo = function(id) {
  var db = html5rocks.webdb.db;
  db.transaction(function(tx){
    tx.executeSql("DELETE FROM todo WHERE ID=?", [id],
        html5rocks.webdb.onSuccess,
        html5rocks.webdb.onError);
    });
}

html5rocks.webdb.searchTodo = function(id) {
  var db = html5rocks.webdb.db;
  db.transaction(function(tx){
    tx.executeSql("SELECT * FROM todo WHERE Name=?", [id],
        function(tx, result){
        	$('#Search-Results').html((result.rows.item(0).ID)+" : " +
            (result.rows.item(0).Name)+ " , " +
            (result.rows.item(0).Address));
        },
        html5rocks.webdb.onError);
    });
}

function loadTodoItems(tx, rs) {
  var rowOutput = "";
  var _addressBook = document.getElementById("Address-Book");

  for (var i=0; i < rs.rows.length; i++) {
  	rowOutput += renderTodo(rs.rows.item(i));
  }

  _addressBook.innerHTML = rowOutput;
}


function renderTodo(row) {
  return "<li>" + row.ID + " : " +row.Name + " , " +row.Address + "</li>";
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
}

function deleteRecord(){
	_id = document.getElementById("Delete").value;
	html5rocks.webdb.deleteTodo(_id);
}

function searchRecord(){
	_id = (document.getElementById("Search").value);
	html5rocks.webdb.searchTodo(_id);
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



// function initTable(){

// 	var tags = ["id", "Name",
// 	"Address"
// 	];
	
// 	newTable = "<table width='100%' style=\" border: 1px solid black; \" ><tr>";
	
// 	for(var i=0; i<tags.length; i++)
// 		newTable += "<th align='center' bgcolor=\"#C0C0C0\" >" + tags[i] + "</th>";
// 	newTable += "</tr>";

// }

// //style=\" border: 1px solid black; \"

// function _insertData(){	
// 			newTable+="	<tr>";		
// 			newTable += "<td align='center'>" + "0" + "</td>";
// 			newTable += "<td align='center'>" + "_name" + "</td>";
// 			newTable += "<td align='center'>" + "_address"+ "</td>";
// 			newTable += "</tr>";		
// }


// function endTable(){
// 	newTable += "</table>";
// }

// function loadTable(){
// 	document.getElementById("Address-Book").innerHTML = newTable;
// }



// function getData(){

// 		_name = $("#Address").val();
// 		_address = $("#Name").val();
		
// 		// _insertData();
// 		// endTable();
// 		// loadTable();
		
// 	}

// function main(){
	
// 	// initTable();
// }











// function sortData(tagID, sortAsc){
// 	items.sort(function(a, b) {
//     var avalue = a[tagID],
//         bvalue = b[tagID];
    
//     switch (sortAsc)
//     {    
// 	    case 0 : 
// 	    {
// 	    	if (avalue < bvalue) {
// 	        return -1;
// 	    	}
// 		    if (avalue > bvalue) {
// 		        return 1;
// 		    }
// 		}break;

// 	    case 1 : 
// 	    {
// 	    	if (avalue > bvalue) {
// 	        return -1;
// 	    	}
// 		    if (avalue < bvalue) {
// 		        return 1;
// 		    }

// 		} break;

		
// 	}

//     return 0;
// });

//}



// if($("#Name").val()=="")
// 	{
// 		alert("incomplete form");
// 	}
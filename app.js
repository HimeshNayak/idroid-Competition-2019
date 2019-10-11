//Variables
var item = {username : "", pass : ""}; //Object Individual accounts
var accounts = []; //Array of accounts
var data; // String containing accounts data
var task = {username : "", name : "", onDate: "", time : ""};
var taskList = []; // Array of tasks
var dataTask; // String containing tasks data
var doneTasks = []; // Array of tasks DONE
var dataDone; // String containing tasks done data
var user;
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

//Functions
window.onload = function(){
	document.getElementById("loginMain").style.display = "block";
	document.getElementById("signupMain").style.display = "none";
	document.getElementById("toDoMain").style.display = "none";
	//initialising data variables
	data = localStorage.getItem("accounts");
	dataTask = localStorage.getItem("tasks");
	dataDone = localStorage.getItem("doneTasks");
	if (data != undefined){
		accounts = JSON.parse(data);
	}
	if (dataTask != undefined){
		taskList = JSON.parse(dataTask);
	}
	if (dataDone != undefined){
		doneTasks = JSON.parse(dataDone);
	}
	startTime();
	console.log(data);
	console.log(dataTask);
	console.log(dataDone);
}

function deleteAcc(){
	for (var i = 0; i < accounts.length; i++){
		if (user == accounts[i].username){
			accounts.splice(i, 1);
			localStorage.setItem("accounts", JSON.stringify(accounts));
			data = localStorage.getItem("accounts");
			location.reload();
		}
	}
}

function login(){ 
	if (data){
		console.log(data);
		accounts = JSON.parse(data);
		var username = document.getElementById("username").value;
		var pass = document.getElementById("pass").value;
		if(username == "" || pass == ""){
			alert("Empty Fields");
		}else{
			var d = 0;
			for (i = 0; i < accounts.length; i++){
				if((accounts[i].username == username) && (accounts[i].pass == pass)){
					document.getElementById("loginMain").style.display = "none";
					document.getElementById("signupMain").style.display = "none";
					document.getElementById("toDoMain").style.display = "block";
					user = username;
					d = 1;
					show();
				}
			}
			if (d == 0){
				alert("Wrong Password or Username");
			}
		}
	}else{
		alert("There are no accounts registered! Please Sign up.");
	}
}

function enterDetails(){
	document.getElementById("loginMain").style.display = "none";
	document.getElementById("signupMain").style.display = "block";
}

function signup(){
	var username = document.getElementById("usernameS").value;
	var pass = document.getElementById("passS").value;
	var passTemp = document.getElementById("passTemp").value;
	console.log(data);
	if (passTemp == pass){
		item.username = username;
		item.pass = pass;
		accounts.push(item);
		localStorage.setItem("accounts", JSON.stringify(accounts));
		data = localStorage.getItem("accounts");
		alert("Now you can Login!");
		location.reload();
	}else{
		alert("Passwords don't match!");
	}
}
document.getElementById('loginBtn').addEventListener('click', login);
document.getElementById('enterBtn').addEventListener('click', enterDetails);
document.getElementById('signupBtn').addEventListener('click', signup);
document.getElementById('addBtn').addEventListener('click', add);

function add(){
	task.username = user;
	task.name = document.getElementById("task").value;
	var t = document.getElementById("fromDateTime").value;
	task.onDate = t;
	if (!isNaN(Number(document.getElementById("timeLimit").value))){
		task.time = document.getElementById("timeLimit").value +" "+ document.getElementById("timeLimitUnit").value;
		console.log(data);
		console.log(dataTask);
		console.log(dataDone);
		if (task.name == "" || task.time == "" || task.onDate == ""){
			alert("Enter valid Event name and Duration");
		}else{
			taskList.push(task);
			localStorage.setItem("tasks", JSON.stringify(taskList));
			dataTask = localStorage.getItem("tasks");
			alert("Task Added");
			show();
		}
	}else{
		alert("Enter valid Duration");
	}
}

function clearAllTasks() {
    taskList = [];
	localStorage.setItem('tasks', JSON.stringify(taskList));
    dataTask = localStorage.getItem("tasks");
	doneTasks = [];
	localStorage.setItem('doneTasks', JSON.stringify(doneTasks));
    dataDone = localStorage.getItem("doneTasks");
	console.log(data);
	console.log(dataTask);
	console.log(dataDone);
	show(); 
    return false;
}

function trash(a) {
    taskList.splice(a, 1);
    localStorage.setItem('tasks', JSON.stringify(taskList));
    dataTask = localStorage.getItem("tasks");
	console.log(data);
	console.log(dataTask);
	console.log(dataDone);
	show(); 
    return false;
}

function done(a) {
    doneTasks.push(taskList[a]);
	taskList.splice(a, 1);
	localStorage.setItem('doneTasks', JSON.stringify(doneTasks));
	localStorage.setItem('tasks', JSON.stringify(taskList));
	dataTask = localStorage.getItem("tasks");
	dataDone = localStorage.getItem("doneTasks");
	console.log(data);
	console.log(dataTask);
	console.log(dataDone);
	show();
	return false;
}

function trashDone(a) {
    doneTasks.splice(a, 1);
    localStorage.setItem('doneTasks', JSON.stringify(doneTasks));
    dataDone = localStorage.getItem("doneTasks");
	console.log(data);
	console.log(dataTask);
	console.log(dataDone);
	show();
    return false;
}

function show(){
	if (dataTask != undefined){
		taskList = JSON.parse(dataTask);
	}
	if (dataDone != undefined){
		doneTasks = JSON.parse(dataDone);
	}
	console.log(data);
	console.log(dataTask);
	console.log(dataDone);
	var addedItems = '<ul>';
	for(var i = 0; i < taskList.length; i++){
		if(taskList[i].username == user){
			addedItems += '<li id = "notDone"><div id = "taskItem">' + taskList[i].name + '</div>\
				<div id = "time"> Scheduled at : ' + taskList[i].onDate + '<br>\
				For ' + taskList[i].time + '</div>\
				<br><image class="trash" onclick = "trash('+i+')" id="' + i + '" src = "trash.png"/> \
				<image class="done" onclick = "done('+i+')" id="' + i + '" src = "tick.png"/></li><br>';
		}
	}
	addedItems += '</ul>';
	document.getElementById("items").innerHTML = addedItems;
	if (dataDone != undefined){
		var doneItems = '<ul>';
		for(var i = 0; i < doneTasks.length; i++){
			if(doneTasks[i].username == user){
				doneItems += '<li id = "done"><div id = "taskItem">' + doneTasks[i].name + '</div>\
					<div id = "time"> Scheduled at : ' + doneTasks[i].onDate + '<br>\
					For ' + doneTasks[i].time + '</div>\
					<br><image class="trashDone" onclick = "trashDone('+i+')" id="' + i + '" src = "trash.png"></li><br>';
			}
		}
		doneItems += '</ul>';
		document.getElementById("taskDone").innerHTML = doneItems;
	}
}

function startTime() {
  var today = new Date();
  var dd = today.getDate();
  var mm = Number(today.getMonth());
  var yy = today.getFullYear();
  var h = today.getHours();
  var m = today.getMinutes();
  var s = today.getSeconds();
  m = checkTime(m);
  s = checkTime(s);
  document.getElementById('date').innerHTML = dd + ", " + months[mm] + " " + yy + "<br>" + 
  h + ":" + m + ":" + s;
  var t = setTimeout(startTime, 500);
}
function checkTime(i) {
  if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
  return i;
}
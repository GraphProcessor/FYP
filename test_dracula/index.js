var Dracula = require('graphdracula');
var Graph = Dracula.Graph;
var Renderer = Dracula.Renderer.Raphael;
var Layout = Dracula.Layout.Spring;
var graph = new Graph();


/*
{
	"0": {
		"0": ["0,1", "1,2"],
		"1": ["1,2", "2,3", "3,4"],
		"2": ["4,6", "4,5"]
	},

	"1": {
		"0": ["8,6", "1,2"],
		"1": ["1,8", "7,3", "3,5"],
		"2": ["2,6", "3,4"]
	}
}
*/

var mydata = require('./cis.json');

for(key1 in mydata){

	console.log("Entered key1: " +key1);
	//graph = new Graph();
	for(key2 in mydata[key1]){

		console.log("Entered key2: " +key2);
		console.log("len: " +mydata[key1][key2].length);
		for (var i = 0; i < mydata[key1][key2].length; i++) {

			console.log("Entered i-loop: "+i);

			var mydatasplit = mydata[key1][key2][i].split(',');
			graph.addEdge(mydatasplit[0].toString(), mydatasplit[1].toString());
			console.log(mydatasplit[0].toString(), mydatasplit[1].toString());
		}

	    var layout = new Layout(graph);
	 	var renderer = new Renderer('#paper', graph, 400, 300);
		renderer.draw()
		graph = new Graph();
	 	}

		
	var currentTime = new Date().getTime();
	while (currentTime + 2000 >= new Date().getTime()) {
	}
	


	// var layout = new Layout(graph);
	// var renderer = new Renderer('#paper', graph, 400, 300);
	// renderer.draw()
	// graph = new Graph();	
	
 // 	var layout = new Layout(graph);
 // 	var renderer = new Renderer('#paper', graph, 400, 300);	
 // 	renderer.draw()	
 //		graph = new Graph();
 	
}

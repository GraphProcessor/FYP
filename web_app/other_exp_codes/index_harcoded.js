var Dracula = require('graphdracula');
var Graph = Dracula.Graph;
var Renderer = Dracula.Renderer.Raphael;
var Layout = Dracula.Layout.Spring;

var graph = new Graph();


var mydata = {
	"0": ["0,1", "0,2", "1,2", "2,8", "8,9", "9,0","8,12","12,13", "13,14", "14,8","8,11", "11,12", "10,12"], 
	"1": ["1,5", "5,6", "1,6", "6,8", "8,7", "5,7", "1,7","13,14", "14,8", "14,6"], 
	"2": ["1,7", "7,8", "8,9", "9,10", "7,10", "7,11", "9,11","8,9", "9,10", "7,10"],
	"3": ["6,7", "6,8", "8,12","12,13", "13,14", "14,8", "14,6", "13,7"],
	"4": ["8,10", "4,8", "4,5", "5,10", "8,11", "11,12", "10,12"]
};


for(key in mydata){

	
	for (var i = 0; i < mydata[key].length; i++) {
	
		var mydatasplit = mydata[key][i].split(',');

		graph.addEdge(mydatasplit[0].toString(), mydatasplit[1].toString());
	}
	
	var layout = new Layout(graph);
	
 	var renderer = new Renderer('#paper', graph, 400, 300);
 	
 	renderer.draw()
 	
 	graph = new Graph();
 	

}


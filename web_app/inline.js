var Dracula = require('graphdracula');
var Graph = Dracula.Graph;
var Renderer = Dracula.Renderer.Raphael;
var Layout = Dracula.Layout.Spring;

var graph = new Graph();

// graph.addEdge('1', '2');
// graph.addEdge('2', '3');
// graph.addEdge('3', '4');
// graph.addEdge('4', '5');
// graph.addEdge('2', '5');
// graph.addEdge('4', '3');
// graph.addEdge('4', '1');
var mydata = {"0": "0,1", "1":"1,5"};
console.log(mydata[0]);
console.log(mydata[1]);

var mydatasplit = mydata[0].split(',');
console.log(mydatasplit[0]);
console.log(mydatasplit[1]);
graph.addEdge(mydatasplit[0].toString(), mydatasplit[1].toString());

var layout = new Layout(graph)
var renderer = new Renderer('#paper', graph, 400, 300);
renderer.draw();

//var mydata = JSON.parse(data);



//graph.addEdge(mydatasplit[0].toString(), mydatasplit[1]);

//console.log(mydata[1].name);


// readTextFile("file:///Users/nikitabatra/Desktop/FYP/test_dracula/test.txt");


// function readTextFile(file)
// {
//     var rawFile = new XMLHttpRequest();
//     rawFile.open("GET", file, false);
//     rawFile.onreadystatechange = function ()
//     {
//         if(rawFile.readyState === 4)
//         {
//             if(rawFile.status === 200 || rawFile.status == 0)
//             {
//                 var allText = rawFile.responseText;
//                 alert(allText);
//                 document.querySelector('.results').innerHTML = ""
//             }
//         }
//     }
//     // rawFile.send(null);
// }


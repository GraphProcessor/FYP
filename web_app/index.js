var Dracula = require('graphdracula');
var Graph = Dracula.Graph;
var Renderer = Dracula.Renderer.Raphael;
var Layout = Dracula.Layout.Spring;

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

//var iter_res_dict = require('./toy_graph.json');
var $ = require("jquery");
var time_out_num = 0;
var iter_res_dict;


// $.ajax({
//     url: "toy_graph.json",
//     success: function(response) {
//         iter_res_dict = response;
//     }
// });


// call server.py
$.ajax({
    //type: "POST",
    url: "server.py",
    //dataType: 'json',
    success: function (response) {
        console.log(response);
       console.log("Done1");
    }
});
console.log("Finished Done1");

// run a_cis.py
$.ajax({
    //type: "POST",
    url: "a_cis.py",
    //dataType: 'json',
    success: function (response) {
        console.log(response);
        console.log("Done2");
        //iter_res_dict = JSON.parse(response);
    }
});
console.log("Finished Done2");


$(document).ready(function () {
    console.log("dom ready");
    $.each(iter_res_dict, function (iteration_id, community_dict) {
        console.log('what is iter:' + iteration_id);

        setTimeout(function () {
            console.log("iter id:" + iteration_id);
            console.log("community_list:" + JSON.stringify(community_dict));

            $("#global").empty();
            $("#global").append("<div id='iter" + iteration_id + "'></div>");

            $.each(community_dict, function (comm_id, edge_list) {
                var graph = new Graph();

                $.each(edge_list, function (idx) {
                    var edge = edge_list[idx].split(',');
                    console.log('edge:' + JSON.stringify(edge));
                    graph.addEdge(edge[0], edge[1]);
                });

                var layouter = new Layout(graph);
                layouter.layout();

                var renderer = new Renderer("#iter" + iteration_id, graph, 700, 600);
                renderer.draw();
            });
        }, 3000 * time_out_num);
        time_out_num += 1
    });
});



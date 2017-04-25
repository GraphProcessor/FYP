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

var $ = require("jquery");

// var iter_res_dict = require('./toy_graph.json');
var time_out_num = 0;

$(document).ready(function () {
    console.log("dom ready");
    $.getJSON("/cis_collab/comm_result", function (iter_res_dict) {
        $.each(iter_res_dict, function (iteration_id, community_dict) {
            console.log('what is iter:' + iteration_id);

            setTimeout(function () {
                console.log("iter id:" + iteration_id);
                console.log("community_list:" + JSON.stringify(community_dict));

                $('#iterationID').html("Iteration ID: " + iteration_id);
                var global_div = $("#vis");
                global_div.empty();
                global_div.append("<div id='iter" + iteration_id + "'></div>");

                $.each(community_dict, function (comm_id, edge_list) {
                    var graph = new Graph();

                    $.each(edge_list, function (idx) {
                        var edge = edge_list[idx].split(',');
                        console.log('edge:' + JSON.stringify(edge));
                        graph.addEdge(edge[0], edge[1]);
                    });

                    var layouter = new Layout(graph);
                    layouter.layout();

                    var renderer = new Renderer("#iter" + iteration_id, graph, 500, 400);
                    renderer.draw();
                });
            }, 1000 * time_out_num);
            time_out_num += 1
        });
    });
});



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
var time_out_num = 0;
var vis_time = 2000;
var global_iter_begin = 0;
var global_arr;
var iter_res_dict;
var id;
var check = false;

function recurVis() {
    console.log('global_iter_id:' + global_iter_begin);
    if (global_iter_begin < global_arr.length) {
        var iteration_id = global_iter_begin;
        var community_dict = global_arr[iteration_id];

        id = setTimeout(function () {
            $('#iterationID').html("Iteration ID: " + iteration_id);
            var global_div = $("#vis");
            global_div.empty();
            global_div.append("<div id='iter" + iteration_id + "' class='col-md-3'></div>");

            $.each(community_dict, function (comm_id, edge_list) {
                var graph = new Graph();
                $.each(edge_list, function (idx) {
                    var edge = edge_list[idx].split(',');
                    graph.addEdge(edge[0], edge[1]);
                });

                var layouter = new Layout(graph);
                layouter.layout();

                var renderer = new Renderer("#iter" + iteration_id, graph, 400, 300);
                renderer.draw();
            });

            global_iter_begin += 1;
            recurVis();
        }, vis_time);
    }
}

$(document).ready(function () {
    console.log("dom ready");

    $.getJSON("/demon_collab/comm_result", function (json) {
        iter_res_dict = json;
        global_arr = $.map(iter_res_dict, function (community_dict, iteration_id) {
            return [community_dict];
        });
        // console.log(JSON.stringify(global_arr));
        recurVis();
    });

    $("#btn_speed_normal_demon_collab").click(function () {
        console.log("Clicked button normal, vis time:" + vis_time);
        vis_time = 2000;
    });

    $("#btn_speed_fast_demon_collab").click(function () {
        vis_time = vis_time / 2;
        console.log("Clicked button fast, vis time:" + vis_time);
    });

    $("#btn_speed_slow_demon_collab").click(function () {
        vis_time = vis_time * 2;
        console.log("Clicked button slow, vis time:" + vis_time);
    });

    $("#btn_pause_demon_collab").click(function () {
        if ($(this).html() === "Resume Visualization") {
            $(this).html('Pause Visualization');
            recurVis();
        }
        else {
            $(this).html('Resume Visualization');
            console.log("Clicked button pause, vis time:" + vis_time);
            clearTimeout(id);
        }
    });

});



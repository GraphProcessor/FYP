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
var global_iter_begin = -1;
var iter_res_dict;
var work_arr = [];

function displayFrom() {
    // console.log(JSON.stringify(iter_res_dict));
    $.each(work_arr, function (work) {
        console.log('work:' + work);
        clearTimeout(work);
    });
    work_arr = [];

    time_out_num = 0;
    $.each(iter_res_dict, function (iteration_id, community_dict) {
        if (iteration_id > global_iter_begin) {
            console.log('global_iter_beg:' + global_iter_begin);
            work_arr.push(
                setTimeout(function () {
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
                    global_iter_begin = iteration_id;
                }, vis_time * time_out_num)); //all events have been pushed to a Q, so time is fixed now
            time_out_num += 1 //need to cancel all Q events, and push all again
        }
    });
}

$(document).ready(function () {
    console.log("dom ready");

    $.getJSON("/cis_karate/comm_result", function (json) {
        iter_res_dict = json;
        displayFrom();
    });


    $("#btn_speed_fast_cis_karate").click(function () {
        console.log("Clicked button fast");
        vis_time = vis_time / 2;
        displayFrom();
    });
});



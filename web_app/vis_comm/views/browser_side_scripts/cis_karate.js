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
//$('#btn_cis_karate').on('click', '/cis_karate');
var time_out_num = 0;
var visTime = 2000;
var global_iter_begin = -1;
var iter_res_dict;

// var filterDict = $.grep(Object.keys(iter_res_dict), function (iteration_id, community_dict) {
//     console.log(community_dict);
//     var checkstat = iteration_id > global_iter_begin;
//     console.log("CHECK TRUE OR FALSE: " + checkstat);
//     return iteration_id > global_iter_begin;
// });

function displayFrom() {

    console.log(JSON.stringify(iter_res_dict));

    time_out_num = 0;
    $.each(iter_res_dict, function (iteration_id, community_dict) {
        // console.log('what is iter:' + iteration_id);

        if(iteration_id > global_iter_begin) {

            setTimeout(function () {
                // console.log("iter id:" + iteration_id);
                // console.log("community_list:" + JSON.stringify(community_dict));

                $('#iterationID').html("Iteration ID: " + iteration_id);
                var global_div = $("#vis");
                global_div.empty();
                global_div.append("<div id='iter" + iteration_id + "' class='col-md-3'></div>");

                $.each(community_dict, function (comm_id, edge_list) {

                    var graph = new Graph();

                    $.each(edge_list, function (idx) {
                        var edge = edge_list[idx].split(',');
                        // console.log('edge:' + JSON.stringify(edge));

                        graph.addEdge(edge[0], edge[1]);
                    });

                    var layouter = new Layout(graph);
                    layouter.layout();

                    var renderer = new Renderer("#iter" + iteration_id, graph, 400, 300);
                    renderer.draw();

                    global_iter_begin = iteration_id;
                });

            }, visTime * time_out_num); //all events have been pushed to a Q, so time is fixed now
            time_out_num += 1 //need to cancel all Q events, and push all again
        }


    });

}

$(document).ready(function () {
    console.log("dom ready");

    $.getJSON("/cis_karate/comm_result", function(json){
        iter_res_dict = json;
        // console.log(JSON.stringify(iter_res_dict));
    });

    displayFrom();

    $("#btn_speed_fast_cis_karate").click( function(){
        console.log("Clicked button fast");
        clearTimeout();
        visTime = visTime/2;
        displayFrom();
    });


});



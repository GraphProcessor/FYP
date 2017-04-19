import networkx as nx
import re
import json
import more_itertools
import sys
import os


def get_graph_info(file_path):
    def extract_first_two(collection):
        return [int(collection[0]), int(collection[1])]

    with open(file_path) as ifs:
        lines = map(lambda ele: ele.strip(), ifs.readlines())
        lines = filter(lambda ele: not ele.startswith('#') and re.match('.*[0-9]+.*[0-9]+', ele), lines)

        pair_list = map(lambda ele: extract_first_two(map(lambda ele2: ele2.strip(), ele.split())), lines)
        return nx.Graph(pair_list)


def get_community_result(file_path):
    def get_val(name, search_lines, delimiter=':'):
        return filter(lambda ele: ele.startswith(name), search_lines)[0].split(delimiter)[1]

    def get_name_dict(idx_result, name_result):
        flat_idx_res = more_itertools.flatten(idx_result)
        flat_name_res = more_itertools.flatten(name_result)
        return dict(zip(flat_idx_res, flat_name_res))

    with open(file_path) as ifs:
        lines = ifs.readlines()
        comm_size = int(get_val('comm size', lines))
        name_res = eval(get_val('name result', lines))
        idx_res = eval(get_val('idx result', lines))
        name_dict = get_name_dict(idx_res, name_res)
        whole_time_str = get_val('whole execution time', lines)
        comm_list = map(sorted, name_res)
        comm_list.sort(key=lambda comm: -len(comm))

        iter_num = int(get_val('Iterations', lines))
        iter_arr = [None for _ in range(iter_num)]
        for i in xrange(1, iter_num + 1):
            iter_arr[i - 1] = [map(lambda idx: name_dict[idx], comm) for comm in eval(get_val('i' + str(i), lines))]
        algorithm_name = get_val('Algorithm', lines)
        return comm_size, comm_list, whole_time_str, iter_num, iter_arr, algorithm_name


def print_adjacency_list(iter_num, itera, graph, algorithm):
    iter_dict = {}
    for i in xrange(iter_num):
        tmp_comm_list = [map(lambda edge: ','.join(map(str, edge)), graph.subgraph(comm).edges()) for comm in itera[i]]
        iter_dict[i] = dict(zip(range(len(tmp_comm_list)), tmp_comm_list))
    # return {'Communities': iter_dict, 'Algorithm': algorithm}
    return iter_dict


if __name__ == '__main__':
    print len(sys.argv)
    input_graph_file_path = sys.argv[1] if len(sys.argv) == 3 else 'small_datasets/karate_edges_input.csv'
    result_file_path = sys.argv[2] if len(sys.argv) == 3 else 'build/a_cis.txt'

    result_json_file = os.path.basename(result_file_path).replace('txt', 'json')

    graph = get_graph_info(input_graph_file_path)
    comm_num, comm_list, run_time, iter_num, iter_arr, algo_name = get_community_result(result_file_path)
    avg_comm_size = sum(map(lambda ele: len(ele), comm_list)) / comm_num

    os.system('mkdir -p json_files')
    edge_lists = print_adjacency_list(iter_num, iter_arr, graph, algo_name)
    with open('json_files' + os.sep + result_json_file, 'w') as f:
        json.dump(edge_lists, f, separators=(',', ':'))

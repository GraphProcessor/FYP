import networkx as nx
import re
import json


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

    with open(file_path) as ifs:
        lines = ifs.readlines()
        comm_size = int(get_val('comm size', lines))
        name_res_str = get_val('name result', lines)
        whole_time_str = get_val('whole execution time', lines)
        comm_list = eval(name_res_str)
        iterations = get_val('Iterations', lines)
        itera = [None] * int(iterations)
        for i in range(int(iterations), 0, -1):
            # print str(i)
            itera[i - 1] = get_val('i' + str(i), lines)
            # print itera[i-1]
        for comm in comm_list:
            comm.sort()
        comm_list.sort(key=lambda comm: -len(comm))
        algorithms = get_val('Algorithm', lines)
        return comm_size, comm_list, whole_time_str, iterations, itera, algorithms


def print_comm(comm_list):
    for comm in comm_list:
        print comm


def adjacency_list_print(graph, comm):
    z = []
    for n, nbrs in graph.adjacency_iter():
        if n in comm:
            for x, nbr in nbrs.items():
                if x > n and x in comm:
                    l = str(n) + ',' + str(x)
                    z.append(l)
    return z


def print_adjacency_list(iterations, itera, graph, algorithm):
    x = {}
    q = {}
    # print '{'
    for i in range(0, int(iterations)):
        # print '"',i,'":'
        y = {}
        comm_list = eval(itera[i])
        j = 0
        for comm in comm_list:  # indent 1
            # print '"',j,'":'
            # print '['
            z = adjacency_list_print(graph, comm)
            # print '],'
            y[j] = z
            j += 1
        x[i] = y
    q['Communities'] = x
    q['Algorithm'] = algorithm
    return q
    # print '}'


if __name__ == '__main__':
    graph = get_graph_info('small_datasets/collaboration_edges_input.csv')
    # print 'num nodes:', graph.number_of_nodes(), 'num edges:', graph.number_of_edges()
    comm_num, comm_list, run_time, iterations, itera, algorithm = get_community_result('../web_app/a_demon.txt')
    avg_comm_size = sum(map(lambda ele: len(ele), comm_list)) / comm_num
    # print 'comm num:', comm_num, 'avg comm size:', avg_comm_size, 'whole algorithm cis execution time:', run_time
    # print cal_modularity(graph, comm_list)
    with open('../web_app/result.json', 'w') as f:
        json.dump(print_adjacency_list(iterations, itera, graph, algorithm), f, separators=(',', ':'))
        # print_comm(comm_list)

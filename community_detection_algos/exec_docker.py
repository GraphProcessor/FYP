import os
import subprocess

if __name__ == '__main__':
    docker_container_id = subprocess.check_output("docker ps -lq", shell=True)
    docker_container_id = docker_container_id.strip()
    docker_command = 'docker exec ' + docker_container_id

    # change this part to accept parameters
    executable_path = '/opt/build/algorithm_demo/demo_cis'
    input_graph_file_path = '/opt/small_datasets/karate_edges_input.csv'

    os.system('mkdir -p output_files')
    result_file_path = 'output_files' + os.sep + os.path.basename(input_graph_file_path).split('_')[0] + '_' + \
                       os.path.basename(executable_path).split('_')[-1] + '.txt'
    computation_exec = ' '.join([executable_path, input_graph_file_path, '>', result_file_path])

    post_processing_python_exec = ' '.join(
        ['python', 'post_processing_files.py', input_graph_file_path.replace('/opt/', ''), result_file_path])

    os.system(docker_command + ' ' + computation_exec)
    os.system(post_processing_python_exec)

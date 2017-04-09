import os
import subprocess

#x = os.system("docker ps -lq")
x = subprocess.check_output("docker ps -lq", shell=True)
x = x.replace('\n','')
os.system("docker exec "+x+" /opt/build/algorithm_demo/demo_demon /opt/small_datasets/collaboration_edges_input.csv > a_demon.txt;cd ../community_detection_algos;python post_processing_files_a_demon.py;cd ../web_app;rm a_demon.txt;docker kill "+x+";")

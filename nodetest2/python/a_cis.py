import os
import subprocess

#x = os.system("docker ps -lq")
x = subprocess.check_output("docker ps -lq", shell=True)
x = x.replace('\n','')
os.system("docker exec "+x+" /opt/build/algorithm_demo/demo_cis /opt/small_datasets/collaboration_edges_input.csv > a_cis.txt;cd ../community_detection_algos;python post_processing_files_a_cis.py;cd ../web_app;rm a_cis.txt;docker kill "+x+";")

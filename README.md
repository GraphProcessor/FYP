# FYP

## Status

- add license and readme files, add [.gitignore](.gitignore).
- rename two directories as [web_app](web_app) and [community_detection_algos](community_detection_algos)
- rename post processing script as [post_processing_files.py](community_detection_algos/post_processing_files.py), 
and format that script with pycharm
- update [run_docker.py](community_detection_algos/docker/run_docker.py), remove `sudo`


## Docker Usage

- to run docker without `sudo` privilege

```zsh
sudo usermod -aG docker $USER
```

- create a new docker container, see [run_docker.py](community_detection_algos/docker/run_docker.py), with mounting, 
`yche/yche-dev-env` is in [a docker hub repo](https://hub.docker.com/r/yche/yche-dev-env/). `-it` stands for interative mode, 
`zsh` is the command to be executed when i goes into the interactive environment.

```python
import os

if __name__ == '__main__':
    mount_dir_path = os.path.abspath(os.pardir)
    os.system('docker run  -v ' + mount_dir_path + ':/opt -it yche/yche-dev-env /bin/bash -c "cd /opt/; '
                                                   'mkdir -p build; cd build; cmake ../src; make; zsh"')
```

- list all docker containers

```zsh
docker ps
```

- kill a docker container, where `container-id` is from `docker ps`

```zsh
docker kill container-id
```

- finally, use docker container(be sure that your container is running via `docker ps`), and the output is redirected to your local terminal environment

```zsh
docker exec 78e30f86c2d5 /opt/build/algorithm_demo/demo_cis /opt/small_datasets/karate_edges_input.csv
```

## Git Usage

- basic commands

```zsh
git pull origin branch-name
git add dir_path
git commit -m "xxx"
git push origin branch-name
```

- may need to resolve conflicts

check commands

```zsh
git status
```

after fixing conflicts

```zsh
git add .
```

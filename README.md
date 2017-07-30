# Vis Comm Design

## Usage

in first terminal tab, start docker container

```zsh
./run_docker_in_terminal0.sh
```

in second terminal tab, start web application server

```zsh
./start_server_in_terminal1.sh
```

## Implementation

content | tech
--- | ---
[web app](web_app) | express framework, browserify to generate js files
[community_detection_algos](community_detection_algos) | cmake build, docker container

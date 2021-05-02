# e2e-tester

## description
It is a tool for comparing old and new,   
and detects and displays the difference between API or HTML.

## usage
create a configuration file under `./config/default.yaml`.  
please check the sample below for each setting

```shell
target:
  actual:
    host: 'https://example_new'
  expect:
    host: 'https://example_old'
option:
  header: 
    Cookie: 'xxx=xxx;'
    User-Agent: 'Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0'
  method: 'GET or POST'
  body: '{ sample: xxx }'
  query: 'query=xxx'
  type: 'HTML or API'
report:
  dir: './report'
```

### mac 

run `npm i  && npm run start` after creating the config file.  
in the sample, report is created under the `./report` directory.

### docker 

create an image if you want to start with docker.
```shell
docker build -t ${image_name} ./
```

execute the command by specifying the directory where the config file is located and the directory where the result is output.

```shell
docker run  \
  -v $(pwd)/${config_path}:/app/config \
  -v $(pwd)/${report_path}:/app/report \
  -it ${image_name}
```
# e2e-tester

## description
It is a tool for comparing old and new,   
and detects and displays the difference between API or HTML.

## usage
create a configuration yaml file.  
please check the sample below for each setting

### API
```shell
target:
  actual:
    host: 'https://example.new'
  expect:
    host: 'https://example.old'
option:
  header: 
    Cookie: 'xxx=xxx;'
    User-Agent: 'Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0'
  method: 'GET or POST'
  body: '{ sample: xxx }'
  query: 'query=xxx'
report:
  dir: './report'
```

### HTML
```shell
target:
  actual:
    host: 'https://example.new'
  expect:
    host: 'https://example.old'
option:
  header: 
    Cookie: 'xxx=xxx;'
    User-Agent: 'Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0'
  waitSec: 1 
  fullScreen: false 
report:
  dir: './report'
```

### local 

run `npm i  && npm run start --  -t ${API or HTML} -c ${config path}` after creating the config file.  
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

## example
testing for api
```shell
target:
  actual:
    host: 'https://example.new.front'
  expect:
    host: 'https://example.old.front'
option:
  header: 
    Cookie: 'xxx=xxx;'
    User-Agent: 'Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0'
  query: 'query=xxx'
  type: 'HTML'
report:
  dir: './report'
```

testing for frontend 
```shell
target:
  actual:
    host: 'https://example.new.api'
  expect:
    host: 'https://example.old.api'
option:
  header: 
    Cookie: 'xxx=xxx;'
    User-Agent: 'Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0'
  waitSec: 1 
  fullScreen: false 
report:
  dir: './report'
```

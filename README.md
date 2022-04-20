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
```

### local 

run `npm i  && npm run start --  -t ${API or HTML} -c ${config path} -o ${dist dir}` after creating the config file.

### docker 

create an image if you want to start with Docker.
```shell
docker build -t ${image_name} ./
```

execute the command by specifying the directory where the config file is located and the directory where the result is output.


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
```

### demo
start demo server
```shell
cd demo && npm run start
```

html test
```shell
npm run start --  -t HTML -c ./demo/config/html.sample.yaml -o report
```

api test
```shell
npm run start --  -t API -c ./demo/config/api.sample.yaml -o report
```

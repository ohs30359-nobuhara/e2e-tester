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

run `npm run start` after creating the config file.  
in the sample, report is created under the `./report` directory.
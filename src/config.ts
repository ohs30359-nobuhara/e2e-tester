export namespace Config {
  export interface Target {
    actual: {
      host: string
    }
    expect: {
      host: string
    }
  }
  export interface Option {
    header: {[key: string]: string}
    method: 'GET' | 'POST'
    body?: string
    query?: string
    type: 'HTML' | 'API'
  }

  export interface Report {
    dir: string
  }
}


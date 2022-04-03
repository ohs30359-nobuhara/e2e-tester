export interface CliInterface {
  target: Target
  option: ApiOption | HtmlOption
  report: Report
}

export interface Target {
  actual: {
    host: string
  }
  expect: {
    host: string
  }
}

export interface ApiOption {
  header: {[key: string]: string}
  method: 'GET' | 'POST'
  query?: string
  body?: string
}

export interface HtmlOption {
  header: {[key: string]: string}
  query?: string
  waitSec?: number
  fullScreen: boolean
}

export interface Report {
  dir: string
}

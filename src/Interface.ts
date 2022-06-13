export interface CliInterface {
  target: Target
  option: ApiOption | HtmlOption
}

export interface Target {
  actual: HostOption
  expect: HostOption
}

export interface HostOption {
  host: string
  hostsPath: string | null
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

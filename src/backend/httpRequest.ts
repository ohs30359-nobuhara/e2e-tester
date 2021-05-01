import axios, {AxiosRequestConfig, AxiosResponse} from "axios";
import {parse} from 'querystring'

export interface HttpRequestOption {
  headers?: any
  params?: string
  data?: string
  method: 'GET' | 'POST'
}

export async function httpRequest(host: string, option: HttpRequestOption): Promise<any> {
  const request: AxiosRequestConfig = {
    url: host,
    method: option.method
  }

  if (option.headers !== undefined) {
    request.headers = option.headers;
  }

  if (option.data) {
    request.data = JSON.parse(option.data);
  }

  if (option.params !== undefined) {
    request.params = parse(option.params)
  }

  const response: AxiosResponse = await axios(request);

  if (!(response.status+'').match(/(2[0-9][0-9])/)) {
    throw Error();
  }

  return response.data;
}
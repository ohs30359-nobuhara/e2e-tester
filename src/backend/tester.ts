import {Config} from "../config";
import {get} from "config";
import {httpRequest} from "./httpRequest";
import {createPatch, diffTrimmedLines} from "diff";
import {appendFileSync} from 'fs'

export async function backendTest(): Promise<void> {
  const targetConfig: Config.Target = get("target")
  const optionConfig: Config.Option = get("option");
  const reportOption: Config.Report = get("report");

  let result: any = null;

  result = await httpRequest(targetConfig.actual.host, {
    headers: optionConfig.header,
    params: optionConfig.query,
    data: optionConfig.body,
    method: optionConfig.method
  })

  const actual: string = JSON.stringify(result, null, 2)

  result = await httpRequest(targetConfig.expect.host, {
    headers: optionConfig.header,
    params: optionConfig.query,
    data: optionConfig.body,
    method: optionConfig.method
  })

  const expect: string = JSON.stringify(result, null, 2)

  // TODO: slack push
  console.log('diff?', diffTrimmedLines(actual, expect).length === 1);

  appendFileSync(`${reportOption.dir}/patch.txt`, createPatch('patch result', actual, expect, 'actual', 'except'));
}
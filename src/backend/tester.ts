import {httpRequest} from "./httpRequest";
import {createPatch, diffTrimmedLines} from "diff";
import {appendFileSync} from 'fs'
import {ApiOption, CliInterface} from "../Interface";

export async function backendTest(args: CliInterface, out: string): Promise<void> {
  const option: ApiOption = args.option as ApiOption;
  let result: any = null;

  result = await httpRequest(args.target.actual.host, {
    headers: option.header,
    params: option.query,
    data: option.body,
    method: option.method
  })

  const actual: string = JSON.stringify(result, null, 2)

  result = await httpRequest(args.target.expect.host, {
    headers: option.header,
    params: option.query,
    data: option.body,
    method: option.method
  })

  const expect: string = JSON.stringify(result, null, 2)

  // TODO: slack push
  console.log('diff?', diffTrimmedLines(actual, expect).length === 1);

  appendFileSync(`${out}/patch.txt`, createPatch('patch result', actual, expect, 'actual', 'except'));
}

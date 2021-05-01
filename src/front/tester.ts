import {HeadlessBrowser} from "./headlessBrowser";
import {HeadlessPage} from "./headlessPage";
import lookSame, {createDiff} from "looks-same";
import {Config} from "../config";
import {get} from "config";

export async function frontTest(): Promise<void> {
  const targetConfig: Config.Target = get("target")
  const optionConfig: Config.Option = get("option");
  const reportOption: Config.Report = get("report");

  const b: HeadlessBrowser = await HeadlessBrowser.init(optionConfig.header.Cookie || '')
  const p: HeadlessPage = await b.newPage(targetConfig.expect.host);
  await p.screenshot('actual');

  await p.move(targetConfig.actual.host);
  await p.screenshot('expect');

  const equal: boolean = await new Promise((resolve, reject) => {
    lookSame('dist/actual.png', 'dist/expect.png', (e, result) => {
      e? reject(e.message) : resolve(result.equal || false);
    })
  })

  // TODO: slack push
  console.info("equal?", equal)

  await new Promise((resolve, reject) => {
    createDiff({
      reference: 'dist/actual.png',
      current: 'dist/expect.png',
      diff: `${reportOption.dir}/diff.png`,
      highlightColor: '#ff00ff'
    }, (e) => {
      e? reject(e.message) : resolve(true);
    })
  })
}
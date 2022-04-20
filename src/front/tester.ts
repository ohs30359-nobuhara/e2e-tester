import {HeadlessBrowser} from "./headlessBrowser";
import {HeadlessPage} from "./headlessPage";
import lookSame, {createDiff} from "looks-same";
import {CliInterface} from "../Interface";

export async function frontTest(args: CliInterface, out: string): Promise<void> {
  const b: HeadlessBrowser = await HeadlessBrowser.init(args.option.header.Cookie || '')
  const p: HeadlessPage = await b.newPage(args.target.expect.host);
  await p.screenshot('actual');

  await p.move(args.target.actual.host);
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
      diff: `${out}/patch.png`,
      highlightColor: '#ff00ff'
    }, (e) => {
      e? reject(e.message) : resolve(true);
    })
  })
}

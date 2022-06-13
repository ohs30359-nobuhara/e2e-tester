import {HeadlessBrowser} from "./headlessBrowser";
import {HeadlessPage} from "./headlessPage";
import lookSame, {createDiff} from "looks-same";
import {CliInterface, HostOption} from "../Interface";

export async function frontTest(args: CliInterface, out: string): Promise<void> {
  const osHostsPath: string = process.env.BASE_HOSTS || '/etc/hosts';
  const b: HeadlessBrowser = await HeadlessBrowser.init(args.option.header.Cookie || '', osHostsPath)

  const expextOption: HostOption = args.target.expect;
  const actualOption: HostOption = args.target.actual;

  if (expextOption.hostsPath) {
    b.setHosts(expextOption.hostsPath);
  }

  const p: HeadlessPage = await b.newPage(expextOption.host);
  await p.screenshot('actual');

  if (actualOption.hostsPath) {
    b.setHosts(actualOption.hostsPath);
  }

  await p.move(actualOption.host);
  await p.screenshot('expect');

  // 変更されたhostsを元に戻す
  if (expextOption.hostsPath || actualOption.hostsPath) {
    b.refreshHosts();
  }

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

import { launch, Browser } from 'puppeteer';
import {HeadlessPage} from "./headlessPage";
import {Hosts} from "./hosts";

export class HeadlessBrowser {
  private readonly browser: Browser
  private readonly headers: any
  private readonly hosts: Hosts

  constructor(b: Browser, headers: any = {}, hosts: string) {
    this.browser = b;
    this.headers = headers
    this.hosts = new Hosts(hosts);
  }

  /**
   * hostsを指定する
   * @param client
   */
  public setHosts(client: string): boolean {
    try {
      this.hosts.change(client);
      return true;
    } catch (e) {
      return false;
    }
  }

  /**
   * 変更されたhostsを元に戻す
   */
  public refreshHosts(): boolean {
    try {
      this.hosts.refresh();
      return true;
    } catch (e) {
      return false;
    }
  }

  public async newPage(url: string):Promise<HeadlessPage> {
    return HeadlessPage.open(await this.browser.newPage(), url, this.headers);
  }

  public static async init(cookie: string, hosts: string): Promise<HeadlessBrowser> {
    const op: any = {}

    // linux時は専用の設定が必要
    if (process.env.RUN_MODE === 'DOCKER') {
      op.headless = true;
      op.executablePath = '/usr/bin/chromium-browser';
      op.args = ["--no-sandbox", "--disable-gpu"]
    }

    const b: Browser = await launch(op);
    return new HeadlessBrowser(b, cookie, hosts);
  }
}

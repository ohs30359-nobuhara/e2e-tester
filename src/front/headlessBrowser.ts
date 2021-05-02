import { launch, Browser } from 'puppeteer';
import {HeadlessPage} from "./headlessPage";

export class HeadlessBrowser {
  private readonly browser: Browser
  private readonly headers: any

  constructor(b: Browser, headers: any = {}) {
    this.browser = b;
    this.headers = headers
  }

  public async newPage(url: string):Promise<HeadlessPage> {
    return HeadlessPage.open(await this.browser.newPage(), url, this.headers);
  }

  public static async init(cookie: string): Promise<HeadlessBrowser> {
    const op: any = {}

    // linux時は専用の設定が必要
    if (process.env.RUN_MODE === 'DOCKER') {
      op.headless = true;
      op.executablePath = '/usr/bin/chromium-browser';
      op.args = ["--no-sandbox", "--disable-gpu"]
    }

    const b: Browser = await launch(op);
    return new HeadlessBrowser(b, cookie);
  }
}
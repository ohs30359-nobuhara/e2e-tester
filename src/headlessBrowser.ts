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
    const b: Browser = await launch();
    return new HeadlessBrowser(b, cookie);
  }
}
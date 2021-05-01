import {Page} from "puppeteer";

export class HeadlessPage {
  private readonly page: Page

  constructor(p: Page) {
    this.page = p;
  }

  public async move(url: string): Promise<void> {
    console.info('open page', url);
    await this.page.setViewport({
      width: 1200,
      height: 1600
    })
    await this.page.goto(url, {
      waitUntil: "domcontentloaded"
    })
  }

  public async screenshot(name: string): Promise<void> {
    console.info('screenshots start ... ');
    await this.page.screenshot({path: `./dist/${name}.png`})
    console.info('screenshots end');
  }

  public static async open(p: Page, url: string, header: any): Promise<HeadlessPage> {
    await p.setViewport({
      width: 1200,
      height: 1600
    })

    await p.setExtraHTTPHeaders(header)

    const page: HeadlessPage = new HeadlessPage(p);
    await page.move(url);
    return page;
  }
}
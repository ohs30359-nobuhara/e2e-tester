import {Page} from "puppeteer";

export class HeadlessPage {
  private readonly page: Page

  constructor(p: Page) {
    this.page = p;
  }

  /**
   * 指定ページへ遷移する
   * @param url
   */
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

  /**
   * SSを取得し dist配下に配置
   * @param name
   * @param waitSec SS取得前の待機時間 (秒)
   * @param fullScreen フルスクリーンで取得するか
   */
  public async screenshot(name: string, waitSec: number = 1, fullScreen: boolean = false): Promise<void> {
    console.info('screenshots start ... ');
    await this.page.waitForTimeout(1000 * waitSec)
    await this.page.screenshot({path: `./dist/${name}.png`, fullPage: fullScreen})
    console.info('screenshots end');
  }

  /**
   * ページを開く
   * @param p
   * @param url
   * @param header
   */
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

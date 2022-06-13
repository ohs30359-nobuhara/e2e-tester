import { readFileSync, writeFileSync } from 'fs';

export class Hosts {
  private original: Buffer
  /**
   * @constructor
   * @param path {string} os側のhostsファイルの絶対パス
   */
  public constructor(private path: string) {
    this.original = readFileSync(path);
  }

  /**
   * 指定したhostsを適用する
   * @param path 適用するhostsの絶対パス
   */
  public change(path: string): void {
    const buf: Buffer = readFileSync(path);

    // base hostsにクライアントのhostsを追記 (Dockerとかだと 元のhostsを保持しないといけないため上書きできない)
    const append: string = this.original.toString() + buf.toString();
    writeFileSync(this.path, Buffer.from(append));
  }

  /**
   * 元のhostsに戻す
   */
  public refresh(): void {
    writeFileSync(this.path, Buffer.from(this.original.toString()));
  }
}

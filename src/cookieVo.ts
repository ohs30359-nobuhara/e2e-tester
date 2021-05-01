export class CookieVo {
  private kv: {[key: string]: string} = {}

  constructor(str: string) {
    str.split(";").forEach(s => {
      const a: string[] = s.split(/(?<=^[^=]+?)=/);

      if (a.length > 2) return;

      this.kv[a[0]] = a[1]
    });
  }

  public get(): {[key: string]: string} {
    return this.kv
  }
}
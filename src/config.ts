import {readFileSync} from 'fs'
import {load} from 'js-yaml'

let cache: any = null;

export function get<T>(path: string): T | null {
  try {
    if (cache === null) {
      cache = load(readFileSync(path, "utf-8"));
    }
    return cache;
  } catch (e) {
    return null
  }
}

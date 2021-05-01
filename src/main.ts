import {get} from 'config'
import {Config} from "./config";
import {frontTest} from "./front/tester";
import {backendTest} from "./backend/tester";

async function main(): Promise<void> {
  const optionConfig: Config.Option = get("option");

  try {
    switch (optionConfig.type) {
      case "HTML":
        await frontTest()
        break;
      case "API":
        await backendTest();
        break;
    }
  } catch (e) {
    process.exit(1)
  }
  process.exit(0)
}

main();
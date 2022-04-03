import {frontTest} from "./front/tester";
import {backendTest} from "./backend/tester";
import {createCommand, Command} from 'commander';
import {get} from "./config";
import {CliInterface} from "./Interface";

interface Option {
  type: 'HTML' | 'API'
  config: string
}

const command: Command = createCommand();
command.requiredOption("-c --config <config>", "config path")
       .requiredOption("-t --type <type>", "test type HTML or API")
       .parse(process.argv);

async function main(): Promise<void> {
  const option: Option = command.opts<Option>();
  const args: CliInterface | null = get<CliInterface>(option.config)

  try {
    if (args === null) {
      throw Error(`"${option.config}" does not exist`)
    }

    switch (option.type) {
      case "HTML":
        await frontTest(args)
        break;
      case "API":
        await backendTest(args);
        break;
      default:
        console.error("'type' param is must be 'HTML' or 'API'")
        process.exit(1)
    }
  } catch (e) {
    console.error(e.message);
    process.exit(1)
  }
  process.exit(0)
}

main();

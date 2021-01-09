import { saveClipboardImage } from './lib';
import * as path from 'path';
import * as fs from 'fs';
const { version } = require('../package.json');

async function main(): Promise<void> {
  const [, , arg] = process.argv;
  switch (arg) {
    case '-v':
    case '--version':
      return showVersion();
    case '-h':
    case '--help':
      return showHelp();
    default:
      return execute(arg);
  }
}

function showVersion(): void {
  console.log(version);
  process.exit(0);
}

function showHelp(): void {
  console.log(`usage: pbimage [filename]

save clipboard image to file. argument filename can be full path, relative path or just a name.
skip extension. An extension will always be PNG.
`);
  process.exit(0);
}

function isDirectory(arg: string): boolean {
  try {
    return fs.lstatSync(path.resolve(arg)).isDirectory();
  } catch {
    return false;
  }
}

async function execute(arg: string): Promise<void> {
  try {
    let filename: string | undefined;
    let folder: string | undefined;
    if (!arg) {
      folder = undefined;
      filename = undefined;
    } else if (isDirectory(arg)) {
      folder = path.resolve(arg);
    } else {
      const { name, dir } = path.parse(arg);
      filename = name;
      folder = path.resolve(dir);
    }

    await saveClipboardImage(folder, filename);
  } catch (e) {
    if (e.name === 'InvalidClipboardDataError') {
      console.log('No image data in clipboard');
      process.exit(1);
    } else {
      throw e;
    }
  }
}

main();

import * as path from 'path';
const osascript = require('node-osascript');

const execute = (command: string): Promise<any> =>
  new Promise((resolve, reject) => {
    osascript.execute(command, (err: Error, result: any) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });

class InvalidClipboardDataError extends Error {
  name = 'InvalidClipboardDataError';
}

/**
 * Save clipboard image data to file
 *
 * @param folder - folder name.
 * @param filename - filename without extension.
 * @returns full path of the image file.
 */
export async function saveClipboardImage(
  folder = process.cwd(),
  filename = `Screen Shot ${Number(new Date())}`
): Promise<string> {
  const command = `tell application "System Events" to ¬
        write (the clipboard as «class PNGf») to ¬
        (make new file at folder "${folder}" ¬
        with properties {name:"${filename}.png"})`;
  try {
    await execute(command);
    return path.resolve(folder, filename);
  } catch (e) {
    if (e.message.includes('-1700')) {
      throw new InvalidClipboardDataError();
    } else {
      throw e;
    }
  }
}

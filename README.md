# save-clipboard-image
Save clipboard image to file. works in Mac OSX NodeJS.

## Install
### CLI
```
$ npm install -g save-clipboard-image
```
### API
```
$ npm install save-clipboard-image
```

## Usage
### CLI
```
$ pbimage [filename]
```
### API
```ts
const { saveClipboardImage } = require('save-clipboard-image');

(async () => {
  const imagePath = await saveClipboardImage('./path/to/folder', 'image-name');

  console.log(image saved in', imagePath);
  // '/Users/.../path/to/folder/image-name.png'
})();
```

## `saveClipboardImage(folder[, filename])`
- `folder` a path to folder. default: `process.cwd()`
- `filename` a name of the image file. default: `Screen Shot ${Number(new Date())}`

returns full path of the image file.

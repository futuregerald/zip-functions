const AdmZip = require('adm-zip');
const fs = require('fs');

console.log(__dirname);
fs.readdir(__dirname, (err, files) => {
  if (err) {
    return console.log(`couldn't scan current directory: ${err}`);
  }
  // console.log(files);
  const funcFiles = files.filter(f => {
    const regex = /\.js$/g;
    return regex.test(f);
  });
  funcFiles.forEach(script => {
    if (script !== 'zip_functions.js') {
      const name = script.substring(0, script.length - 3);
      const zip = new AdmZip();
      zip.addLocalFile(script, `/${name}/`);
      zip.addLocalFolder('./node_modules/', `/${name}/node_modules`);
      zip.writeZip(`./zipped/${name}.zip`);
    }
  });
});

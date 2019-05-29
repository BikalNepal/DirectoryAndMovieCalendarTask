const { promisify } = require("util");
const path = require("path");
const readLine = require("readline");
const fs = require("fs");
const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);
const rl = readLine.createInterface({
  input: process.stdin,
  output: process.stdout
});

//Get the subdirectories and files from input directory
let getFiles = async directoryPath => {
  const subdirs = await readdir(directoryPath);
  const files = await Promise.all(
    subdirs.map(async subdir => {
      const res = path.join(directoryPath, subdir);
      return (await stat(res)).isDirectory() ? getFiles(res) : res;
    })
  );
  return files.reduce((acc, file) => acc.concat(file), []);
};

//Ask user for valid directory
function directoryInput() {
  return new Promise(async (resolve, reject) => {
    rl.question("Please enter a valid directory: ", input => resolve(input));
  });
}

//function calls and output log
directoryInput().then(userInput => {
  rl.close();
  getFiles(userInput)
    .then(files => {
      console.log("Subdirectories and Files: ", files);
      let onlyFiles = files.map(file => file.split(path.sep).slice(-1)[0]);
      console.log("Only Files: ", onlyFiles);
    })
    .catch(err => console.log(err));
});

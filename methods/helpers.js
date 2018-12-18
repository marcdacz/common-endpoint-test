const getJsons = (dir, result = []) => {
  fs.readdirSync(dir).forEach((file) => {
    const name = path.parse(file).name;
    const filePath = path.resolve(dir, file);
    const fileStats = { name, path: filePath };

    if (fs.statSync(filePath).isDirectory()) {
      return getJsons(filePath, result)
    }

    if (file.indexOf('.js') > 0) {
      result.push(fileStats);
    }
  });

  return result;
};

module.exports = {
  getJsons
};
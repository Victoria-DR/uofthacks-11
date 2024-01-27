const base64ToBuffer = (base64) => {
  const buffer = new Buffer.from(base64.replace(/^data:image\/\w+;base64,/, ""), 'base64');
  return buffer;
}

module.exports = base64ToBuffer;

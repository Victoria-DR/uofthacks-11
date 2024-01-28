const bufferToBase64 = (buffer) => {
  const base64 = new Buffer.from(buffer).toString('base64');
  return `data:image/jpg;base64,${base64}`;
}

module.exports = bufferToBase64;

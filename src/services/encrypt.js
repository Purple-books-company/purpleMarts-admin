import crypt from 'crypto-js';

function encrypt(email) {
  console.log(email);
  let cipherText = crypt.AES.encrypt(
    email,
    process.env.REACT_APP_KEY
  ).toString();
  return cipherText;
}

function decrypt(text) {
  try {
    let originalText = crypt.AES.decrypt(
      text,
      process.env.REACT_APP_KEY
    ).toString(crypt.enc.Utf8);
    return originalText;
  } catch (e) {
    return null;
  }
}

export { encrypt, decrypt };

const readline = require('readline');
const crypto = require('crypto');
const fs = require('fs');

const algorithm = 'aes-256-cbc';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('enter the text you want to encrypt: ', (text) => {
  const key = crypto.randomBytes(32);
  const iv = crypto.randomBytes(16);

  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');

  const data = {
    iv: iv.toString('hex'),
    key: key.toString('hex'),
    encryptedText: encrypted,
  };

  fs.writeFileSync('encrypted.txt', JSON.stringify(data));

  console.log('Text successfully encrypted and saved in "encrypted.text".');
  
  rl.close();
});
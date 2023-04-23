const crypto = require('crypto');
const fs = require('fs');

const algorithm = 'aes-256-cbc';

const data = JSON.parse(fs.readFileSync('encrypted.txt', 'utf8'));

const iv = Buffer.from(data.iv, 'hex');
const key = Buffer.from(data.key, 'hex');
const encryptedText = data.encryptedText;

const decipher = crypto.createDecipheriv(algorithm, key, iv);
let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
decrypted += decipher.final('utf8');

console.log('Decrypted text:', decrypted);
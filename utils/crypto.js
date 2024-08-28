const crypto = require("crypto");

const key = crypto.scryptSync("your-secret-key", "salt", 32); // Replace 'your-secret-key' with your
const iv = crypto.randomBytes(16); // Generate a random IV

const encryptString = (plainText) => {
  const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
  let encrypted = cipher.update(plainText, "utf8", "base64");
  encrypted += cipher.final("base64");
  return iv.toString("base64") + ":" + encrypted; // Combine IV with encrypted text
};

const decryptString = (encryptedText) => {
  const [iv, encrypted] = encryptedText
    .split(":")
    .map((part) => Buffer.from(part, "base64"));
  const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
  let decrypted = decipher.update(encrypted, "base64", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
};

module.exports = { encryptString, decryptString };

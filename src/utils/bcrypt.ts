import * as bcrypt from 'bcrypt';

const saltRounds = 10;

export async function hashPassword(rawPassword: string) {
  const salt = await bcrypt.genSalt(saltRounds);
  return await bcrypt.hash(rawPassword, salt);
}

export async function comparePasswords(rawPassword: string, hash: string) {
  return await bcrypt.compare(rawPassword, hash);
}

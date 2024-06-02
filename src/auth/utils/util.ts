import * as bcrypt from "bcrypt";
export async function generateHash(password: string): Promise<string> {
  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash(password, salt);
  return hash;
}
export async function matchHash({
  password,
  hash,
}: {
  password: string;
  hash: string;
}): Promise<boolean> {
  const isMatch = await bcrypt.compare(password, hash);
  return isMatch;
}

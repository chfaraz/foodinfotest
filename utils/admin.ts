import * as bcrypt from 'bcrypt';

export const hash = async () => {
  const password = process.env.USER_PASSWORD;
  const saltRounds = 10;
  const result = await bcrypt.hash(password, saltRounds);
  console.log(result);
  return result;
};

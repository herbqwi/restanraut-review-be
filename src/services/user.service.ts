import jwt from 'jsonwebtoken';
import User from '../models/user.model';

const isAuthenticated = async ({ credentials, token }: { credentials?: { email: string, password: string }, token?: string }) => {


  if (token != null && token != undefined) {
    const tokenStatus = await new Promise(resolve => {
      jwt.verify(token, `my_key`, async (err, decoded: any) => {
        if (err) resolve(null);
        resolve({ ...(await User.findById(decoded._id)), token });
      });
    })
    if (tokenStatus != null) return tokenStatus;
  }

  if (credentials != null && credentials != undefined) {
    const foundUser = await User.findOne({ email: credentials.email, password: credentials.password });
    if (foundUser != null) {
      const generatedToken = await new Promise(resolve => {
        jwt.sign({ userId: foundUser }, `my_key`, (err: any, token: any) => {
          resolve(token);
        });
      })
      return { ...foundUser, token: generatedToken };
    }
  }


  return null;
}

export { isAuthenticated };
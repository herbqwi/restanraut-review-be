import jwt from 'jsonwebtoken';
import User from '../models/user.model';

const isAuthenticated = async ({ credentials, token }: { credentials?: { email: string, password: string }, token?: string }) => {

  if (token) {
    const tokenStatus = await new Promise(resolve => {
      jwt.verify(token, `my_key`, async (err, decoded: any) => {
        if (err) resolve(null);
        resolve({ ...(await User.findById(decoded.id)), token });
      });
    });
    
    if (tokenStatus != null) return tokenStatus;
  }

  if (credentials) {
    const foundUser = await User.findOne({ email: credentials.email, password: credentials.password });
    if (foundUser != null) {
      console.log(foundUser);
      
      const generatedToken = await new Promise(resolve => {
        jwt.sign({ id: foundUser._id, email: foundUser.email }, `my_key`, (err: any, token: any) => {          
          resolve(token);
        });
      })
      return { ...foundUser, token: generatedToken };
    }
  }


  return null;
}

export { isAuthenticated };
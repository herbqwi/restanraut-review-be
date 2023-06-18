import { IUser } from "../interfaces/user";
import Restaurant from "../models/restaurant.model";
import User from "../models/user.model";
import { isAuthenticated } from "../services/user.service";

const authUser = async (payload: { credentials?: { email: string, password: string }, token?: string }) => {
  const user = await isAuthenticated(payload)
  return user;
}

const createNewUser = async (user: IUser.UserData) => {
  const newUser = new User(user);
  return await newUser.save();
}

const getUser = async (userId: string) => {
  return await User.findById(userId);
}

const getAllUsers = async () => {
  return await User.find();
}

const deleteUser = async (userId: string) => {
  return await User.findByIdAndDelete(userId);
}

const updateUser = async (userId: string, userData: IUser.UserData) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error(`User with ID ${userId} not found.`);
  }
  Object.assign(user, userData);

  return await user.save();
};


export default { authUser, createNewUser, getUser, getAllUsers, deleteUser, updateUser };
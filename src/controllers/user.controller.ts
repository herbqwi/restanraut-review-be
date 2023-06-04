import { IUser } from "../interfaces/user";
import Restaurant from "../models/restaurant.model";
import User from "../models/user.model";
import { isAuthenticated } from "../services/user.service";

const authUser = async ({ credentials, token }: { credentials?: { email: string, password: string }, token?: string }) => {
  const user = await isAuthenticated({ credentials, token })
  return user;
}

const createNewUser = async (user: IUser.UserData) => {
  const newUser = new User(user);
  return await newUser.save();
}

const getUser = async (userId: string) => {
  return await User.findById(userId);
}

const deleteUser = async (userId: string) => {
  return await User.findByIdAndDelete(userId);
}

const updateUser = async (userId: string, userData: IUser.UserData) => {
  const updatedRestaurant = Restaurant.findByIdAndUpdate(userId, userData);
  return await (new Restaurant(updatedRestaurant)).save();
}

export default { authUser, createNewUser, getUser, deleteUser, updateUser };
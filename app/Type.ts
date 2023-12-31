import { ObjectId } from "mongodb";

export type CookieType = string;

export type UserType = {
  id: string;
  email: string;
  nickName?: string;
  phone?: string;
  name?: string;
  emailVerified?: any;
  _id?: string;
  image?: string;
};

export type NoticePostType = {
  _id: string;
  title: string;
  date: Date;
  description: string;
};

export type CommnunityPostType = {
  _id: string;
  userId: string;
  userName: string;
  type: string;
  title: string;
  content: string;
  date: Date;
  count: number;
};

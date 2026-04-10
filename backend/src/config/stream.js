import {StreamChat} from "stream-chat";
import { ENV } from "./env.js";
import { cloneElement } from "react";
import { err } from "inngest/types";

const streamClient = StreamChat.getInstance(ENV.STREAM_API_KEY,ENV.STREAM_API_SECRET)

export const upsertStreamUser = async (userData) => {
  try{
    await streamClient.upsertUser(userData);
    console.log("Strean user upserted Successfully:",userData.name);
    return userData;
  }catch(error){
    console.log("Error upserting the Stream User:",error);
  }
}

export const deleteStreamUser = async (userId) => {
  try{
    await streamClient.deleteUser(userId);
    console.log("Stream User deleted Successfully:",userId);
  }catch(error){
    console.log("Error in deleting the Stream User",error);
  }
};

export const generateStreamToken = (userId) => {
  try{
    const userIdString = userId.toString();
    return streamClient.createToken(userIdString);
  }catch(error){
    console.log("Error in generating Stream token:",error);
    return null;
  }
}
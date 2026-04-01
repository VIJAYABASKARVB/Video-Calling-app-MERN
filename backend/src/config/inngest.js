/*

The flow for the below function:

User signs up (Clerk)
        ↓
Clerk sends event → "clerk/user.created"
        ↓
Inngest receives event
        ↓
This function triggers
        ↓
connectDB()
        ↓
User.create(newUser)
        ↓
User saved in MongoDB

*/

import { Inngest } from "inngest";
import {connectDB} from "./db.js"
import {User} from "../models/user.model.js"

export const inngest = new Inngest({ id: "video-calling-app" });

const syncUser = inngest.createFunction(
  {id:"sync user"},
  {event:"clerk/user.created"},
  async ({event}) => {
    await connectDB()

    const {id, email_addresses, first_name, last_name, image_url} = event.data;

    const newUser = {
      clerkId: id,
      email: email_addresses?.[0]?.email_address,
      name: `${first_name || ""} ${last_name || ""}`.trim(),
      image: image_url,
    }

    await User.create(newUser);
  }
);

const deleteUserFromDB = inngest.createFunction(
  {id:"delete-user-from-database"},
  {event:"clerk/user.deleted"},
  async ({event}) => {
    await connectDB();
    const {id} = event.data;
    await User.deleteOne({clerkId:id});
  }
)

export const functions = [syncUser, deleteUserFromDB];
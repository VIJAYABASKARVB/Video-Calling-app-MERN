import { Inngest } from "inngest";
import {connectDB} from "./db.js"
import {User} from "../models/user.model.js"

// Create a client to send and receive events
export const inngest = new Inngest({ id: "video-calling-app" });

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

const syncUser = inngest.createFunction(
  {id:"sync user"},
  {event:"clerk/user.created"},
  async ({event}) => {
    await connectDB()

    const {id,email_address,first_name,last_name,image_url} = event.data;

    const newUser = {
      clerkId:id,
      email:email_address[0]?.email_address,
      name:`${first_name || ""} ${last_name || ""}`,
      image:image_url,
    }

    await User.create(newUser);
  }
);


//Deleting the user from the DB
const deleteUserFromDB = inngest.createFunction(
  {id:"delete-user-from-database"},
  {event:"clerk/user.deleted"},
  async ({event}) => {
    const {id} = event.data;
    await User.deleteOne({clerkId:id});

  }
)

// Create an empty array where we'll export future Inngest functions
export const functions = [syncUser,deleteUserFromDB];
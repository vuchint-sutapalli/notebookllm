"use client";
import { Client, Storage, ID } from "appwrite";

const client = new Client()
	.setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT) // Your Appwrite endpoint
	.setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID); // Your Appwrite Project ID

export const storage = new Storage(client);
export { ID };

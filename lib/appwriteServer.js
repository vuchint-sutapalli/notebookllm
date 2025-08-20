import { Client, Storage, ID } from "node-appwrite";

const client = new Client()
	.setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
	.setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID)
	.setKey(process.env.APPWRITE_API_KEY); // server key required

export const storage = new Storage(client);
export { ID };

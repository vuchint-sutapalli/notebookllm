"use server";

import { auth } from "@clerk/nextjs/dist/types/server";
import { revalidatePath } from "next/cache";

export async function generateEmbeddings(docId) {
	auth().protect();

	await generateEmbeddingsInPineStore(docId);

	revalidatePath("/dashboard");

	return { completed: true };
}

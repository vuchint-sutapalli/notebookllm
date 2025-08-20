"use server";

import { generateEmbeddingsInPineStore } from "@/lib/langchain";

export async function processPdf(docName, docId) {
	if (!docId) throw new Error("No  docId provided");

	console.log("docname is", docName);

	const results = await generateEmbeddingsInPineStore(docName, docId);

	console.log("indexing done");

	return { completed: true };
}

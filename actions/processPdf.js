"use server";

import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";

import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

import { generateEmbeddingsInPineStore } from "@/lib/langchain";

export async function processPdf(file, docId) {
	if (!file) throw new Error("No file URL provided");

	// 1. Load PDF directly from file path/url
	console.log("file is", file);

	const loader = new WebPDFLoader(file);
	const docs = await loader.load();

	// 2. Split into chunks
	const splitter = new RecursiveCharacterTextSplitter({
		chunkSize: 1000,
		chunkOverlap: 200,
	});
	const splitDocs = await splitter.splitDocuments(docs);

	// console.log("chunks is", splitDocs);
	const results = await generateEmbeddingsInPineStore(splitDocs, docId);

	console.log("indexing done", results);

	return { completed: true };
}

"use server";

import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";

import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { OpenAIEmbeddings } from "@langchain/openai";
import { PineconeStore } from "@langchain/pinecone";
import PineconeClient from "@/lib/pinecone";

// import { FaissStore } from "@langchain/community/vectorstores/faiss";
// import path from "path";

export async function processPdf(file) {
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

	console.log("chunks is", splitDocs);

	// 3. Create embeddings
	const embeddings = new OpenAIEmbeddings({
		model: "text-embedding-3-small",
	});

	const pineconeIndex = PineconeClient.Index(process.env.PINECONE_INDEX);

	// 5. Store in Pinecone
	const vectorStore = await PineconeStore.fromDocuments(splitDocs, embeddings, {
		pineconeIndex: pineconeIndex,
		namespace: "pdf-uploads", // optional namespace for organization
	});

	console.log("indexing done");

	// // Example: search
	// const results = await vectorStore.similaritySearch("summary of pdf", 2);

	return { completed: true };
}

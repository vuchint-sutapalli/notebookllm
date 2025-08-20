import { ChatOpenAI, OpenAIEmbeddings } from "@langchain/openai";
import PineconeClient from "@/lib/pinecone";
import { auth } from "@clerk/nextjs/server";
import { PineconeStore } from "@langchain/pinecone";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import os from "os";
import fs from "fs/promises";
import path from "path";

import { storage } from "./appwriteServer";

export async function generateDocs(docId) {
	const { userId } = await auth();

	if (!userId) {
		throw new Error("User not found");
	}
	console.log(`fetching download url from appwrite ${docId}`);

	const fileBuffer = await storage.getFileDownload(
		process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID,
		docId
	);

	if (!fileBuffer) {
		throw new Error("file  not found");
	}
	console.log(`download  fetched- ${fileBuffer}`);

	// 2. Save buffer to a temporary file
	const tempDir = os.tmpdir(); // system temp folder
	const filePath = path.join(tempDir, `${docId}.pdf`);
	await fs.writeFile(filePath, Buffer.from(fileBuffer));

	// 3. Load with LangChain PDFLoader
	const loader = new PDFLoader(filePath);
	const docs = await loader.load();

	// const response = await fetch(fileData?.);
	// const data = await response.blob();

	console.log(`loaded the pdf now using pdfloader, ${docs}`);

	// 2. Split into chunks
	const splitter = new RecursiveCharacterTextSplitter({
		chunkSize: 1000,
		chunkOverlap: 200,
	});
	const splitDocs = await splitter.splitDocuments(docs);

	console.log(`chunks, ${splitDocs}`);

	return splitDocs;
}

async function nameSpaceExists(index, namespace) {
	if (namespace == null) throw new Error("no namespace value provided");
	debugger;

	const { namespaces } = await index.describeIndexStats();
	console.log("namespaces..", namespaces);

	return namespaces?.[namespace] !== undefined;
}

export async function generateEmbeddingsInPineStore(docName, docId) {
	const { userId } = await auth();

	if (!userId) {
		throw new Error("User not found");
	}

	let vectorStore;

	console.log("generating embeddingss");

	const embeddings = new OpenAIEmbeddings({
		model: "text-embedding-3-small",
	});

	const pineconeIndex = PineconeClient.Index(process.env.PINECONE_INDEX);

	//check if namespace exist

	const nameSpaceAlreadyExists = await nameSpaceExists(pineconeIndex, docName);

	if (nameSpaceAlreadyExists) {
		console.log("namespace alrdy exist, resue existing embeddings");
		vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
			pineconeIndex: pineconeIndex,
			namespace: docName, // optional namespace for organization
		});
	} else {
		//download pdf from server

		let splitDocs = await generateDocs(docId);

		if (!splitDocs) {
			throw new Error("error splitting in to chunks");
		}

		// 5. Store in Pinecone
		vectorStore = await PineconeStore.fromDocuments(splitDocs, embeddings, {
			pineconeIndex: pineconeIndex,
			namespace: docName, // optional namespace for organization
		});
	}

	return vectorStore;
}

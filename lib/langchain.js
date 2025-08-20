import { ChatOpenAI, OpenAIEmbeddings } from "@langchain/openai";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import PineconeClient from "./pinecone";
import { auth } from "@clerk/nextjs/dist/types/server";

const model = new ChatOpenAI({
	apiKey: process.env.OPENAI_API_KEY,
	modelName: "gpt-4o",
});

export const indexName = "notebookchunks";

export async function generateEmbeddingsInPineStore(docId) {
	const { userId } = await auth();

	if (!userId) {
		throw new Error("User not found");
	}

	let pineConeVectorStore;

	console.log("generating embeddingss");

	const embeddings = new OpenAIEmbeddings();

	// const index = await PineconeClient.index(indexName);
}

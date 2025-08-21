import { Pinecone } from "@pinecone-database/pinecone";
import { OpenAIEmbeddings } from "@langchain/openai";

if (!process.env.PINECONE_API_KEY) {
	throw new Error("PINECONE_API_KEY is not set in the environment variables.");
}

export const PineconeClient = new Pinecone({
	apiKey: process.env.PINECONE_API_KEY,
});

// Embeddings instance
export const embeddingsInstance = new OpenAIEmbeddings({
	model: "text-embedding-3-small", // cheaper + fast
	apiKey: process.env.OPENAI_API_KEY,
});

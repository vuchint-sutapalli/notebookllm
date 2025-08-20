import { ChatOpenAI, OpenAIEmbeddings } from "@langchain/openai";
import PineconeClient from "@/lib/pinecone";
import { auth } from "@clerk/nextjs/server";
import { PineconeStore } from "@langchain/pinecone";

export async function generateDocs(docId) {
	const { userId } = await auth();

	if (!userId) {
		throw new Error("User not found");
	}
}

async function nameSpaceExists(index, namespace) {
	if (namespace == null) throw new Error("no namespace value provided");
	debugger;

	const { namespaces } = await index.describeIndexStats();
	console.log("namespaces..", namespaces);

	return namespaces?.[namespace] !== undefined;
}

export async function generateEmbeddingsInPineStore(splitDocs, docId) {
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

	const nameSpaceAlreadyExists = await nameSpaceExists(pineconeIndex, docId);

	if (nameSpaceAlreadyExists) {
		console.log("namespace alrdy exist, resue existing embeddings");
		vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
			pineconeIndex: pineconeIndex,
			namespace: docId, // optional namespace for organization
		});
	} else {
		//download pdf from server

		// 5. Store in Pinecone
		vectorStore = await PineconeStore.fromDocuments(splitDocs, embeddings, {
			pineconeIndex: pineconeIndex,
			namespace: docId, // optional namespace for organization
		});
	}

	return vectorStore;
}

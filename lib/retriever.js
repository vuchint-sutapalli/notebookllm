import { PineconeClient, embeddingsInstance } from "./pinecone";

export async function retrieveContext(query, namespace) {
	// Create embedding for query
	console.log(`started retrieval,${query}, in ${namespace}`);

	const queryEmbedding = await embeddingsInstance.embedQuery(query);

	// Query Pinecone
	const index = PineconeClient.Index(process.env.PINECONE_INDEX);

	const ns = index.namespace(namespace);

	console.log(`namespaceindex is ${namespace}`);

	console.log(`querying top 5 vect`);

	const response = await ns.query({
		vector: queryEmbedding,
		topK: 5,
		includeMetadata: true,
	});

	if (!response.matches?.length) {
		return { contextText: "", matches: [] };
	}
	const matches = response.matches.map((m) => ({
		text: m.metadata?.text || "",
		page: m.metadata?.page || null,
		score: m.score,
	}));

	// Extract matched chunks
	const contexts =
		response.matches?.map((match) => match.metadata?.text || "") ?? [];

	return {
		contextText: matches.map((m) => m.text).join("\n\n"),
		matches,
	};
}

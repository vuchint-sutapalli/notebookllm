import { embeddingsInstance, PineconeClient } from "@/lib/pinecone";
import { retrieveContext } from "@/lib/retriever";
import { openai } from "@ai-sdk/openai";
import { convertToModelMessages, streamText, UIMessage } from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

// async function retrieveContext(query) {
// 	// 1. Embed user query
// 	const queryEmbedding = await embeddings.embedQuery(query);

// 	// 2. Query Pinecone
// 	const index = pinecone.Index(process.env.PINECONE_INDEX);
// 	const response = await index.query({
// 		vector: queryEmbedding,
// 		topK: 5,
// 		includeMetadata: true,
// 	});
// 	// 3. Collect matched text chunks
// 	return (
// 		response.matches?.map((m) => m.metadata?.text || "").join("\n\n") ?? ""
// 	);
// }

export async function POST(req) {
	// const { messages, namespace } = await req.json();
	const reqjson = await req.json();

	console.log(`recieved ${JSON.stringify(reqjson)}`);

	const { messages, namespace } = reqjson;

	// The last user message
	const latestMsg = messages[messages.length - 1];

	// Handle multi-part messages, but usually it's just text
	const latestUserMessage =
		latestMsg?.parts?.map((p) => p.text).join(" ") || "";

	console.log("usee qu is", latestUserMessage, namespace);
	if (!latestUserMessage) {
		throw new Error("query invalid");
	}

	const { contextText } = await retrieveContext(latestUserMessage, namespace);

	// const context = await retrieveContext(latestUserMessage);

	// Add context into system prompt
	const systemPrompt = `
		You are a helpful assistant that answers queries based only on the provided document context. 
		If the context does not contain the answer, say "I couldnt find that in the document."

		Context:
		${contextText}
	`;

	const result = streamText({
		model: openai("gpt-4.1"),
		system: systemPrompt,
		messages: convertToModelMessages(messages),
	});

	return result.toUIMessageStreamResponse();
}

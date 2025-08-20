"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useState, useRef, useEffect } from "react";
import { Send, Loader2, Paperclip, Mic } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ChatBot() {
	const { messages, sendMessage, status } = useChat({
		transport: new DefaultChatTransport({
			api: "/api/chat",
		}),
	});
	const [input, setInput] = useState("");
	const messagesEndRef = useRef(null);

	// Auto scroll to bottom on new messages
	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]);

	return (
		<div className="flex flex-col w-full max-w-2xl mx-auto h-[90vh] bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-2xl shadow-xl overflow-hidden">
			{/* Header */}
			<div className="p-4 bg-gray-900 border-b border-gray-700 flex items-center justify-between">
				<h2 className="text-white text-lg font-semibold">🤖 AI Assistant</h2>
				<span
					className={`px-2 py-1 text-xs rounded-full ${
						status === "ready"
							? "bg-green-500/20 text-green-400"
							: "bg-yellow-500/20 text-yellow-400"
					}`}
				>
					{status === "ready" ? "Online" : "Thinking..."}
				</span>
			</div>

			{/* Messages */}
			<div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
				<AnimatePresence>
					{messages.map((message) => (
						<motion.div
							key={message.id}
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -10 }}
							className={`flex ${
								message.role === "user" ? "justify-end" : "justify-start"
							}`}
						>
							<div
								className={`max-w-xs px-4 py-2 rounded-2xl shadow ${
									message.role === "user"
										? "bg-blue-600 text-white rounded-br-none"
										: "bg-gray-700 text-gray-100 rounded-bl-none"
								}`}
							>
								{message.parts.map((part, index) =>
									part.type === "text" ? (
										<p key={index} className="text-sm leading-relaxed">
											{part.text}
										</p>
									) : null
								)}
							</div>
						</motion.div>
					))}
				</AnimatePresence>
				{status !== "ready" && (
					<div className="flex items-center space-x-2 text-gray-400">
						<Loader2 className="w-4 h-4 animate-spin" />
						<span className="text-sm">AI is thinking...</span>
					</div>
				)}
				<div ref={messagesEndRef} />
			</div>

			{/* Input Bar */}
			<form
				onSubmit={(e) => {
					e.preventDefault();
					if (input.trim()) {
						sendMessage({ text: input });
						setInput("");
					}
				}}
				className="p-4 border-t border-gray-700 flex items-center space-x-2 bg-gray-900"
			>
				<button
					type="button"
					className="p-2 text-gray-400 hover:text-white transition"
				>
					<Paperclip size={18} />
				</button>
				<input
					value={input}
					onChange={(e) => setInput(e.target.value)}
					disabled={status !== "ready"}
					placeholder="Type your message..."
					className="flex-1 p-2 rounded-lg bg-gray-800 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
				/>
				<button
					type="button"
					className="p-2 text-gray-400 hover:text-white transition"
				>
					<Mic size={18} />
				</button>
				<button
					type="submit"
					disabled={status !== "ready"}
					className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition disabled:opacity-50"
				>
					<Send size={18} />
				</button>
			</form>
		</div>
	);
}

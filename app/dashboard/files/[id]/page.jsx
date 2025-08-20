"use client"; // 👈 Add this at the top
import useUpload from "@/hooks/useUpload";
import React, { useState } from "react";
import ChatBot from "../../chatbot";

function ChatToFilePage({ params }) {
	const { output } = useUpload();

	const { id } = React.use(params); // unwrap the promise

	return (
		<div>
			{id}
			<ChatBot />
		</div>
	);
}

export default ChatToFilePage;

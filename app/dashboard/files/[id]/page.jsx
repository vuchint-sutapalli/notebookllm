"use client"; // 👈 Add this at the top
import useUpload from "@/hooks/useUpload";
import React from "react";

function ChatToFilePage({ params }) {
	const { output } = useUpload();

	const { id } = React.use(params); // unwrap the promise

	return (
		<div>
			{id}
			{output && (
				<div className="mt-4">
					<p>Chunks created: {output.chunks}</p>
				</div>
			)}
		</div>
	); // ✅ Works fine in client
}

export default ChatToFilePage;

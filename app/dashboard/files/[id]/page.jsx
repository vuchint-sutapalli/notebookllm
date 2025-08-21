"use client";
import useUpload from "@/hooks/useUpload";
import React, { useEffect, useState } from "react";
import ChatBot from "../../chatbot";
import PdfView from "@/components/PdfView";
import { storage } from "@/lib/appwrite";

function ChatToFilePage({ params }) {
	const { output } = useUpload();
	const [fileUrl, setFileUrl] = useState(null);
	const [fileName, setFileName] = useState(null);

	const { id } = React.use(params); // unwrap the promise

	async function fetchData() {
		const fileObj = await storage.getFile(
			process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID,
			id
		);
		return fileObj.name;
	}

	useEffect(() => {
		let fUrl = storage.getFileView(
			process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID,
			id
		);
		console.log(fUrl);

		setFileUrl(fUrl);

		const getData = async () => {
			try {
				const data = await fetchData();
				setFileName(data);
				console.log(data);
			} catch (error) {
				console.error("Error fetching file:", error);
			}
		};

		getData();
	}, [id]);

	return (
		<div className="flex h-screen w-full bg-gradient-to-br from-gray-950 via-gray-900 to-black text-gray-100 p-4 gap-4">
			{/* Left Sources Panel */}
			<div className="w-1/2 bg-gray-900/60 backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden flex flex-col">
				{fileUrl && <PdfView fileUrl={fileUrl} />}
			</div>

			{/* Right Chat Panel */}
			<div className="flex-1 flex flex-col">
				{fileName ? <ChatBot fileName={fileName} /> : <></>}
			</div>
		</div>
	);
}

export default ChatToFilePage;

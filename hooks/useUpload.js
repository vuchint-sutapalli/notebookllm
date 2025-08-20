"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ID, storage } from "@/lib/appwrite";

import ShortUniqueId from "short-unique-id";
import { processPdf } from "@/actions/processPdf";

const StatusText = Object.freeze({
	Uploading: "uploading file",
	Uploaded: "file uploaded successfully",
	Saving: "saving file to database",
	Generating: "Generating AI embeddings..",
});
const uid = new ShortUniqueId({ length: 3 });

function useUpload() {
	const [fileId, setFileId] = useState(null);
	const [fileUrl, setFileUrl] = useState(null);
	const [output, setOutput] = useState(null);

	const { user } = useUser();

	const router = useRouter();

	const handleUpload = async (file) => {
		if (!file || !user) {
			console.error("No file provided for upload");
			return;
		}
		console.log(user);

		const fileIdToUploadTo = `${user.id}-${uid.rnd()}`;

		const response = await storage.createFile(
			process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID,
			fileIdToUploadTo, // fileId includes userId
			file
		);

		const fileObj = await storage.getFile(
			process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID,
			response.$id
		);

		const fileView = storage.getFileView(
			process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID,
			response.$id
		);

		console.log("uploaded", fileObj, fileView);

		setFileId(fileObj.$id);
		setFileUrl(fileView);

		const result = await processPdf(file);
		console.log(result);
		// setOutput(result);

		//free pro limitations
	};
	return { fileId, fileUrl, output, handleUpload };
}

export default useUpload;

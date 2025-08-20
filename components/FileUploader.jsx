"use client";
import useUpload from "@/hooks/useUpload";
import { storage, ID } from "@/lib/appwrite";
import { useUser } from "@clerk/nextjs";
import { CircleArrowDownIcon, RocketIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

// import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";

function FileUploader() {
	const { user } = useUser();
	const router = useRouter();

	const { fileId, fileUrl, output, handleUpload } = useUpload();

	useEffect(() => {
		if (fileId && fileUrl) {
			router.push(`/dashboard/files/${fileId}`);
		}
	}, [fileId, router]);

	const onDrop = useCallback(async (acceptedFiles) => {
		// const { progress, status, fileId, handleUpload } = useUpload();
		const file = acceptedFiles[0];
		if (!file) {
			console.error("No file selected");
			//toast msg
			return;
		} else {
			console.log("Files dropped:", file);

			// Upload PDF
			await handleUpload(file);
		}

		// const loader = new PDFLoader(
		// 	"src/document_loaders/example_data/example.pdf"
		// );

		// const docs = await loader.load();

		// const blob = new Blob(acceptedFiles, { type: "application/pdf" });
		// const loader = new WebPDFLoader(blob, {
		// 	splitPages: true, // default: one Document per page
		// 	// additional options like parsedItemSeparator: "" are supported
		// });
		// const docs = await loader.load();
		// console.log("Loaded documents:", docs);

		// Do something with the files
	}, []);
	const { getRootProps, getInputProps, isFocused, isDragActive, isDragAccept } =
		useDropzone({
			onDrop,
			maxFiles: 1,
			accept: { "application/pdf": [".pdf"] },
		});
	return (
		<div className="flex flex-col gap-4  items-center max-w-7xl mx-auto">
			<div
				{...getRootProps()}
				className={`border-orange-600 text-orange-600 border-2 mt-10 w-[90%] border-dashed rounded-lg h-96 flex justify-center items-center p-10 ${
					isFocused || isDragAccept ? "bg-orange-300" : "bg-orange-100"
				}`}
			>
				<input {...getInputProps()} />
				<div className="flex flex-col items-center text-center">
					{isDragActive ? (
						<>
							<RocketIcon className="w-16 h-16 text-orange-600 mb-2" />
							<p>Drop the files here ...</p>
						</>
					) : (
						<>
							<CircleArrowDownIcon className="w-16 h-16 text-orange-600 mb-2" />
							<p>Drag 'n' drop some files here, or click to select files</p>
						</>
					)}
				</div>
				<span>{fileId}</span>
			</div>
		</div>
	);
}

export default FileUploader;

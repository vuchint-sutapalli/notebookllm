"use client";
import React from "react";
import { Button } from "./ui/button";
import { PlusCircleIcon } from "lucide-react";
import { useRouter } from "next/navigation";

function PlaceHolderDocument() {
	const router = useRouter();
	const handleClick = () => {
		// check user role
		router.push("/dashboard/upload");
		// Logic to handle document addition can be added here
	};
	return (
		<Button
			onClick={handleClick}
			className="flex flex-col items-center w-66 h-64 rounded-xl bg-gray-200 text-gray-400 drop-shadow-md cursor-pointer"
		>
			<PlusCircleIcon className="w-16 h-16 text-gray-400 mb-2" />
			<span className="text-gray-500">Add Document</span>
		</Button>
	);
}

export default PlaceHolderDocument;

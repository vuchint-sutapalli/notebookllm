import Image from "next/image";

import Landing from "../components/Landing"; // Adjust the import path as necessary

export default function Home() {
	return (
		<main className="flex-1 overflow-scroll p-2 lg:p-5 bg-gradient-to-bl from-white to-orange-600">
			<Landing />
		</main>
	);
}

"use client";

import { Button } from "@/components/ui/button";
import {
	BrainCogIcon,
	EyeIcon,
	GlobeIcon,
	MonitorSmartphoneIcon,
	ZapIcon,
} from "lucide-react";
import Link from "next/link";
import React from "react";

const features = [
	{
		name: "Store your PDF Documents",
		description:
			"Keep all your important PDF files securely stored and easily accessible anytime, anywhere.",
		icon: GlobeIcon,
	},
	{
		name: "Blazing Fast Responses",
		description:
			"Experience lightning-fast answers to your queries, ensuring you get the information you need instantly.",
		icon: ZapIcon,
	},
	{
		name: "Chat Memorisation",
		description:
			"Our intelligent chatbot remembers previous interactions, providing a seamless and personalized experience.",
		icon: BrainCogIcon,
	},
	{
		name: "Interactive PDF Viewer",
		description:
			"Engage with your PDFs like never before using our intuitive and interactive viewer.",
		icon: EyeIcon,
	},
	{
		name: "Cloud Backup",
		description:
			"Rest assured knowing your documents are safely backed up on the cloud, protected from loss or damage.",
		icon: MonitorSmartphoneIcon,
	},
];

export default function Landing() {
	return (
		<div className="bg-white">
			{/* Hero Section */}
			<section className="min-h-screen flex flex-col items-center justify-center text-center px-6 relative overflow-hidden">
				{/* Gradient Background */}
				<div className="absolute inset-0 bg-gradient-to-b from-orange-50 via-white to-white pointer-events-none" />

				<h5 className="text-orange-600 font-semibold mb-3 relative z-10">
					Your Interactive Document Companion
				</h5>

				<h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-6 relative z-10">
					Transform Your PDFs into <br />
					<span className="bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">
						Interactive Conversations
					</span>
				</h1>

				<p className="text-gray-600 max-w-2xl mb-8 relative z-10">
					Introducing{" "}
					<span className="text-orange-600 font-medium">Chat with PDF</span>.
					Upload your document, and our chatbot will answer questions, summarize
					content, and turn static documents into{" "}
					<span className="font-semibold">dynamic conversations</span>,
					enhancing productivity effortlessly.
				</p>

				<div className="relative z-10">
					<Button
						asChild
						size="lg"
						className="rounded-2xl px-8 py-6 text-lg shadow-lg bg-orange-600 hover:bg-orange-700 text-white"
					>
						<Link href="/dashboard" className="flex items-center gap-2">
							Get Started
						</Link>
					</Button>
				</div>
			</section>

			{/* Features Section */}
			<section className="py-20 bg-gray-50 relative z-10">
				<div className="max-w-6xl mx-auto px-6 lg:px-8">
					<div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
						{features.map((feature, i) => (
							<div
								key={i}
								className="p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all"
							>
								<feature.icon className="h-10 w-10 text-orange-600 mb-4" />
								<h3 className="text-lg font-semibold text-gray-900 mb-2">
									{feature.name}
								</h3>
								<p className="text-gray-600 text-sm">{feature.description}</p>
							</div>
						))}
					</div>
				</div>
			</section>
		</div>
	);
}

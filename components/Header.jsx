import { SignedIn, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { FilePlus2 } from "lucide-react";
function Header() {
	return (
		<div className="flex items-center justify-between bg-white p-5 border-b shadow-sm">
			<Link
				className="text-2xl"
				href="/dashboard"
				className="text-2xl font-bold text-gray-900"
			>
				{" "}
				Chat to <span className="text-orange-600">PDF</span>
			</Link>
			<SignedIn>
				<div className="flex items-center space-x-2 ">
					<Button asChild variant="link" className="hidden md:flex">
						<Link href="/dashboard/upgrade">Pricing</Link>
					</Button>
					<Button asChild variant="outline">
						<Link href="/dashboard">My Documents</Link>
					</Button>
					<Button asChild variant="outline" className="border-orange-500">
						<Link href="/dashboard/upload">
							<FilePlus2 className="text-orange-600"></FilePlus2>
						</Link>
					</Button>
					<UserButton />
				</div>
			</SignedIn>
		</div>
	);
}

export default Header;

import Documents from "@/components/Documents";
import React from "react";

function Dashboard() {
	return (
		<div className="h-full max-w-7xl mx-auto">
			<h1 className="text-3xl p-5 bg-gray-100 font-extralight text-orange-600">
				My Documents
				<Documents />
			</h1>
		</div>
	);
}

export default Dashboard;

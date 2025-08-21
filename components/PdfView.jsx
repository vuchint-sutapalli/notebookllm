"use client";
import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";
// import "@react-pdf-viewer/core/lib/styles/index.css";
import {
	ChevronLeft,
	ChevronRight,
	Search,
	RotateCcw,
	ZoomIn,
	ZoomOut,
} from "lucide-react";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
	"pdfjs-dist/build/pdf.worker.min.mjs",
	import.meta.url
).toString();

export default function PdfView({ fileUrl }) {
	const [numPages, setNumPages] = useState(null);
	const [pageNumber, setPageNumber] = useState(1);
	const [scale, setScale] = useState(1.2);

	function onDocumentLoadSuccess({ numPages }) {
		setNumPages(numPages);
		setPageNumber(1);
	}

	return (
		<div className="flex flex-col flex-1 h-full bg-gray-950/40 rounded-xl overflow-hidden shadow-lg">
			{/* Toolbar */}
			<div className="flex items-center justify-between px-4 py-2 border-b border-gray-800 bg-gray-900/80 backdrop-blur-md">
				<div className="flex items-center gap-2">
					{/* Prev button */}
					<button
						disabled={pageNumber <= 1}
						onClick={() => setPageNumber((p) => Math.max(1, p - 1))}
						className="p-2 rounded-lg bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white transition disabled:opacity-40 disabled:cursor-not-allowed"
					>
						<ChevronLeft size={18} />
					</button>

					{/* Page info */}
					<span className="text-sm text-gray-300">
						{pageNumber} / {numPages || "…"}
					</span>

					{/* Next button */}
					<button
						disabled={pageNumber >= numPages}
						onClick={() => setPageNumber((p) => Math.min(numPages, p + 1))}
						className="p-2 rounded-lg bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white transition disabled:opacity-40 disabled:cursor-not-allowed"
					>
						<ChevronRight size={18} />
					</button>
				</div>

				{/* Zoom Controls */}
				<div className="flex items-center gap-2">
					<button
						onClick={() => setScale((s) => Math.max(0.5, s - 0.2))}
						className="p-2 rounded-lg bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white transition"
					>
						<ZoomOut size={18} />
					</button>

					<button
						onClick={() => setScale(1.2)}
						className="p-2 rounded-lg bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white transition"
					>
						<RotateCcw size={18} />
					</button>

					<button
						onClick={() => setScale((s) => Math.min(3, s + 0.2))}
						className="p-2 rounded-lg bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white transition"
					>
						<ZoomIn size={18} />
					</button>
				</div>
			</div>

			{/* PDF content */}
			<div className="flex-1 overflow-auto flex justify-center items-start bg-gray-950/50 p-4">
				<Document file={fileUrl} onLoadSuccess={onDocumentLoadSuccess}>
					<Page
						pageNumber={pageNumber}
						renderTextLayer={false}
						renderAnnotationLayer={false}
						scale={scale}
					/>
				</Document>
			</div>
		</div>
	);
}

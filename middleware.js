import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

export default clerkMiddleware(async (auth, req) => {
	if (isProtectedRoute(req)) {
		// If the user is not authenticated, redirect to the sign-in page
		if (!auth.isAuthenticated) {
			await auth.protect();
		}
	}
});

const isProtectedRoute = createRouteMatcher(["/dashboard(.*)"]);

export const config = {
	matcher: [
		// Skip Next.js internals and all static files, unless found in search params
		"/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
		// Always run for API routes
		"/(api|trpc)(.*)",
	],
};

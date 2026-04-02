import { getJsonResume, resolveLocale } from "@/data/resume";

export function GET(request: Request) {
  const locale = resolveLocale(new URL(request.url).searchParams.get("lang"));

  return Response.json(getJsonResume(locale), {
    headers: {
      "cache-control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}

import ImageList from "@/app/components/ImageList";

export const dynamicParams = true;

export function generateMetadata({ params }) {
  const { myParams } = params;
  const term = myParams?.[0] ?? "curated";
  const page = myParams?.[1] ?? "1";

  return {
    title: `Results for ${term.toUpperCase()} - Page ${page}`,
  };
}

export default function SearchResults({ params }) {
  const { myParams } = params;
  const term = myParams?.[0] ?? "curated";
  const page = myParams?.[1] ?? "1";
  return <ImageList term={term} page={page} />;
}

import Footer from "./Footer";
import ImageContainer from "./ImageContainer";
import { notFound } from "next/navigation";

async function getImages(term, page) {
  let url;
  if (term === "" && page) {
    // browsing beyond home
    url = `https://api.pexels.com/v1/curated?page=${page}`;
  } else if (!term) {
    // home
    url = "https://api.pexels.com/v1/curated";
  } else if (!page) {
    // 1st page of search results
    url = `https://api.pexels.com/v1/search?query=${term}`;
  } else {
    // search result beyond 1st page
    url = `https://api.pexels.com/v1/search?query=${term}&page=${page}`;
  }

  const res = await fetch(url, {
    headers: {
      Authorization: process.env.PEXEL_API_KEY,
    },
    next: {
      revalidate: 60,
    },
  });

  if (!res.ok) {
    notFound();
  }

  return res.json();
}

export default async function ImageList({ term = "", page }) {
  const images = await getImages(term, page);
  const { prevPage, nextPage } = getPrevNextPages(images);

  const footerProps = { term, page, nextPage, prevPage };
  console.log("term", term, page);
  if (!images)
    return <h2 className="m-4 text-2xl font-bold">No Images Found</h2>;
  return (
    <>
      <section className="px-1 my-3 grid grid-cols-gallery  auto-rows-[10px]">
        {images.photos.map(photo => (
          <ImageContainer photo={photo} key={photo.id} />
        ))}
      </section>
      <Footer {...footerProps} />
    </>
  );
}

function getPageNumber(url) {
  const { searchParams } = new URL(url);
  return searchParams.get("page");
}

function getPrevNextPages(images) {
  let nextPage = images?.next_page ? getPageNumber(images.next_page) : null;

  const prevPage = images?.prev_page ? getPageNumber(images.prev_page) : null;

  const totalPages =
    images.total_results % images.per_page
      ? Math.ceil(images.total_results / images.per_page)
      : images.total_results / images.per_page + 1;

  if (prevPage && parseInt(prevPage) + 5 < totalPages) {
    nextPage = (parseInt(prevPage) + 5).toString();
  }

  if (nextPage && parseInt(nextPage) >= totalPages) nextPage = null;

  return { prevPage, nextPage };
}

export default function* ({ search, paginate }) {
  //  Get all posts of type article.
  const posts = search.pages("type=posts", "date=desc");

  // Configation for pagination
  const options = {
    // Page 1 is the homepage, set "/" as url
    url: (n) => n === 1 ? "/" : `/page/${n}/`,
    // par page posts
    size: 6,
  };

  // Yield the pages, but the index needs a different layout
  for (const page of paginate(posts, options)) {
    yield {
      title: "ProgramingIsTheFuture",
      description: "ProgramingIsTheFuture - Personal Blog",
      type: "home",
      layout: "layouts/index.njk",
      ...page,
    };
  }
}

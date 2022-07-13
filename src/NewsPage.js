import React, { useState, useEffect } from "react";
import axios from "axios";
import ArticleItem from "./components/ArticleItem";
import ReactPaginate from "react-paginate";
import useDebounce from "./hooks/useDebounce";
import Search from "./components/Search";

const NewsPage = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchInput, setSearchInput] = useState("");

  const handlePageChange = (e) => {
    console.log(e);
    setCurrentPage(e.selected);
  };

  const debounceSearch = useDebounce(searchInput, 500);

  const onDelete = (id) => {
    console.log("in the newspage", id);
    const filteredArtciles = articles.filter(
      (artcile) => artcile.objectID !== id
    );
    console.log("fileterd", filteredArtciles);
    setArticles(filteredArtciles);
  };

  useEffect(() => {
    setLoading(true);

    const fetchNews = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `https://hn.algolia.com/api/v1/search?`,
          {
            params: { page: currentPage, query: debounceSearch },
          }
        );
        const { hits, nbPages } = data;
        setArticles(hits);
        setTotalPages(nbPages);
        setLoading(false);
        console.log(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, [currentPage, debounceSearch]);

  if (loading) {
    return <p>Loading..</p>;
  }
  return (
    <div className="container">
      <h1>Hacker News</h1>
      <Search setSearchInput={setSearchInput} searchInput={searchInput} />
      <div className="news-container">
        {articles.map((article) => {
          return (
            <ArticleItem
              key={article.objectID}
              article={article}
              onDelete={onDelete}
            />
          );
        })}
      </div>
      <ReactPaginate
        nextLabel=">>"
        previousLabel="<<"
        breakLabel="..."
        forcePage={currentPage}
        pageCount={totalPages}
        renderOnZeroPageCount={null}
        onPageChange={handlePageChange}
        className="pagination"
        activeClassName="active-page"
        previousClassName="previous-page"
        nextClassName="next-page"
      />
    </div>
  );
};

export default NewsPage;

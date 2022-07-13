import React from "react";
import Card from "./Card";

const ArticleItem = ({ article, onDelete }) => {
  const onRemoveHandler = (id) => {
    console.log("del id", id);
    onDelete(id);
  };
  return (
    article.title && (
      <Card>
        <h3>{article.title}</h3>

        <p className="article-author">
          {article.points} by {article.author} | {article.num_comments}
        </p>

        <div className="btn-block">
          <button className="btn-more">
            <a href={article.url} target="_blank" rel="noreferrer">
              Read More
            </a>
          </button>
          <button
            className="btn-remove"
            onClick={() => onRemoveHandler(article.objectID)}
          >
            Remove
          </button>
        </div>
      </Card>
    )
  );
};

export default ArticleItem;

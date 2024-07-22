import React from "react";
import "../styles/index.scss";

const ArticleCard = ({ article }: { article: any }) => {
  const imageUrl = article.image || "path/to/default/image.jpg";

  return (
    <div className="article-card">
      <img src={imageUrl} alt={article.title} />
      <h3>{article.title}</h3>
      <p>{article.summary}</p>
    </div>
  );
};

export default ArticleCard;

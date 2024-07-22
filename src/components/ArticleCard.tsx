import "../styles/app.scss";

import Card from "react-bootstrap/Card";

const APP_URL = "https://dummy-rest-api.specbee.site";

const ArticleCard = ({ article }: { article: any }) => {
  const imageUrl = APP_URL + article.image || "path/to/default/image.jpg";

  return (
    <>
      <Card>
        <Card.Img variant="top" src={imageUrl} alt={article.title} />
        <Card.Body>
          <Card.Title
            title={article.title}
            dangerouslySetInnerHTML={{ __html: article.title }}
          ></Card.Title>
          <Card.Text
            dangerouslySetInnerHTML={{ __html: article.body }}
          ></Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};

export default ArticleCard;

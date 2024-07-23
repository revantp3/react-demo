import { useState } from "react";
import "../styles/app.scss";

import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const APP_URL = "https://dummy-rest-api.specbee.site";

const ArticleCard = ({ article }: { article: any }) => {
  const imageUrl = APP_URL + article.image;
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Card onClick={handleShow} className="cursor-pointer">
        <Card.Img variant="top" src={imageUrl} alt={article.title} />
        <Card.Body>
          <Card.Title
            title={article.title}
            dangerouslySetInnerHTML={{ __html: article.title }}
          ></Card.Title>
          <Card.Text
            title={article.body}
            dangerouslySetInnerHTML={{ __html: article.body }}
          ></Card.Text>
        </Card.Body>
      </Card>
      <Modal closeButton show={show} onHide={handleClose}>
        <Modal.Body>
          <Card className="shadow-none border-0">
            <Card.Img
              className="rounded mb-3"
              variant="top"
              src={imageUrl}
              alt={article.title}
            />
            <Card.Text>
              <div className="d-flex justify-content-between">
                <span>
                  Source : <b>{article.source}</b>
                </span>
                <span>
                  Date : <b>{article.date}</b>
                </span>
              </div>
            </Card.Text>
            <Card.Title
              className="mb-4 mt-3"
              title={article.title}
              dangerouslySetInnerHTML={{ __html: article.title }}
            ></Card.Title>
            <Card.Link href={article.url} target="_blank">
              {article.url}
            </Card.Link>
            <Card.Text
              className="mt-3"
              dangerouslySetInnerHTML={{ __html: article.body }}
            ></Card.Text>
          </Card>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-primary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ArticleCard;

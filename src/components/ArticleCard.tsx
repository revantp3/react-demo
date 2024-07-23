import React, { useState } from "react";
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
      <Card onClick={handleShow} className="cursor-pointer" role="button">
        <Card.Img variant="top" src={imageUrl} alt={article.title} />
        <Card.Body>
          <Card.Title
            as="h5"
            dangerouslySetInnerHTML={{ __html: article.title }}
          />
          <div dangerouslySetInnerHTML={{ __html: article.body }} />
        </Card.Body>
      </Card>

      <Modal show={show} onHide={handleClose} data-testid="article-modal">
        <Modal.Body>
          <Card className="shadow-none border-0">
            <Card.Img
              className="rounded mb-3"
              variant="top"
              src={imageUrl}
              alt={article.title}
            />
            <div>
              <div className="d-flex justify-content-between">
                <span>
                  Source: <b>{article.source}</b>
                </span>
                <span>
                  Date: <b>{article.date}</b>
                </span>
              </div>
            </div>
            <Card.Title
              as="h5"
              className="mb-4 mt-3"
              dangerouslySetInnerHTML={{ __html: article.title }}
            />
            <Card.Link href={article.url} target="_blank">
              Read more
            </Card.Link>
            <div
              className="mt-3"
              dangerouslySetInnerHTML={{ __html: article.body }}
            />
          </Card>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="outline-primary"
            onClick={handleClose}
            data-testid="close-button"
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ArticleCard;

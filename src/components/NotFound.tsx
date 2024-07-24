import { Figure, Image } from "react-bootstrap";
import NotFoundImgPath from "../assets/images/404.svg";

const NotFound = () => {
  return (
    <div className="d-flex justify-content-center align-items-center p-4 vh-100">
      <Figure>
        <Image src={NotFoundImgPath} alt="404 not found" fluid className="w-100" />
      </Figure>
    </div>
  );
};

export default NotFound;

import { Spinner } from "react-bootstrap";

const Loader = () => {
  return (
    <>
      <div className="overlay">
        <Spinner animation="border" variant="primary" />
      </div>
    </>
  );
};

export default Loader;

import { Image, Nav } from "react-bootstrap";

import avatarPath from "../assets/images/avatar.jpg";

const SideMenu = () => {
  return (
    <>
      <input type="checkbox" className="d-none" id="sideMenuToggle" />
      <div className="side-menu d-flex flex-column h-100 overflow-hidden gap-4">
        <label
          className="side-menu-toggler close d-sm-none"
          htmlFor="sideMenuToggle"
        >
          <span className="bi bi-x-circle"></span>
        </label>
        <div className="profile-text flex-shrink-0">J</div>
        <Nav className="flex-column gap-3 align-items-center flex-grow-1 overflow-vertical flex-nowrap">
          <Nav.Link href="#">
            <span className="bi bi-house"></span>
            <span className="nav-text">Home</span>
          </Nav.Link>
          <Nav.Link href="#">
            <span className="bi bi-graph-up"></span>
            <span className="nav-text">Analytics</span>
          </Nav.Link>
          <Nav.Link href="#">
            <span className="bi bi-lightbulb"></span>
            <span className="nav-text">Ideas</span>
          </Nav.Link>
          <Nav.Link href="#">
            <span className="bi bi-people"></span>
            <span className="nav-text">Users</span>
          </Nav.Link>
          <Nav.Link href="#">
            <span className="bi bi-file-earmark-text"></span>
            <span className="nav-text">Docs</span>
          </Nav.Link>
          <Nav.Link href="#">
            <span className="bi bi-calendar"></span>
            <span className="nav-text">Calendar</span>
          </Nav.Link>
        </Nav>

        <figure className="avatar mt-auto mb-0 flex-shrink-0">
          <Image src={avatarPath} roundedCircle></Image>
        </figure>
      </div>
    </>
  );
};

export default SideMenu;

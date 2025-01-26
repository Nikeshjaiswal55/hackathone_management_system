import Container from "react-bootstrap/Container";
import Dropdown from "react-bootstrap/Dropdown";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useNavigate } from "react-router-dom";
import { getAccessToken } from "../../utils/getAccessToken";

export const NavigationBar = () => {
  const navigate = useNavigate();
  const isAccessTokenExist = getAccessToken();
  return (
    <Navbar expand="lg" className="bg-dark">
      <Container fluid>
        <Navbar.Brand href="/" className="text-white">
          HackaThone System
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="offcanvasNavbar-expand-lg" />
        <Navbar.Offcanvas
          id={`offcanvasNavbar-expand-lg`}
          aria-labelledby="offcanvasNavbarLabel-expand-lg"
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title
              id="offcanvasNavbarLabel-expand-lg"
              className="text-white"
            >
              hackaathon
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body className="bg-dark text-white">
            <Nav className="justify-content-end flex-grow-1 pe-3 ">
              <Nav.Link
                href="#action1"
                className="text-white d-block d-lg-none"
              >
                View Profile
              </Nav.Link>
              <Nav.Link
                href="#action2"
                className="text-white d-block d-lg-none"
              >
                Logout
              </Nav.Link>
            </Nav>
            {/* <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
            </Form> */}
            {isAccessTokenExist ? (
              <Dropdown className="d-none d-lg-block">
                <Dropdown.Toggle
                  id="dropdown-profile"
                  variant="light"
                  className="p-0 border-0 bg-transparent rounded-circle"
                  style={{ borderRadius: "50%" }}
                >
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoFRQjM-wM_nXMA03AGDXgJK3VeX7vtD3ctA&s" // Replace with your profile image URL
                    alt="Profile"
                    style={{
                      width: "40px",
                      height: "40px",
                      objectFit: "cover",
                      borderRadius: "50%",
                      border: "2px solid #fff", // Optional: Add a border
                    }}
                  />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1">View Profile</Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      localStorage.clear();
                      navigate("/login");
                    }}
                  >
                    Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              ""
            )}
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

import { Badge, Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import SearchBox from "./SearchBox";
const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();
  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <header>
      <Navbar bg="info" variant="light" expand="md" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              <img src={logo} alt="FurryFriends" height={30} /> FurryFriends
            </Navbar.Brand>
          </LinkContainer>
          <a href="https://forms.gle/d6aUQi7RhJMfw4VG9" target="_blank">
            <Navbar.Brand>
              <button
                style={{
                  backgroundColor: "#007bff", // Blue color
                  color: "#fff", // White text color
                  border: "none",
                  borderRadius: "25px", // Rounded button
                  padding: "10px 20px",
                  fontSize: "16px",
                  cursor: "pointer",
                  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Elevation effect
                  transition: "all 0.3s ease-in-out", // Smooth hover effect
                }}
                onMouseOver={(e) =>
                  (e.target.style.boxShadow = "0px 6px 8px rgba(0, 0, 0, 0.2)")
                }
                onMouseOut={(e) =>
                  (e.target.style.boxShadow = "0px 4px 6px rgba(0, 0, 0, 0.1)")
                }
              >
                Apply For Pet Adoption
              </button>
            </Navbar.Brand>
          </a>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <SearchBox />
              <LinkContainer to="/cart">
                <Nav.Link>
                  <FaShoppingCart /> Cart
                  {cartItems.length > 0 && (
                    <Badge pill bg="success" style={{ marginLeft: "5px" }}>
                      {cartItems.reduce((a, c) => a + c.qty, 0)}
                    </Badge>
                  )}
                </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id="username">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link href="/login">
                    <FaUser /> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title="Admin" id="adminmenu">
                  <LinkContainer to="/admin/productlist">
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/userlist">
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/orderlist">
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;

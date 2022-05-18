import { Link } from "react-router-dom";
import { Container, Navbar, Nav } from "react-bootstrap"

export function Navigation() {
    return(
        <>
            <Navbar bg="light">
                <Container>
                    <Nav>
                        <img src="/film_reel.png" height="40px" width="40px" />
                        <Navbar.Brand>Riley's Movie Reviews</Navbar.Brand>
                    </Nav>
                    <Link to="/">Reviews</Link>
                    <Link to="/submit">Submit a review</Link>
                </Container>
            </Navbar>
        </>
    )
  };

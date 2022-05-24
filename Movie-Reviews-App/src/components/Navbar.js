import { Link } from "react-router-dom";
import { Container, Navbar, Nav } from "react-bootstrap"

function NavigationBar() {
    return(
        <>
            <Navbar bg="light">
                <Container>
                    <Nav>
                        <img src="/film_reel.png" height="40px" width="40px" alt="Film reel icon" />
                        <Navbar.Brand>Riley's Movie Reviews</Navbar.Brand>
                    </Nav>
                    <Link to="/">Reviews</Link>
                    <Link to="/add">Submit a review</Link>
                </Container>
            </Navbar>
        </>
    );
};

export default NavigationBar;
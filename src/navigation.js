import { Link } from "react-router-dom";

export function Navigation() {
    return(
        <>
            <span>
            <Link to="/">Reviews</Link>
            <Link to="/submit">Submit a review</Link>
            </span>
        </>
    )
  };

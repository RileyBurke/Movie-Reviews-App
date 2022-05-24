import { FaStar } from "react-icons/fa";

function StarRating(rating) {
    switch (rating){
        case 1:
            return(<FaStar/>);
        case 2:
            return(
                <>
                    <FaStar/><FaStar/>
                </>);
        case 3:
            return(
                <>
                    <FaStar/><FaStar/><FaStar/>
                </>);
        case 4:
            return(
                <>
                    <FaStar/><FaStar/><FaStar/><FaStar/>
                </>);
        case 5:
            return(
                <>
                    <FaStar/><FaStar/><FaStar/><FaStar/><FaStar/>
                </>);
        default:
            return(
                "N/A"
            );
    };
};

export default StarRating;
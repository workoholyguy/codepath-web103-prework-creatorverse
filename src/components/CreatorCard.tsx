import { NavLink } from "react-router";
import "../App.css";
import { FaInstagram } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { FaCircleInfo } from "react-icons/fa6";

type CreatorCardProps = {
    id: number;
    creatorName: string;
    creatorDescription: string;
    creatorChannelLink: string;
    imageSource: string;
    creatorInstagram: string;
    creatorTwitter: string;
    creatorYoutube: string;
};

function CreatorCard({
    id,
    creatorName,
    creatorDescription,
    creatorChannelLink,
    imageSource,
    creatorInstagram,
    creatorTwitter,
    creatorYoutube,
}: CreatorCardProps) {
    return (
        <div className="creator-card-container">
            <Link to={`/ViewCreator/` + id}>
                <img width="340px" src={imageSource} alt="Creator Image" />
            </Link>
            <div className="creator-info">
                <div className="creator-info-left">
                    <h3>{creatorName}</h3>
                </div>
                <div className="creator-info-right">
                    <NavLink
                        to={`/ViewCreator/` + id}
                        className={({ isActive }) => (isActive ? "active" : "")}
                    >
                        <FaCircleInfo />
                    </NavLink>
                    <NavLink
                        to={`/EditCreator/` + id}
                        className={({ isActive }) => (isActive ? "active" : "")}
                    >
                        <FaEdit />
                    </NavLink>
                </div>
            </div>
            <div className="creator-card-socials">
                <Link to={creatorInstagram}>
                    <FaInstagram />
                </Link>
                <Link to={creatorTwitter}>
                    <FaSquareXTwitter />
                </Link>
                <Link to={creatorYoutube}>
                    <FaYoutube />
                </Link>
            </div>
            <p>Description: {creatorDescription}</p>
            <a href={creatorChannelLink} target="blank">
                Channel Link
            </a>
        </div>
    );
}

export default CreatorCard;

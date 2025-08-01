import { NavLink } from 'react-router'
import '../App.css'

type CreatorCardProps = {
    id: number;
    creatorName: string;
    creatorDescription: string;
    creatorChannelLink: string;
    imageSource: string;
};

function CreatorCard({ id, creatorName, creatorDescription, creatorChannelLink, imageSource }: CreatorCardProps) {
    return (
        <div className='creator-card-container'>
            <img width="340px" src={imageSource} alt="Creator Image" />
            <h3>Creator's Name: {creatorName}</h3>
            <NavLink to={`/ViewCreator/` + id} className={({ isActive }) => isActive ? "active" : ""}>
                View Creator Details
            </NavLink>
            <NavLink to={`/EditCreator/` + id} className={({ isActive }) => isActive ? "active" : ""}>
                Edit Creator Info
            </NavLink>
            <p>Description: {creatorDescription}</p>
            <a href={creatorChannelLink} target='blank'>Channel Link</a>
        </div>
    )
}

export default CreatorCard

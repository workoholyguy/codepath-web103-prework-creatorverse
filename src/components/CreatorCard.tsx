import React from 'react'
import { NavLink } from 'react-router'

function CreatorCard(props) {
    return (
        <div>
            <img width="340px" src={props.imageSource} alt="Creator Image" />
            <h3>Creator's Name: {props.creatorName}</h3>
            <NavLink to={`/ViewCreator/` + props.id} className={({ isActive }) => isActive ? "active" : ""}>
                View Creator Details
            </NavLink>
            <NavLink to={`/EditCreator/` + props.id} className={({ isActive }) => isActive ? "active" : ""}>
                Edit Creator Info
            </NavLink>
            <p>Description: {props.creatorDescription}</p>
            <a href={props.creatorChannelLink} target='blank'>Channel Link</a>
        </div>
    )
}

export default CreatorCard

import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { fetchAllCreators } from '../utils/fetchCreators'
import '../App.css'
import { FaInstagram } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { FaCircleInfo } from "react-icons/fa6";


function VewCreator() {
    const { id: param_id } = useParams()
    const [allCreatorsData, setAllCreatorsData] = useState<any[] | null>(null);
    const [currentCreatorData, setCurrentCreatorData] = useState<any | null>(null);

    useEffect(() => {
        const load = async () => {
            const creators = await fetchAllCreators()
            setAllCreatorsData(creators)
        }
        load()
    }, [])

    useEffect(() => {
        if (!allCreatorsData || !param_id) return

        const current = allCreatorsData.find((creator) => creator.id === Number(param_id))
        setCurrentCreatorData(current || null)
        console.log(currentCreatorData);
    }, [allCreatorsData, param_id])


    // const currentCreator = allCreatorsData?.filter((creator) => creator.id === Number(param_id))
    // console.log(currentCreator);
    // console.log(allCreatorsData[0].id);
    // console.log(currentCreatorData);

    if (!currentCreatorData) return <p>Loading...</p>;

    return (
        <div className='view-creator-page'>
            {/* <Navbar /> */}
            {/* <h2>View Creator</h2> */}
            {/* <h3>{param_id}</h3> */}
            <div className="name-edit">
                <h3>{currentCreatorData.name}</h3>

            </div>
            <div className="view-creator-image-description">
                <img width="270px" src={currentCreatorData.image_url} alt="" />
                <h3>{currentCreatorData.description}</h3>
            </div>
            <h3><a href={currentCreatorData.instagram}><FaInstagram /></a></h3>
            <h3><a href={currentCreatorData.twitter}><FaSquareXTwitter /></a></h3>
            <h3><a href={currentCreatorData.youtube}><FaYoutube /></a></h3>
            <a href={currentCreatorData.url} target='blank'><FaCircleInfo /></a>

            <a href={`/EditCreator/${param_id}`}><FaEdit /></a>
        </div>
    )
}

export default VewCreator

import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { fetchAllCreators } from '../utils/fetchCreators'
import '../App.css'


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
        <div>
            {/* <Navbar /> */}
            <h2>View Creator</h2>
            <h3>{param_id}</h3>
            <img width="270px" src={currentCreatorData.image_url} alt="" />
            <h3>{currentCreatorData.name}</h3>
            <h3>{currentCreatorData.description}</h3>
            <h3><a href={currentCreatorData.instagram}>IG</a></h3>
            <h3><a href={currentCreatorData.twitter}>Twitter</a></h3>
            <h3><a href={currentCreatorData.youtube}>Youtube</a></h3>
            <a href={currentCreatorData.url} target='blank'>View Channel</a>
            <a href={`/EditCreator/${param_id}`}>Edit Creator</a>
        </div>
    )
}

export default VewCreator

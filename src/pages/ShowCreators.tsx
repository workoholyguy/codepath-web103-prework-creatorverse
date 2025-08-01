import React from 'react'
import CreatorCard from '../components/CreatorCard'
import { useEffect, useState } from 'react';
import { supabase } from '../client';
import { data } from 'react-router';
import { fetchAllCreators } from '../utils/fetchCreators';
import '../App.css'


function ShowCreators() {

    const [allCreatorsData, setAllCreatorsData] = useState<any[] | null>(null);
    useEffect(() => {
        const load = async () => {
            const creators = await fetchAllCreators()
            setAllCreatorsData(creators)
        }
        load()
    }, [])

    return (
        <>
            <h2>Show Creators Page:</h2>

            <div className='all-creators-container'>


                {
                    allCreatorsData ? (
                        allCreatorsData.map((creator) => (
                            <CreatorCard
                                key={creator.id}
                                id={creator.id}
                                imageSource={creator.image_url}
                                creatorName={creator.name}
                                creatorDescription={creator.description}
                                creatorChannelLink={creator.url}
                            />))
                    ) : (
                        <p>Loading...</p>
                    )
                }



            </div>
        </>
    )
}

export default ShowCreators

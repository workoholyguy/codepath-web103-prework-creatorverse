import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { fetchAllCreators } from '../utils/fetchCreators'
import { supabase } from "../client"


function EditCreator() {
    const { id: param_id } = useParams()
    const [allCreatorsData, setAllCreatorsData] = useState<any[] | null>(null);
    const [currentCreatorData, setCurrentCreatorData] = useState<any | null>(null);
    const [formData, setFormData] = useState(() => {
        return currentCreatorData
            ? {
                name: currentCreatorData.name,
                url: currentCreatorData.url,
                description: currentCreatorData.description,
                image_url: currentCreatorData.image_url
            } : {
                name: '', url: '', description: '', image_url: ''
            }
    })

    useEffect(() => {
        const load = async () => {
            const creators = await fetchAllCreators()
            setAllCreatorsData(creators)
        }
        load()
    }, [param_id])

    // When currentCreatorData is retrieved, prepopulate formData
    useEffect(() => {
        if (!currentCreatorData) return
        setFormData({
            name: currentCreatorData.name,
            url: currentCreatorData.url,
            description: currentCreatorData.description,
            image_url: currentCreatorData.image_url
        })
    }, [currentCreatorData])

    useEffect(() => {
        if (!allCreatorsData || !param_id) return
        const current = allCreatorsData.find((creator) => creator.id === Number(param_id))
        setCurrentCreatorData(current || null)
    }, [allCreatorsData, param_id])


    // const currentCreator = allCreatorsData?.filter((creator) => creator.id === Number(param_id))
    // console.log(currentCreator);
    // console.log(allCreatorsData[0].id);
    // console.log(currentCreatorData);

    if (!currentCreatorData) return <p>Loading...</p>;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const { error } = await supabase.from("creators").update({
            name: formData.name,
            url: formData.url,
            description: formData.description,
            image_url: formData.image_url,
        }).eq('id', Number(param_id));

        if (error) {
            console.error('Update failed:', error.message);
        } else {
            console.log('Update successful!');
        }
    }

    return (
        <div>
            {/* <Navbar /> */}
            <h2>Edit Creator</h2>
            <h3>{param_id}</h3>
            <form onSubmit={handleSubmit}>
                <input
                    name="name"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    type="text"
                    placeholder="Name"
                />
                <input
                    name="url"
                    value={formData.url}
                    onChange={e => setFormData({ ...formData, url: e.target.value })}
                    type="url"
                    placeholder="Channel URL"
                />
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Description"
                />
                <input
                    name="image_url"
                    value={formData.image_url}
                    onChange={e => setFormData({ ...formData, image_url: e.target.value })}
                    type="url"
                    placeholder="Image Url"
                />
                <button type="submit">
                    Save Changes
                </button>
            </form>
        </div>
    )
}

export default EditCreator

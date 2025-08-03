import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchAllCreators } from "../utils/fetchCreators";
import { supabase } from "../client";
import "../App.css";

function EditCreator() {
    const { id: param_id } = useParams();
    const navigate = useNavigate();
    const [allCreatorsData, setAllCreatorsData] = useState<any[] | null>(null);
    const [currentCreatorData, setCurrentCreatorData] = useState<any | null>(
        null
    );
    const [formData, setFormData] = useState(() => {
        return currentCreatorData
            ? {
                name: currentCreatorData.name,
                url: currentCreatorData.url,
                description: currentCreatorData.description,
                image_url: currentCreatorData.image_url,
                instagram: currentCreatorData.instagram,
                twitter: currentCreatorData.twitter,
                youtube: currentCreatorData.youtube,
            }
            : {
                name: "",
                url: "",
                description: "",
                image_url: "",
                instagram: "",
                twitter: "",
                youtube: "",
            };
    });

    useEffect(() => {
        const load = async () => {
            const creators = await fetchAllCreators();
            setAllCreatorsData(creators);
        };
        load();
    }, [param_id]);

    // When currentCreatorData is retrieved, prepopulate formData
    useEffect(() => {
        if (!currentCreatorData) return;
        setFormData({
            name: currentCreatorData.name,
            url: currentCreatorData.url,
            description: currentCreatorData.description,
            image_url: currentCreatorData.image_url,
            instagram: currentCreatorData.instagram,
            twitter: currentCreatorData.twitter,
            youtube: currentCreatorData.youtube,
        });
    }, [currentCreatorData]);

    useEffect(() => {
        if (!allCreatorsData || !param_id) return;
        const current = allCreatorsData.find(
            (creator) => creator.id === Number(param_id)
        );
        setCurrentCreatorData(current || null);
    }, [allCreatorsData, param_id]);

    // const currentCreator = allCreatorsData?.filter((creator) => creator.id === Number(param_id))
    // console.log(currentCreator);
    // console.log(allCreatorsData[0].id);
    // console.log(currentCreatorData);

    if (!currentCreatorData) return <p>Loading...</p>;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const { error } = await supabase
            .from("creators")
            .update({
                name: formData.name,
                url: formData.url,
                description: formData.description,
                image_url: formData.image_url,
                instagram: formData.instagram,
                twitter: formData.twitter,
                youtube: formData.youtube,
            })
            .eq("id", Number(param_id));

        if (error) {
            console.error("Update failed:", error.message);
        } else {
            console.log("Update successful!");
            navigate(`/viewcreator/${param_id}`);
        }
    };

    const handleDelete = async () => {
        const confirmDelete = window.confirm(
            "Are you sureyou want to delete this creator ?"
        );

        if (!confirmDelete) return;

        const { error } = await supabase
            .from("creators")
            .delete()
            .eq("id", Number(param_id));

        if (error) {
            console.error("Delete Failed:", error.message);
        } else {
            console.log("Delete Successful!");
            navigate("/");
        }
    };

    return (
        <div className="container">
            {/* <Navbar /> */}
            <h2>Edit Creator</h2>
            <h3>{param_id}</h3>
            <form onSubmit={handleSubmit} className="edit-creator-form">
                <fieldset>
                    <input
                        name="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        type="text"
                        placeholder="Name"
                    />
                    <input
                        name="url"
                        value={formData.url}
                        onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                        type="url"
                        placeholder="Channel URL"
                    />
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={(e) =>
                            setFormData({ ...formData, description: e.target.value })
                        }
                        placeholder="Description"
                    />
                    <input
                        name="image_url"
                        value={formData.image_url}
                        onChange={(e) =>
                            setFormData({ ...formData, image_url: e.target.value })
                        }
                        type="url"
                        placeholder="Image Url"
                    />
                    <input
                        name="instagram"
                        value={formData.instagram}
                        onChange={(e) =>
                            setFormData({ ...formData, instagram: e.target.value })
                        }
                        type="url"
                        placeholder="Instagram"
                    />
                    <input
                        name="twitter"
                        value={formData.twitter}
                        onChange={(e) =>
                            setFormData({ ...formData, twitter: e.target.value })
                        }
                        type="url"
                        placeholder="Twitter"
                    />
                    <input
                        name="youtube"
                        value={formData.youtube}
                        onChange={(e) =>
                            setFormData({ ...formData, youtube: e.target.value })
                        }
                        type="url"
                        placeholder="Youtube"
                    />
                </fieldset>
                <div className="form-buttons">
                    <button
                        // role="button"
                        // aria-label="danger"
                        type="button"
                        // className="edit-delete-button"
                        onClick={handleDelete}
                        id="edit-delete-button"
                    >
                        Delete Creator
                    </button>
                    <button role="button" type="submit" >
                        Save Changes
                    </button>
                </div>
            </form >
        </div >
    );
}

export default EditCreator;

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { fetchAllCreators } from "../utils/fetchCreators";
import "../App.css";
import { FaInstagram } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import { supabase } from "../client";

function ViewCreator() {
    const { id: param_id } = useParams();
    const navigate = useNavigate();
    const [allCreatorsData, setAllCreatorsData] = useState<any[] | null>(null);
    const [currentCreatorData, setCurrentCreatorData] = useState<any | null>(
        null
    );

    useEffect(() => {
        const load = async () => {
            const creators = await fetchAllCreators();
            setAllCreatorsData(creators);
        };
        load();
    }, []);

    useEffect(() => {
        if (!allCreatorsData || !param_id) return;

        const current = allCreatorsData.find(
            (creator) => creator.id === Number(param_id)
        );
        setCurrentCreatorData(current || null);
        console.log(currentCreatorData);
    }, [allCreatorsData, param_id]);

    // const currentCreator = allCreatorsData?.filter((creator) => creator.id === Number(param_id))
    // console.log(currentCreator);
    // console.log(allCreatorsData[0].id);
    // console.log(currentCreatorData);

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

    if (!currentCreatorData) return <p>Loading...</p>;

    return (
        <div className="view-creator-page">
            {/* <Navbar /> */}
            {/* <h2>View Creator</h2> */}
            {/* <h3>{param_id}</h3> */}
            <div className="name-edit">
                <h3>{currentCreatorData.name}</h3>
            </div>
            <div className="creator-info-container">
                <div className="view-creator-image-description">
                    <img width="270px" src={currentCreatorData.image_url} alt="" />
                    <div className="view-cretor-socials">
                        <h3>
                            <a href={currentCreatorData.instagram}>
                                <FaInstagram />
                            </a>
                        </h3>
                        <h3>
                            <a href={currentCreatorData.twitter}>
                                <FaSquareXTwitter />
                            </a>
                        </h3>
                        <h3>
                            <a href={currentCreatorData.youtube}>
                                <FaYoutube />
                            </a>
                        </h3>
                    </div>
                    <h3>{currentCreatorData.description}</h3>
                </div>
            </div>
            <div className="view-creator-edits">
                <h3>
                    <a
                        // role="button"
                        // aria-label="danger"
                        type="button"
                        // className="edit-delete-button"
                        onClick={handleDelete}
                        id="edit-delete-button"
                    >
                        Delete Creator
                    </a>
                </h3>
                <h3>
                    <a role="button" href={currentCreatorData.url} target="blank">
                        Visit Channel
                    </a>
                </h3>
                <h3>
                    <a role="button" href={`/EditCreator/${param_id}`}>
                        Edit Creator
                    </a>
                </h3>
            </div>
        </div>
    );
}

export default ViewCreator;

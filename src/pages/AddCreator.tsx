import React, { useEffect, useState, useActionState } from "react";
import { supabase } from "../client";
import { useFormStatus } from "react-dom";
import '../App.css'
import { FaInstagram } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { FaCircleInfo } from "react-icons/fa6";


async function addCreatorAction(
    prevState: { error?: string | null },
    formData: FormData
) {
    const name = formData.get("name") as string;
    const url = formData.get("url") as string;
    const description = formData.get("description") as string;
    const image_url = formData.get("image_url") as string;
    const youtube = formData.get("youtube") as string;
    const twitter = formData.get("twitter") as string;
    const instagram = formData.get("instagram") as string;
    const { error } = await supabase.from("creators").insert({
        name,
        url: formData.get("url"),
        description: formData.get("description"),
        image_url: formData.get("image_url"),
        youtube: formData.get("youtube"),
        twitter: formData.get("twitter"),
        instagram: formData.get("instagram"),
    });

    if (!name)
        return {
            error: "Name is required",
            data: { name, url, description, image_url, youtube, twitter, instagram },
        };

    return {
        error: error?.message || null,
        success: error ? null : `${name} Added Succesfully`,
        data: { name, url, description, image_url, youtube, twitter, instagram },
    };
}

function AddCreator() {
    // const addNewCreator = async (event) => {
    //     await supabase
    //         .from("creators")
    //         .insert({
    //             name: "Test",
    //             url: "test",
    //             description: "Test",
    //             image_url: "Test",
    //         })
    //         .select();
    // };
    // addNewCreator()

    const [state, formAction, isPending] = useActionState(addCreatorAction, {
        error: null,
        success: null,
        data: {
            name: "",
            url: "",
            description: "",
            image_url: "",
            youtube: "",
            twitter: "",
            instagram: "",
        },
    });
    const { pending } = useFormStatus();

    return (
        <div className="add-creator-page container">
            {/* <Navbar /> */}
            <h2>Who do you wish to add today ?</h2>
            <form action={formAction} className="new-creator-form form container" role="form" >
                <fieldset>

                    <input
                        name="name"
                        defaultValue={state.data.name}
                        type="text"
                        placeholder="Name"
                    />
                    <input
                        name="url"
                        defaultValue={state.data.url}
                        type="url"
                        placeholder="Channel URL"
                    />
                    <textarea
                        name="description"
                        defaultValue={state.data.description}
                        placeholder="Description"
                    />
                    <input
                        name="image_url"
                        defaultValue={state.data.image_url}
                        type="url"
                        placeholder="Image Url"
                    />
                    <input
                        name="youtube"
                        defaultValue={state.data.youtube}
                        type="url"
                        placeholder="Youtube"
                    />
                    <input
                        name="twitter"
                        defaultValue={state.data.twitter}
                        type="url"
                        placeholder="Twitter"
                    />
                    <input
                        name="instagram"
                        defaultValue={state.data.instagram}
                        type="url"
                        placeholder="Instagram"
                    />
                </fieldset>

                <button type="submit" disabled={pending}>
                    {isPending || pending ? "Adding..." : "Add Creator"}
                </button>
                {state?.error && <p>{state.error}</p>}
                {state?.success && <p style={{ color: "green" }}>{state.success}</p>}
            </form>
        </div>
    );
}

export default AddCreator;

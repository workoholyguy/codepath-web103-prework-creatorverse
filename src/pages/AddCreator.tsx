import React, { useEffect, useState, useActionState } from "react";
import { supabase } from "../client";
import { useFormStatus } from "react-dom";

async function addCreatorAction(
    prevState: { error?: string | null },
    formData: FormData
) {
    const name = formData.get("name") as string;
    const url = formData.get("url") as string;
    const description = formData.get("description") as string;
    const image_url = formData.get("image_url") as string;
    const { error } = await supabase.from("creators").insert({
        name,
        url: formData.get("url"),
        description: formData.get("description"),
        image_url: formData.get("image_url"),
    });

    if (!name)
        return {
            error: "Name is required",
            data: { name, url, description, image_url },
        };

    return {
        error: error?.message || null,
        success: error ? null : `${name} Added Succesfully`,
        data: { name, url, description, image_url },
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
        },
    });
    const { pending } = useFormStatus();

    return (
        <div>
            {/* <Navbar /> */}
            <h2>Add Creator:</h2>
            <form action={formAction}>
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

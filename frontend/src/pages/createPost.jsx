import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import SiteHeader from "../components/siteHeader";
import { useSocial } from "../context/useSocial";

import "../styles/account.css";

function CreatePost() {
    const navigate = useNavigate();
    const { createPost } = useSocial();
    const [image, setImage] = useState("");
    const [caption, setCaption] = useState("");
    const [error, setError] = useState("");

    function handleSubmit(event) {
        event.preventDefault();
        const cleanCaption = caption.trim();

        if (!image.trim() || !cleanCaption) {
            setError("Add an image URL and a caption to publish.");
            return;
        }

        createPost({ image: image.trim(), caption: cleanCaption });
        navigate("/profile");
    }

    return (
        <div className="account-page">
            <SiteHeader />

            <main className="account-content">
                <header className="account-page-header">
                    <p>SHARE A MOMENT</p>
                    <h1>Create post</h1>
                </header>

                <form className="account-form" onSubmit={handleSubmit}>
                    <label>
                        Image URL
                        <input
                            type="url"
                            value={image}
                            onChange={(event) => setImage(event.target.value)}
                            placeholder="https://example.com/image.jpg"
                            required
                        />
                    </label>

                    {image && (
                        <div className="post-preview">
                            <img src={image} alt="Post preview" />
                        </div>
                    )}

                    <label>
                        Caption
                        <textarea
                            value={caption}
                            onChange={(event) => setCaption(event.target.value)}
                            maxLength={280}
                            placeholder="What would you like to share?"
                            required
                        />
                        <span className="field-counter">
                            {caption.length}/280
                        </span>
                    </label>

                    {error && (
                        <p className="account-error" role="alert">
                            {error}
                        </p>
                    )}

                    <div className="account-form-actions">
                        <Link
                            to="/profile"
                            className="account-secondary-button"
                        >
                            Cancel
                        </Link>

                        <button
                            type="submit"
                            className="account-primary-button"
                        >
                            Publish post
                        </button>
                    </div>
                </form>
            </main>
        </div>
    );
}

export default CreatePost;
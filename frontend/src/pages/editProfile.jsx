import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Navigation from "../components/navigation";
import { useSocial } from "../context/useSocial";

import "../styles/account.css";

function EditProfile() {
    const navigate = useNavigate();
    const { profile, updateProfile, deleteAccount } = useSocial();
    const [formData, setFormData] = useState({
        name: profile.name,
        username: profile.username,
        bio: profile.bio,
        profilePicture: profile.profilePicture,
    });
    const [error, setError] = useState("");

    function handleChange(event) {
        const { name, value } = event.target;
        setFormData((current) => ({ ...current, [name]: value }));
        setError("");
    }

    function handleSubmit(event) {
        event.preventDefault();
        const username = formData.username.trim().replace(/^@/, "");
        const name = formData.name.trim();

        if (!username || !name) {
            setError("Name and username are required.");
            return;
        }

        updateProfile({
            ...profile,
            ...formData,
            name,
            username,
            bio: formData.bio.trim(),
            profilePicture: formData.profilePicture.trim(),
        });
        navigate("/profile");
    }

    function handleDeleteAccount() {
        if (!window.confirm("Delete this account and its posts from this browser? This cannot be undone.")) {
            return;
        }

        deleteAccount();
        navigate("/login", { replace: true });
    }

    return (
        <div className="account-page">
            <Navigation />
            <main className="account-content">
                <header className="account-page-header">
                    <p>YOUR ACCOUNT</p>
                    <h1>Edit profile</h1>
                </header>

                <form className="account-form" onSubmit={handleSubmit}>
                    <label>
                        Display name
                        <input
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            maxLength={60}
                            required
                        />
                    </label>
                    <label>
                        Username
                        <input
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            maxLength={30}
                            required
                        />
                    </label>
                    <label>
                        Profile photo URL
                        <input
                            name="profilePicture"
                            type="url"
                            value={formData.profilePicture}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Bio
                        <textarea
                            name="bio"
                            value={formData.bio}
                            onChange={handleChange}
                            maxLength={160}
                        />
                        <span className="field-counter">{formData.bio.length}/160</span>
                    </label>

                    {error && <p className="account-error" role="alert">{error}</p>}

                    <div className="account-form-actions">
                        <Link to="/profile" className="account-secondary-button">
                            Cancel
                        </Link>
                        <button type="submit" className="account-primary-button">
                            Save changes
                        </button>
                    </div>
                </form>

                <section className="account-danger-zone">
                    <div>
                        <h2>Delete account</h2>
                        <p>Remove this profile and its posts saved in this browser.</p>
                    </div>
                    <button type="button" onClick={handleDeleteAccount}>
                        Delete account
                    </button>
                </section>
            </main>
        </div>
    );
}

export default EditProfile;
import { useState } from "react";
import { Link } from "react-router-dom";

import SiteHeader from "../components/siteHeader";
import {
    SearchIcon,
    UserIcon,
} from "../components/icon";

import { useSocial } from "../context/useSocial";

import "../styles/explore.css";

function Explore() {
    const [search, setSearch] = useState("");
    const { posts } = useSocial();
    const publicPosts = posts.filter((post) => !post.hidden && !post.locked);

    /*
     * Get unique usernames from the posts.
     *
     * This means we don't need a separate users.js file yet.
     */
    const users = [
        ...new Set(
            publicPosts.map((post) => post.username)
        ),
    ];

    const filteredUsers = users.filter((username) =>
        username
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    return (
        <main className="explore-page">
            <SiteHeader />

            {/* ====================== SEARCH ====================== */}
            <section className="explore-content">
                <div className="explore-search">
                    <SearchIcon />

                    <input
                        type="text"
                        placeholder="Search"
                        value={search}
                        onChange={(event) =>
                            setSearch(event.target.value)
                        }
                    />
                </div>

                {/* ====================== RESULTS ====================== */}
                {search.trim() !== "" ? (
                    <section className="explore-results">
                        {filteredUsers.length > 0 ? (

                            filteredUsers.map((username) => (
                                <Link
                                    to={`/profile/${username}`}
                                    className="explore-user"
                                    key={username}
                                >
                                    <div className="explore-user-avatar">
                                        <UserIcon />
                                    </div>

                                    <div className="explore-user-info">
                                        <strong>
                                            {username}
                                        </strong>

                                        <span>
                                            Astrea user •{" "}
                                            {publicPosts.filter(
                                                (post) =>
                                                    post.username === username
                                            ).length}{" "}
                                            posts
                                        </span>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <div className="explore-no-results">
                                <h2>
                                    No results
                                </h2>

                                <p>
                                    No users found for "{search}".
                                </p>
                            </div>
                        )}
                    </section>
                ) : (
                    /* ====================== POST GRID ====================== */
                    <section className="explore-grid">
                        {publicPosts.map((post) => (
                            <Link
                                to={`/post/${post.id}`}
                                className="explore-grid-item"
                                key={post.id}
                            >
                                <img
                                    src={post.image}
                                    alt={`Post by ${post.username}`}
                                />
                            </Link>
                        ))}
                    </section>
                )}
            </section>
        </main>
    );
}

export default Explore;
import { useEffect, useState } from "react";

import { posts as seedPosts } from "../data/posts";
import { SocialContext } from "./socialContextValue";

const STORAGE_KEY = "astrea-social-state";
const DEFAULT_PROFILE = {
    username: "motheom",
    name: "Motheo Morena",
    profilePicture:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=600&q=90",
    following: 600,
    followers: "23.3k",
    likes: "800k",
    bio: "Exploring the world, one postcard at a time.",
};

const DEFAULT_STATE = {
    profile: DEFAULT_PROFILE,
    posts: seedPosts.map((post) => ({
        ...post,
        hidden: false,
        locked: false,
    })),
    likedPostIds: [],
    bookmarkedPostIds: [],
    resharedPostIds: [],
};

function loadState() {
    try {
        const savedState = JSON.parse(localStorage.getItem(STORAGE_KEY));
        if (savedState?.profile && Array.isArray(savedState.posts)) {
            return { ...DEFAULT_STATE, ...savedState };
        }
    } catch {
        localStorage.removeItem(STORAGE_KEY);
    }

    return DEFAULT_STATE;
}

export function SocialProvider({ children }) {
    const [socialState, setSocialState] = useState(loadState);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(socialState));
    }, [socialState]);

    function updateProfile(profile) {
        setSocialState((current) => ({
            ...current,
            profile,
            posts: current.posts.map((post) =>
                post.username === current.profile.username
                    ? { ...post, username: profile.username }
                    : post
            ),
        }));
    }

    function createPost({ image, caption }) {
        setSocialState((current) => ({
            ...current,
            posts: [
                {
                    id: Date.now(),
                    username: current.profile.username,
                    image,
                    caption,
                    likes: "0",
                    comments: 0,
                    views: "0",
                    time: new Date().toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                    }),
                    date: new Date().toLocaleDateString(),
                    hidden: false,
                    locked: false,
                },
                ...current.posts,
            ],
        }));
    }

    function deletePost(postId) {
        setSocialState((current) => ({
            ...current,
            posts: current.posts.filter((post) => post.id !== postId),
            likedPostIds: current.likedPostIds.filter((id) => id !== postId),
            bookmarkedPostIds: current.bookmarkedPostIds.filter((id) => id !== postId),
            resharedPostIds: current.resharedPostIds.filter((id) => id !== postId),
        }));
    }

    function togglePostState(key, postId) {
        setSocialState((current) => {
            const selectedIds = current[key];
            return {
                ...current,
                [key]: selectedIds.includes(postId)
                    ? selectedIds.filter((id) => id !== postId)
                    : [...selectedIds, postId],
            };
        });
    }

    function togglePostVisibility(postId, property) {
        setSocialState((current) => ({
            ...current,
            posts: current.posts.map((post) =>
                post.id === postId
                    ? { ...post, [property]: !post[property] }
                    : post
            ),
        }));
    }

    function deleteAccount() {
        const username = socialState.profile.username;
        setSocialState((current) => ({
            ...current,
            profile: { ...DEFAULT_PROFILE, username: "deleted" },
            posts: current.posts.filter((post) => post.username !== username),
            likedPostIds: [],
            bookmarkedPostIds: [],
            resharedPostIds: [],
        }));
    }

    const value = {
        ...socialState,
        isLiked: (postId) => socialState.likedPostIds.includes(postId),
        isBookmarked: (postId) => socialState.bookmarkedPostIds.includes(postId),
        isReshared: (postId) => socialState.resharedPostIds.includes(postId),
        toggleLike: (postId) => togglePostState("likedPostIds", postId),
        toggleBookmark: (postId) => togglePostState("bookmarkedPostIds", postId),
        toggleReshare: (postId) => togglePostState("resharedPostIds", postId),
        createPost,
        updateProfile,
        deletePost,
        togglePostVisibility,
        deleteAccount,
    };

    return (
        <SocialContext.Provider value={value}>
            {children}
        </SocialContext.Provider>
    );
}


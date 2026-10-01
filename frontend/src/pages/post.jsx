import { Link, useParams } from "react-router-dom";
import { useState } from "react";

import {
    LikeIcon,
    CommentIcon,
    ReshareIcon,
    BookmarkIcon,
    UserIcon,
} from "../components/icon";

import { comments } from "../data/comments";

import { useFollowing } from "../context/followingContext";
import { useSocial } from "../context/useSocial";

import ProfilePicture from "../components/profilePicture";
import Navigation from "../components/navigation";

import "../styles/post.css";


function Post() {
    const { postId } = useParams();
    const { isFollowing, toggleFollow } = useFollowing();
    const {
        posts,
        profile,
        isLiked,
        isReshared,
        isBookmarked,
        toggleLike,
        toggleReshare,
        toggleBookmark,
    } = useSocial();

    const post = posts.find(
        (post) => post.id === Number(postId)
    );

    const [postComments, setPostComments] = useState(() =>
        comments.filter((comment) => comment.postId === Number(postId))
    );
    const [replyOpen, setReplyOpen] = useState(false);
    const [replyText, setReplyText] = useState("");

    const following = isFollowing(post?.username);
    const liked = post ? isLiked(post.id) : false;
    const reshared = post ? isReshared(post.id) : false;
    const bookmarked = post ? isBookmarked(post.id) : false;

    function handleReplySubmit(event) {
        event.preventDefault();

        const text = replyText.trim();
        if (!text) return;

        setPostComments((currentComments) => [
            ...currentComments,
            {
                id: Date.now(),
                postId: Number(postId),
                username: "you",
                handle: "@you",
                time: "now",
                text,
            },
        ]);
        setReplyText("");
        setReplyOpen(false);
    }

    if (!post) {
        return (
            <main className="post-page">
                <h1>Post not found</h1>
            </main>
        );
    }

    if ((post.hidden || post.locked) && post.username !== profile.username) {
        return (
            <main className="post-page">
                <h1>This post is hidden or locked.</h1>
                <Link to="/home">Back to feed</Link>
            </main>
        );
    }

    return (
        <main className="post-page">
            <Navigation />
            {/* ====================== POST ====================== */}
            <section className="single-post">
                <header className="single-post-header">
                    <div className="single-post-user">
                        <ProfilePicture
                            username={post.username}
                            className="post-avatar"
                        />
                        
                        <div>
                            <strong>
                                {post.username}
                            </strong>

                            <span>
                                @{post.username}
                            </span>
                        </div>
                    </div>

                    <button
                        className="follow-button"
                        type="button"
                        onClick={() => toggleFollow(post.username)}
                    >
                        {following ? "Following" : "Follow"}
                    </button>
                </header>


                <div className="single-post-image">
                    <img
                        src={post.image}
                        alt={`Post by ${post.username}`}
                    />
                </div>


                <div className="post-meta">
                    <span>
                        {post.time} • {post.date}
                    </span>

                    <strong>
                        • {post.views} views
                    </strong>
                </div>


                <div className="single-post-actions">
                    <button type="button">
                        <CommentIcon />
                        <span>{postComments.length}</span>
                    </button>

                    <button
                        type="button"
                        aria-label={reshared ? "Remove reshare" : "Reshare post"}
                        aria-pressed={reshared}
                        className={reshared ? "active" : ""}
                        onClick={() => toggleReshare(post.id)}
                    >
                        <ReshareIcon />
                        <span>2</span>
                    </button>

                    <button
                        type="button"
                        aria-label={liked ? "Unlike post" : "Like post"}
                        aria-pressed={liked}
                        className={liked ? "active" : ""}
                        onClick={() => toggleLike(post.id)}
                    >
                        <LikeIcon />
                        <span>{post.likes}</span>
                    </button>

                    <button
                        type="button"
                        aria-label={bookmarked ? "Remove bookmark" : "Bookmark post"}
                        aria-pressed={bookmarked}
                        className={
                            bookmarked ? "active" : ""
                        }
                        onClick={() => toggleBookmark(post.id)}
                    >
                        <BookmarkIcon />
                    </button>

                    <button
                        type="button"
                        className="reply-button"
                        onClick={() => setReplyOpen(true)}
                    >
                        Reply...
                    </button>

                </div>


                <div className="single-post-caption">
                    <strong>{post.username}</strong>{" "}
                    {post.caption}
                </div>
            </section>


            {/* ====================== COMMENTS ====================== */}
            <section className="comments">
                {postComments.map((comment) => (
                    <article
                        className="comment"
                        key={comment.id}
                    >
                        <div className="comment-avatar">
                            <UserIcon />
                        </div>

                        <div className="comment-content">
                            <div className="comment-user">
                                <strong>
                                    {comment.username}
                                </strong>

                                <span>
                                    {comment.handle} •{" "}
                                    {comment.time}
                                </span>
                            </div>

                            <p>
                                {comment.text}
                            </p>
                        </div>

                        <div className="comment-actions">
                            <button type="button">
                                Reply
                            </button>

                            <button type="button">
                                <LikeIcon />
                            </button>
                        </div>
                    </article>
                ))}
            </section>

            {replyOpen && (
                <div
                    className="reply-backdrop"
                    onClick={() => setReplyOpen(false)}
                >
                    <section
                        className="reply-dialog"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="reply-dialog-title"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <div className="reply-dialog-header">
                            <h2 id="reply-dialog-title">Reply to post</h2>
                            <button
                                type="button"
                                aria-label="Close reply form"
                                onClick={() => setReplyOpen(false)}
                            >
                                &times;
                            </button>
                        </div>
                        <p className="reply-context">
                            Replying to @{post.username}
                        </p>
                        <form onSubmit={handleReplySubmit}>
                            <textarea
                                autoFocus
                                aria-label="Your reply"
                                placeholder="Write a reply..."
                                maxLength={500}
                                value={replyText}
                                onChange={(event) => setReplyText(event.target.value)}
                            />
                            <div className="reply-dialog-footer">
                                <span>{replyText.length}/500</span>
                                <button type="submit" disabled={!replyText.trim()}>
                                    Reply
                                </button>
                            </div>
                        </form>
                    </section>
                </div>
            )}
        </main>
    );
}

export default Post;
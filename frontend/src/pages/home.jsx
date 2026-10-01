import Navigation from "../components/navigation";
import PostCard from "../components/postCard";
import { NotificationIcon } from "../components/icon";

import { useSocial } from "../context/useSocial";

import "../styles/home.css";

function Home() {
    const { posts } = useSocial();
    const publicPosts = posts.filter((post) => !post.hidden && !post.locked);

    return (
        <main className="home">
            <header className="home-header">
                <h1>astrea</h1>

                <Navigation />
                <button
                    className="notification-button"
                    type="button"
                >
                    <NotificationIcon />
                </button>
            </header>

            <section className="feed">
                {publicPosts.map((post) => (
                    <PostCard
                        key={post.id}
                        post={post}
                    />
                ))}
            </section>
        </main>
    );
}

export default Home;
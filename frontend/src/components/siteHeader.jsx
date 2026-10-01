import { Link } from "react-router-dom";

import { NotificationIcon } from "./icon";
import Navigation from "./navigation";

import "../styles/siteHeader.css";

function SiteHeader() {
    return (
        <header className="site-header">
            <Link to="/home" className="site-brand" aria-label="Astrea home">
                astrea
            </Link>

            <Navigation />

            <button
                className="site-notification-button"
                type="button"
                aria-label="Notifications"
            >
                <NotificationIcon />
            </button>
        </header>
    );
}

export default SiteHeader;
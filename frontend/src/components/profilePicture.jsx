import { UserIcon } from "./icon";
import { users } from "../data/users";
import { useSocial } from "../context/useSocial";

function ProfilePicture({ username, className = "" }) {
    const { profile } = useSocial();
    const user = username === profile.username
        ? profile
        : users.find((user) => user.username === username);

    if (!user?.profilePicture) {
        return (
            <div className={className}>
                <UserIcon />
            </div>
        );
    }

    return (
        <img
            src={user.profilePicture}
            alt={`${username}'s profile`}
            className={className}
        />
    );
}

export default ProfilePicture;
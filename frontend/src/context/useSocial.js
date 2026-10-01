import { useContext } from "react";

import { SocialContext } from "./socialContextValue";

export function useSocial() {
    const context = useContext(SocialContext);
    if (!context) {
        throw new Error("useSocial must be used within a SocialProvider");
    }
    return context;
}
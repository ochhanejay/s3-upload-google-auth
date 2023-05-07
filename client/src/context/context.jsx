import React, { createContext, useState, useEffect } from "react";

export const authContext = createContext();

export default function CknContext({ children }) {
    const [navbarShow, setNavbarShow] = useState(false);
    const [userName, setUserName] = useState("");
    const [profileImage, setProfileImage] = useState();




    return (
        <authContext.Provider
            value={{
                navbarShow, setNavbarShow,
                userName, setUserName,
                profileImage, setProfileImage
            }}
        >
            {children}
        </authContext.Provider>
    );
}

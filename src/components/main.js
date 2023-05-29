import * as React from "react";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import auth from "../services/firebase";

// CSS
import "../css/App.css";

// Components
import Sidebar from "./frontend/Sidebar";
import Workspace from "./frontend/Workspace";

export default function Main() {
    const navigate = useNavigate();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
        if (user)
            if (user.emailVerified === false) {
                console.log("not verified", user.emailVerified);
                navigate("/verify");
            }
        });
    }, []);


    return (
        <div className="App">
            {/* <Logout />; */}
            <Sidebar />
            <Workspace />

            {/* <TextboxList /> */}
            {/* {TextboxData.map((value, key) => {
                return (
                    <Textbox>{value.title}</Textbox>
                )
            })} */}

            {/* <Sidebar /> */}
        </div>
    );
}

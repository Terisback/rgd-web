import React from "react";

import { AppContext } from "../../libs/context";

import { Logo, Menu } from "./components";

import { useRouter } from "next/router";
import { useCookies } from "react-cookie";

import API from "../../libs/api";

export default function Sidebar() {
    const context = React.useContext(AppContext);
    const router = useRouter();
    const [cookie, setCookie] = useCookies(["token"]);
    if (cookie.token) {
        API.token = cookie.token;
        if (context.User?.id === "") {
            API.getUser().then((users) => context.setUser(users[0]));
        }
    }

    if (router.query.token) {
        setCookie("token", router.query.token);
        window.location.href = window.location.origin;
    }

    return (
        <div className="Sidebar">
            <Logo />
            <Menu />
        </div>
    );
}

import React from "react";

import { AppContext } from "../../libs/context";

import { Logo, Menu } from "./components";

import { useRouter } from "next/router";
import { useCookies } from "react-cookie";

import API from "../../libs/api";

export default function Sidebar() {
    const context = React.useContext(AppContext);
    const router = useRouter();
    const [cookie, setCookie, removeCookie] = useCookies(["token"]);

    if (router.query.token) {
        setCookie("token", router.query.token);
        window.location.href = window.location.origin;
    }

    if (cookie.token) {
        API.token = cookie.token;
        if (context.User?.id === "") {
            API.getUser().then((users) => {
                if ("error" in users) {
                    removeCookie("token");
                    window.location.href = window.location.origin;
                    return;
                }
                context.setUser(users);
            });
        }
    }

    return (
        <div className="Sidebar">
            <Logo />
            <Menu />
        </div>
    );
}

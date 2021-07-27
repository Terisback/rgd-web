import style from "./style.module.css";
import React from "react";

import Link from "next/link";
import { useCookies } from "react-cookie";

import { AppContext } from "../../../../libs/context";
import Loading from "../../../loading";
import UserAvatar from "../../../useful/UserAvatar";

const discordAuth =
    "https://discord.com/api/oauth2/authorize?client_id=854466540673433632&redirect_uri=https%3A%2F%2Frgd.chat%2F&response_type=code&scope=identify%20guilds";

export default function Logo() {
    const [cookie] = useCookies(["token"]);
    const context = React.useContext(AppContext);
    const profileUrl = "/user/" + context.User?.id;
    const [state, setState] = React.useState("failed");
    const backtotopButton = React.useRef(null);
    if (typeof window !== "undefined") {
        window.onscroll = () => {
            if (
                document.body.scrollTop > 64 ||
                document.documentElement.scrollTop > 64
            ) {
                if (backtotopButton) {
                    ///@ts-ignore
                    backtotopButton.current.style.display = "block";
                }
            } else {
                if (backtotopButton) {
                    ///@ts-ignore
                    backtotopButton.current.style.display = "none";
                }
            }
        };
    }

    React.useEffect(() => {
        if (!context.User?.id) {
            if (cookie.token) {
                return setState("loading");
            }
            return setState("failed");
        }
        setState("loaded");
    }, [context.User?.id]);
    return (
        <div className={style.Logo}>
            <img src="/icons/logo.svg" className={style.LogoImg} width="72em" />
            {state == "loaded" ? (
                <div className={style.DiscordProfile}>
                    <Link href={profileUrl}>
                        <a
                            href={profileUrl}
                            className={style.DiscordProfileContent}
                        >
                            <UserAvatar src={context.User.avatar} />
                            <div className={style.DiscordProfileNick}>
                                <div>{context.User.username}</div>
                                <div>#{context.User.tag}</div>
                            </div>
                        </a>
                    </Link>
                </div>
            ) : state === "loading" ? (
                <div className={style.DiscordProfile}>
                    <div className={style.DiscordProfileContent}>
                        <Loading />
                    </div>
                </div>
            ) : (
                <div className={style.DiscordButton}>
                    <a
                        className={style.DiscordButtonContent}
                        href={discordAuth}
                    >
                        <img src="/icons/icon_0.svg" width="32em" />
                        Войти
                    </a>
                </div>
            )}
            <button
                ref={backtotopButton}
                className={style.backToTop}
                onClick={() => {
                    if (typeof window === "undefined") return;
                    window.scrollTo({
                        top: 0,
                        behavior: "smooth",
                    });
                }}
            >
                <img src={"/icons/icon_up.svg"} width="64em" />
            </button>
        </div>
    );
}

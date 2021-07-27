import React from "react";
import { useRouter } from "next/router";
import API from "../libs/api";
import { AppContext } from "../libs/context";
import { useCookies } from "react-cookie";

export default function Home() {
    const router = useRouter();
    const context = React.useContext(AppContext);
    const [cookie, setCookie, removeCookie] = useCookies(["token"]);

    React.useEffect(() => {
        (async () => {
            if (router.asPath.startsWith("/?code=")) {
                const code = router.asPath.replace("/?code=", "");
                const user = await API.login(code);
                if (user) {
                    setCookie("token", user.user_token);
                    window.location.href = window.location.origin;
                }
            }
        })();
    }, []);

    return (
        <section>
            <p>
                Поздравляем! Вы попали на официальный сайт дискорд сервера для
                геймдевов. Если вы — крутой прогер, моделлер, дизигнер,
                художник, аниматор или просто <s>задрот</s> хороший специалист —
                значит, вы пришли по адресу и можете принять участие в жизни
                лампового комьюнити, которое точно оценит ваш скилл.
            </p>
            <p>Присоединится можно нажатием на впечатляюще широкую кнопочку:</p>
            <a
                href="https://discord.gg/5kZhhWD"
                style={{
                    textAlign: "center",
                    backgroundImage:
                        "linear-gradient(97.5deg, #738BD7 calc(50% + 25px), #697EC4 calc(50% + 25px))",
                    lineHeight: 0,
                    display: "block",
                }}
            >
                <img
                    src="https://discordapp.com/api/guilds/504617984594018325/widget.png?style=banner2"
                    alt="Та самая впечатляюще широкая кнопка, на которую нужно нажать, чтобы присоединится к серверу"
                />
            </a>
            <p>
                <b>Примечание:</b> на данный момент сайт находится на стадии
                разработки, но на сервере всё есть.
            </p>
            <p>
                Так же есть <s>никому не нужная</s> документация к API, не знаю
                зачем, но вдруг пригадится{" "}
                <a href="https://api.rgd.chat/docs">
                    <strong>тык</strong>
                </a>
            </p>
        </section>
    );
    /*
    <iframe
    src="https://discord.com/widget?id=504617984594018325&theme=dark"
    width="350" height="500"
    allowtransparency="true" frameBorder="0"
    sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"></iframe>
  */
}

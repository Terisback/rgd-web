import React from "react";

import { GetServerSideProps, InferGetServerSidePropsType } from "next";

import Head from "next/head";

import style from "../../styles/jam.module.css";
import projectStyle from "../../styles/projects.module.css";

import { IProject, IUser, JamData } from "../../libs/api";
import API from "../../libs/api";
import FlexCenter from "../../Components/useful/FlexCenter";
import UserAvatar from "../../Components/useful/UserAvatar";

function numberFormat(num: number): String {
    return String(num).replace(/(.)(?=(\d{3})+$)/g, "$1 ");
}

interface GameProps {
    game: IProject;
    pos: number;
}

const Game = ({ game, pos }: GameProps) => {
    return (
        <div className={projectStyle.project}>
            <img src={game.preview} />
            <div className={projectStyle.projectBody}>
                <h3>{game.project}</h3>
                <div>{game.description.slice(0, 70) + "..."}</div>
            </div>
            <div className={projectStyle.projectFooter}>
                {game.user_id.map((author: IUser, index: number) => (
                    <div key={"author_" + author.id + "_" + index}>
                        <UserAvatar src={author.avatar} size={16} />
                        <a href={"/user/" + author.id}>{author.username}</a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default function JamByID({
    jam,
    users,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
        <FlexCenter>
            <Head>
                <title>{jam?.title}</title>
            </Head>
            <div>
                <div className={style.title}>
                    <h1>{jam?.title}</h1>
                    <img src={jam?.preview} />
                </div>
                <div className={style.main}>
                    <div>
                        <h3>Дата проведения</h3>
                        <div className="desc">{jam.date}</div>
                    </div>
                    <div>
                        <h3>Призовой фонд</h3>
                        <div className="desc">{jam.fond}</div>
                    </div>
                    <div>
                        <h3>Описание</h3>
                        <div className="desc">{jam.description}</div>
                    </div>
                    <div className={style.gamesContainer}>
                        <h2>Игры</h2>
                        <div>
                            {jam.projects.map(
                                (game: IProject, index: number) => (
                                    <Game
                                        game={game}
                                        key={"game_" + game.id}
                                        pos={index}
                                    />
                                )
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </FlexCenter>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const jam: JamData = await API.getJam(Number(context.query.id));
    for (let i = 0; i < jam.projects.length; i++) {
        ///@ts-ignore
        jam.projects[i] = await API.getProject(jam.projects[i]);
        for (let k = 0; k < jam.projects[i].user_id.length; k++) {
            let user: string = jam.projects[i].user_id[k].toString();
            if (!user.startsWith("-1")) {
                const data: Array<IUser> = await API.getUser(user);
                jam.projects[i].user_id[k] = data[0];
            } else {
                jam.projects[i].user_id[k] = {
                    id: user,
                    username: `Нужно уточнить( ${user.replace("-1-", "")} )`,
                    avatar: "https://api.rgd.chat/file/not-find.png",
                } as IUser;
            }
        }
    }
    return {
        props: { jam },
    };
};

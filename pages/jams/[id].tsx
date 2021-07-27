import React from "react";

import { GetServerSideProps, InferGetServerSidePropsType } from "next";

import Head from "next/head";

import style from "../../styles/jam.module.css";
import projectStyle from "../../styles/projects.module.css";

import { IProject, IUser, IJam } from "../../libs/api";
import API from "../../libs/api";
import FlexCenter from "../../Components/useful/FlexCenter";
import UserAvatar from "../../Components/useful/UserAvatar";

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
    jamData,
    users,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const jam: IJam = jamData;
    if (typeof jam?._id === "undefined") return null;
    return (
        <FlexCenter>
            <Head>
                <title>{jam.name}</title>
            </Head>
            <>
                <div className={style.title}>
                    <h1>{jam.name}</h1>
                    <img src={jam.picture} />
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
                    <div>
                        <h3>Стрим</h3>
                        <div className="desk">
                            <a href={jam.stream} className={style.youtube}>
                                YouTube
                            </a>
                        </div>
                    </div>
                    <div className={style.gamesContainer}>
                        <h2>Игры</h2>
                        <div>
                            {jam.projects.map(
                                (game: IProject, index: number) => (
                                    <Game
                                        game={game}
                                        key={"game_" + game._id}
                                        pos={index}
                                    />
                                )
                            )}
                        </div>
                    </div>
                </div>
            </>
        </FlexCenter>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const jamData: IJam = await API.getJam("" + context.query.id);
    return {
        props: { jamData },
    };
};

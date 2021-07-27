import React from "react";
import { IJam } from "../libs/api";
import API from "../libs/api";
import Link from "next/link";
import style from "../styles/jams.module.css";
import Loading from "../Components/loading";
import FlexCenter from "../Components/useful/FlexCenter";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

export function Jam(data: IJam) {
    ///{data.liveStatus ? <span className={style.cardLive}>LIVE</span> : ""}
    return (
        <Link href={`/jams/${data._id}`}>
            <a className={style.card} href={`/jams/${data._id}`}>
                <div
                    className={style.cardImage}
                    style={{ backgroundImage: `url(${data.picture})` }}
                />
                <div className={style.cardBody}>
                    <div className={style.cardDate}>
                        <img src="/icons/clock.svg" width="22em" />
                        {data.date}
                    </div>
                    <h3>{data.name}</h3>
                    <div>{data.description}</div>
                </div>
            </a>
        </Link>
    );
}

export default function Jems({
    data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
        <FlexCenter>
            <div className={style.container}>
                <h1 className={style.title}>
                    <div>
                        <img
                            src="/icons/icon_6.svg"
                            width="45em"
                            height="45em"
                        />
                        Джемы
                    </div>
                </h1>
                <div className={style.jams}>
                    {data.length == 0 ? (
                        <Loading />
                    ) : (
                        data.map((value: IJam, index: number) => (
                            <Jam {...value} key={`jam_${index}`} />
                        ))
                    )}
                </div>
            </div>
        </FlexCenter>
    );
}
export const getServerSideProps: GetServerSideProps = async () => {
    const data: Array<IJam> = await API.getJams();
    data.reverse();
    return {
        props: { data },
    };
};

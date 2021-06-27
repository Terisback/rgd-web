import React from "react";
import { JamData } from "../libs/api";
import API from "../libs/api";
import Link from "next/link";
import style from "../styles/jams.module.css";
import Loading from "../Components/loading";
import FlexCenter from "../Components/useful/FlexCenter";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

export function Jam({
  preview,
  title,
  date,
  description,
  liveStatus,
  id,
}: JamData) {
  return (
    <Link href={`/jams/${id}`}>
      <a className={style.card} href={`/jams/${id}`}>
        {liveStatus ? <span className={style.cardLive}>LIVE</span> : ""}
        <img src={preview} />
        <div className={style.cardBody}>
          <div className={style.cardDate}>
            <img src="/icons/clock.svg" width="22em" />
            {date}
          </div>
          <h3>{title}</h3>
          <div>{description}</div>
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
            <img src="/icons/icon_6.svg" width="45em" height="45em" />
            Джемы
          </div>
          <div>back</div>
        </h1>
        <div className={style.jams}>
          {data.length == 0 ? (
            <Loading />
          ) : (
            data.map((value: JamData, index: number) => (
              <Jam {...value} key={`jam_${index}`} />
            ))
          )}
        </div>
      </div>
    </FlexCenter>
  );
}
export const getServerSideProps: GetServerSideProps = async () => {
  const data: Array<JamData> = await API.getJams();
  return {
    props: { data },
  };
};

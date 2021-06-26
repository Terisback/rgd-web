import React from "react";
import { useRouter } from "next/router";

import Head from "next/head";

import style from "../../styles/jam.module.css";

import { IUser, JamData } from "../../libs/api";
import Loading from "../../Components/loading";
import API from "../../libs/api";
import FlexCenter from "../../Components/useful/FlexCenter";
import UserAvatar from "../../Components/useful/UserAvatar";

function numberFormat(num: number): String {
  return String(num).replace(/(.)(?=(\d{3})+$)/g, "$1 ");
}

const games = [
  {
    id: 0,
    user_id: "357130048882343937",
    user: {},
    description:
      "ОХУЕННАЯ ИГРА НА ДЖЕМ В ДИСКОРДЕ С ШИЗИКАМИ РАЗНОГО ПОЛА И ВОЗРАСТА ЛЮБОЙ ОРИЕНТАЦИИ",
    preview:
      "https://rgd-api.damirlut.tk/file/338b8000-19d3-4e3a-8198-df2c7821d845.png",
  },
  {
    id: 1,
    user_id: "357130048882343937",
    user: {},
    description:
      "ОХУЕННАЯ ИГРА НА ДЖЕМ В ДИСКОРДЕ С ШИЗИКАМИ РАЗНОГО ПОЛА И ВОЗРАСТА ЛЮБОЙ ОРИЕНТАЦИИ",
    preview:
      "https://rgd-api.damirlut.tk/file/338b8000-19d3-4e3a-8198-df2c7821d845.png",
  },
  {
    id: 2,
    user_id: "357130048882343937",
    user: {},
    description:
      "ОХУЕННАЯ ИГРА НА ДЖЕМ В ДИСКОРДЕ С ШИЗИКАМИ РАЗНОГО ПОЛА И ВОЗРАСТА ЛЮБОЙ ОРИЕНТАЦИИ",
    preview:
      "https://rgd-api.damirlut.tk/file/338b8000-19d3-4e3a-8198-df2c7821d845.png",
  },
  {
    id: 3,
    user_id: "357130048882343937",
    user: {},
    description:
      "ОХУЕННАЯ ИГРА НА ДЖЕМ В ДИСКОРДЕ С ШИЗИКАМИ РАЗНОГО ПОЛА И ВОЗРАСТА ЛЮБОЙ ОРИЕНТАЦИИ",
    preview:
      "https://rgd-api.damirlut.tk/file/338b8000-19d3-4e3a-8198-df2c7821d845.png",
  },
  {
    id: 4,
    user_id: "357130048882343937",
    user: {},
    description:
      "ОХУЕННАЯ ИГРА НА ДЖЕМ В ДИСКОРДЕ С ШИЗИКАМИ РАЗНОГО ПОЛА И ВОЗРАСТА ЛЮБОЙ ОРИЕНТАЦИИ",
    preview:
      "https://rgd-api.damirlut.tk/file/338b8000-19d3-4e3a-8198-df2c7821d845.png",
  },
  {
    id: 5,
    user_id: "357130048882343937",
    user: {},
    description:
      "ОХУЕННАЯ ИГРА НА ДЖЕМ В ДИСКОРДЕ С ШИЗИКАМИ РАЗНОГО ПОЛА И ВОЗРАСТА ЛЮБОЙ ОРИЕНТАЦИИ",
    preview:
      "https://rgd-api.damirlut.tk/file/338b8000-19d3-4e3a-8198-df2c7821d845.png",
  },
  {
    id: 6,
    user_id: "357130048882343937",
    user: {},
    description:
      "ОХУЕННАЯ ИГРА НА ДЖЕМ В ДИСКОРДЕ С ШИЗИКАМИ РАЗНОГО ПОЛА И ВОЗРАСТА ЛЮБОЙ ОРИЕНТАЦИИ",
    preview:
      "https://rgd-api.damirlut.tk/file/338b8000-19d3-4e3a-8198-df2c7821d845.png",
  },
];

const Game = (props: any) => {
  const [user, setUser] = React.useState({} as IUser);
  React.useEffect(() => {
    API.getUser(props.user_id).then(setUser);
  }, []);
  if (Object.keys(user).length === 0) {
    return (
      <div className={style.game}>
        <Loading />
      </div>
    );
  }
  return (
    <div className={style.game}>
      <img src={props.preview} />
      <span>
        {props.pos < 4 ? (
          <img
            src={`/icons/icon_medal_${props.pos + 1}.svg`}
            width="32em"
            alt="награда"
          />
        ) : (
          ""
        )}
      </span>
      <div>
        <div className={style.jamAuthor}>
          <UserAvatar src={user.avatar} />
          <div>{user.username}</div>
        </div>
        <div className={style.jamDesc}>
          {props.description.slice(0, 47) + "..."}
        </div>
      </div>
    </div>
  );
};

export default function JamByID() {
  const [jam, setJam] = React.useState<JamData>();
  const Router = useRouter();
  const { id } = Router.query;
  React.useEffect(() => {
    if (id === undefined) return;
    API.getJam(Number(id)).then(setJam);
  }, [id]);
  if (!jam) {
    return (
      <div className="flexCenter">
        <Loading />
      </div>
    );
  }
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
              {games.map((game, index) => (
                <Game {...game} key={"game_" + game.id} pos={index} />
              ))}
            </div>
          </div>
          <div>
            <h2>Голосование</h2>
            сетка...
          </div>
        </div>
      </div>
    </FlexCenter>
  );
}

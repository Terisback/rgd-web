import React from "react";
import { GetStaticProps } from "next";

import { useRouter } from "next/router";
import { IProject, IUser } from "../../libs/api";

import style from "../../styles/user.module.css";

import API from "../../libs/api";
import Loading from "../../Components/loading";
import FlexCenter from "../../Components/useful/FlexCenter";

import Head from "next/head";

function getDays(date_future: Date, date_now: Date) {
  return Math.floor((date_future.getTime() - date_now.getTime()) / 86400000);
}

function parseHHMMSS(sec_num: number) {
  var days: string | number = Math.floor(sec_num / 86400);
  sec_num -= days * 86400;
  var hours: string | number = Math.floor(sec_num / 3600);
  var minutes: string | number = Math.floor((sec_num - hours * 3600) / 60);
  var seconds: string | number = sec_num - hours * 3600 - minutes * 60;
  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  return `${days} дней(дня) ${hours} часов ${minutes} минут ${seconds} секунд`;
}

interface TabProps {
  children: React.ReactNode;
  tabId: string;
  activeTab: string;
}

const Tab = ({ children, tabId, activeTab }: TabProps) => {
  const _tab = React.useRef(null);
  if (tabId != activeTab) {
    return <></>;
  }
  return <div ref={_tab}>{children}</div>;
};

const Project = ({ name, preview }: IProject) => {
  return (
    <div className={style.project}>
      <img src={preview} />
      <div className={style.projectBody}>
        <h3>{name}</h3>
        <div>Типа описание</div>
      </div>
      <div className={style.projectFooter}>
        <div>Просмотров: 999</div>
        <div>Лайков: 999</div>
      </div>
    </div>
  );
};

const ProjectAdd = () => {
  return (
    <div className={style.project}>
      <div className={style.projectBody}>Добавить</div>
    </div>
  );
};

export default function Profile() {
  const [user, setUser] = React.useState({} as IUser);
  const Router = useRouter();

  const [activeTab, setActiveTab] = React.useState("stats");

  const buttonTabHandle = (e: React.MouseEvent<HTMLElement>) => {
    setActiveTab(e.currentTarget.id);
  };

  const { id } = Router.query;
  React.useEffect(() => {
    if (id == undefined) return;
    console.log(`Request data (${id})`);
    API.getUser(id as string).then((u) => {
      setUser(u);
    });
  }, [id]);
  if (!user?.id) {
    return <Loading />;
  }
  return (
    <FlexCenter>
      <Head>
        <title>{user.username}</title>
      </Head>
      <div className={style.main}>
        {user.cover_profile ? (
          <img src={user.cover_profile} className={style.coverProfile} />
        ) : (
          ""
        )}
        <div className={style.container}>
          <div className={style.user}>
            <img src={user.avatar} />
            <div>
              <div className={style.userName}>
                {user.nickname ? user.nickname : `${user.username}#${user.tag}`}
              </div>
              <div className="desc">
                {user.nickname ? `${user.username}#${user.tag}` : ""}
              </div>
              <div className="desc">О себе: {user.about}</div>
            </div>
          </div>
          <div>
            <div className={style.menu}>
              <button id="stats" onClick={buttonTabHandle}>
                Статистика
              </button>
              <button id="projects" onClick={buttonTabHandle}>
                Проекты
              </button>
              <button id="svistelka" onClick={buttonTabHandle}>
                ...
              </button>
            </div>
            <div style={{ marginTop: "1em" }}>
              <Tab tabId="stats" activeTab={activeTab}>
                {user.birth ? <div>Дата рождения: {user.birth}</div> : ""}

                <div>Монетки: {user.coins}</div>
                <div>Кол-во сообщений: {user.exp}</div>
                <div>Наговорил: {parseHHMMSS(user.voice)}</div>
                <div>
                  На сервере: {getDays(new Date(), new Date(user.first))} дня.
                  Первый раз зашел: {user.first}
                </div>
                <div>Уровень увожения: {user.rep}</div>
                {user.part ? (
                  <div>
                    Женат на: {user.part.username}#{user.part.tag}
                  </div>
                ) : (
                  ""
                )}
                <div>
                  {user.roles.map((role) => (
                    <div style={{ color: role.color }}>{role.name}</div>
                  ))}
                </div>
              </Tab>
              <Tab tabId="projects" activeTab={activeTab}>
                <div className={style.projectGrid}>
                  <ProjectAdd />
                </div>
              </Tab>
              <Tab tabId="svistelka" activeTab={activeTab}>
                что либо еще
              </Tab>
            </div>
          </div>
        </div>
      </div>
    </FlexCenter>
  );
}

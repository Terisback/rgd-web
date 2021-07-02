import React from "react";
import UserAvatar from "../Components/useful/UserAvatar";
import API, { IProject, IUser } from "../libs/api";

import { GetServerSideProps, InferGetServerSidePropsType } from "next";

import style from "../styles/projects.module.css";

const Project = ({ project, preview, description, user_id, id }: IProject) => {
    const [authors, setAuthor] = React.useState([] as Array<IUser>);
    React.useEffect(() => {
        const fetch = async () => {
            const list: Array<IUser> = [];
            for (let user of user_id) {
                user = user.toString();
                if (user.startsWith("-1")) {
                    list.push({
                        id: "-1-" + id,
                        username: `Нужно уточнить( ${user.replace(
                            "-1-",
                            ""
                        )} )`,
                        avatar: "https://api.rgd.chat/file/not-find.png",
                    } as IUser);
                } else {
                    await API.getUser(user).then((u) => {
                        if (Object.keys(u).length > 0) {
                            list.push(u[0]);
                        } else {
                            console.log(u);
                        }
                    });
                }
            }
            setAuthor(list);
        };
        fetch();
    }, []);
    return (
        <div className={style.project}>
            <img src={preview} />
            <div className={style.projectBody}>
                <h3>{project}</h3>
                <div>{description.slice(0, 70) + "..."}</div>
            </div>
            <div className={style.projectFooter}>
                {authors.map((author: IUser, index) => (
                    <div key={"author_" + author.id}>
                        <UserAvatar src={author.avatar} size={16} />

                        <a href={"/user/" + author.id}>{author.username}</a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default function Projects({
    data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
        <section>
            <h3>Проектики сообщества</h3>
            <div className={style.projectGrid}>
                {data.map((project: IProject, index: number) => (
                    <Project key={"project_" + index} {...project} />
                ))}
            </div>
        </section>
    );
}

export const getServerSideProps: GetServerSideProps = async () => {
    const data: Array<IProject> = await API.getProjects();
    return {
        props: { data },
    };
};

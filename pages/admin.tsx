import React from "react";
import API, { IProject, IUser, JamData } from "../libs/api";

import { GetServerSideProps, InferGetServerSidePropsType } from "next";

import SearchInput from "../Components/useful/SearchInput";

import FlexCenter from "../Components/useful/FlexCenter";
import Accordion from "../Components/Accordion";
import UserAvatar from "../Components/useful/UserAvatar";

interface IInput {
    value: string;
    name: string;
    id: string;
    action: (key: string, value: string) => void;
}

function Input({ value, name, action, id }: IInput) {
    const [input, setInput] = React.useState(value);
    const handler = (e: React.ChangeEvent<HTMLInputElement>) => {
        action(id, e.target.value);
        setInput(e.target.value);
    };
    return (
        <div style={{ marginBottom: "1em" }}>
            {name}
            <input
                value={input}
                style={{ marginLeft: "1em" }}
                onChange={handler}
            />
        </div>
    );
}

interface IJam {
    jamData: JamData;
}

function Jam({ jamData }: IJam) {
    const [jam, setJam] = React.useState(jamData);

    const updateJam = (key: string, value: string) => {
        setJam({ ...jam, [key]: value });
    };

    const saveJam = () => {
        API.updateJam(jam).then((result) => {
            alert(JSON.stringify(result));
        });
    };

    const removeProject = (event: React.MouseEvent<HTMLElement>) => {
        jam.projects.forEach((project: IProject, index: number) => {
            ///@ts-ignore
            if (project == event.target.id) {
                var array = jam.projects;
                array.splice(index, 1);
                console.log("Элемент удален", project);
                setJam({ ...jam, projects: array });
            }
        });
    };
    interface iproject {
        id: number;
    }
    const Project = ({ id }: iproject) => {
        const [project, setProject] = React.useState({} as IProject);
        React.useEffect(() => {
            API.getProject(id).then(setProject);
        }, []);
        return (
            <div>
                {project.project} (ID: {project.id})
            </div>
        );
    };

    const AddProject = () => {
        const [project, setProject] = React.useState({} as IProject);
        const [input, setInput] = React.useState("-1");

        const onInput = (event: React.ChangeEvent<HTMLInputElement>) => {
            setInput(event.target.value);
            API.getProject(Number(event.target.value)).then(setProject);
        };
        const addProject = () => {
            jam.projects.unshift(Number(input) as unknown as IProject);
            setJam({ ...jam, projects: jam.projects });
        };
        return (
            <tr>
                <td>
                    ({project.project})
                    <input value={input} onChange={onInput} />
                </td>
                <td>
                    <button onClick={addProject}>Добавить</button>
                </td>
            </tr>
        );
    };

    return (
        <Accordion value={`${jam.title} (ID: ${jam.id})`}>
            <div>
                <Input
                    name="Название"
                    value={jam.title}
                    action={updateJam}
                    id="title"
                />
                <Input
                    name="Описание"
                    value={jam.description}
                    action={updateJam}
                    id="description"
                />
                <Input
                    name="Приз"
                    value={jam.fond}
                    action={updateJam}
                    id="fond"
                />
                <Input
                    name="Стрим"
                    value={jam.stream}
                    action={updateJam}
                    id="stream"
                />
                <Input
                    name="Изображение(URL)"
                    value={jam.preview}
                    action={updateJam}
                    id="preview"
                />
                <div>
                    <img src={jam.preview} width="128px" />
                </div>
                <Accordion value={`Проекты ${jam.projects.length}`}>
                    <table width="100%">
                        <tr>
                            <th>Проект</th>
                            <th>Действие</th>
                        </tr>
                        <AddProject />
                        {jam.projects.map((project, index) => (
                            <tr key={`project_${project}_${index}`}>
                                <td>
                                    <Project
                                        id={project as unknown as number}
                                    />
                                </td>
                                <td>
                                    <button onClick={() => {}}>Открыть</button>
                                    <button
                                        id={project as unknown as string}
                                        onClick={removeProject}
                                    >
                                        Удалить
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </table>
                </Accordion>
                <div>
                    <button onClick={saveJam}>Сохранить</button>
                </div>
            </div>
        </Accordion>
    );
}

function JamEditor() {
    const [jams, setJams] = React.useState([] as Array<JamData>);
    React.useEffect(() => {
        API.getJams().then(setJams);
    }, []);
    return (
        <div>
            {jams.map((jam: JamData, index: number) => {
                return <Jam jamData={jam} key={"jam_" + index} />;
            })}
        </div>
    );
}

interface IPr {
    projectData: IProject;
}

function Project({ projectData }: IPr) {
    const [project, setProject] = React.useState(projectData);

    const updateProject = (key: string, value: string) => {
        setProject({ ...project, [key]: value });
    };

    const saveProject = () => {
        API.updateProject(project).then((result) => {
            alert(JSON.stringify(result));
        });
    };

    const AddUser = () => {
        const [user, setUser] = React.useState({} as IUser);
        const [input, setInput] = React.useState("-1");

        const onInput = (event: React.ChangeEvent<HTMLInputElement>) => {
            setInput(event.target.value);
            API.getUser(event.target.value).then((users) => setUser(users[0]));
        };
        const addUser = () => {
            project.user_id.unshift(input as unknown as IUser);
            setProject({ ...project, user_id: project.user_id });
        };
        return (
            <tr>
                <td>
                    (<UserAvatar src={user.avatar} size={16} /> {user.username})
                    <input value={input} onChange={onInput} />
                </td>
                <td>
                    <button onClick={addUser}>Добавить</button>
                </td>
            </tr>
        );
    };
    const removeUser = (event: React.MouseEvent<HTMLElement>) => {
        project.user_id.forEach((user: IUser, index: number) => {
            ///@ts-ignore
            if (user == event.target.id) {
                var array = project.user_id;
                array.splice(index, 1);
                setProject({ ...project, user_id: project.user_id });
            }
        });
    };
    interface iu {
        user: string;
    }
    const User = ({ user }: iu) => {
        const [data, setData] = React.useState({} as IUser);
        React.useEffect(() => {
            if (user.startsWith("-1")) {
                setData({
                    username: user.replace("-1-", ""),
                    avatar: "https://api.rgd.chat/file/not-find.png",
                } as IUser);
            } else {
                API.getUser(user).then((users) => {
                    setData(users[0]);
                });
            }
        }, []);
        if (Object.keys(data).length === 0) {
            return <div>Загружается</div>;
        }
        return (
            <div>
                <UserAvatar src={data.avatar} size={16} />
                {data.username}
            </div>
        );
    };

    return (
        <Accordion value={`${project.project} (ID: ${project.id})`}>
            <div>
                <Input
                    name="Название"
                    value={project.project}
                    action={updateProject}
                    id="project"
                />
                <Input
                    name="Описание"
                    value={project.description}
                    action={updateProject}
                    id="description"
                />
                <Input
                    name="Изображение(URL)"
                    value={project.preview}
                    action={updateProject}
                    id="preview"
                />
                <div>
                    <img src={project.preview} width="128px" />
                </div>
                <table width="100%">
                    <tr>
                        <th>Пользователь</th>
                        <th>Действие</th>
                    </tr>
                    <AddUser />
                    {project.user_id.map((user, index) => (
                        <tr key={`user_${user.id}_${index}`}>
                            <td>
                                <User user={user as unknown as string} />
                            </td>
                            <td>
                                <button onClick={() => {}}>Открыть</button>
                                <button
                                    id={user as unknown as string}
                                    onClick={removeUser}
                                >
                                    Удалить
                                </button>
                            </td>
                        </tr>
                    ))}
                </table>
                <div>
                    <button onClick={saveProject}>Сохранить</button>
                </div>
            </div>
        </Accordion>
    );
}

function ProjectsEditor() {
    const [projects, setProjects] = React.useState([] as Array<IProject>);
    React.useEffect(() => {
        API.getProjects().then(setProjects);
    }, []);
    return (
        <div>
            {projects.map((project: IProject, index: number) => {
                return (
                    <Project projectData={project} key={"project_" + index} />
                );
            })}
        </div>
    );
}

export default function Admin({
    isAdmin,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    if (typeof window === "undefined") return "";
    if (isAdmin) {
        return (
            <FlexCenter>
                <div style={{ width: "60%" }}>
                    <div>
                        <h1>Поиск</h1>
                        <SearchInput />
                    </div>
                    <Accordion value="Редактор джемов">
                        <div style={{ maxWidth: "100%" }}>
                            <JamEditor />
                        </div>
                    </Accordion>
                    <Accordion value="Редактор проектов">
                        <div style={{ maxWidth: "100%" }}>
                            <ProjectsEditor />
                        </div>
                    </Accordion>
                </div>
            </FlexCenter>
        );
    }
    return <section>А вам сюда нельзя!</section>;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    API.token = context.req.cookies?.token;
    const user = await API.getUser();
    let isAdmin = false;
    console.log(user);
    if (user.length > 0) {
        isAdmin = user[0].admin; //context.User.admin;
    }
    return {
        props: { isAdmin },
    };
};

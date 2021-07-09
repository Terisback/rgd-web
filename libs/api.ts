import axios from "axios";

export interface IProject {
    id: number;
    user_id: Array<IUser>;
    project: string;
    preview: string;
    description: string;
    link: string;
}
export interface JamData {
    preview: string;
    title: string;
    date: string;
    description: string;
    liveStatus: boolean;
    id: number;
    projects: Array<IProject>;
    fond: string;
    fondPerPlayer: number;
    votes: Array<object>;
    stream: string;
}

export interface IRole {
    id: string;
    name: string;
    color: string;
}

export interface IUser {
    username: string;
    id: string;
    avatar: string;
    tag: string;
    admin: boolean;
    about: string;
    birth: string;
    coins: number;
    exp: number;
    first: string;
    here: boolean;
    leave: number;
    part: IUser;
    rep: number;
    voice: number;
    nickname: string;
    cover_profile: string;
    roles: Array<IRole>;
    project: Array<IProject>;
}

export const UserTemplate: IUser = {
    username: "",
    tag: "",
    avatar: "",
    id: "",
    admin: false,
    about: "",
    birth: "",
    coins: 0,
    exp: 0,
    first: "",
    here: true,
    leave: 0,
    part: {} as IUser,
    rep: 0,
    voice: 0,
    nickname: "",
    cover_profile: "",
    roles: [],
    project: [],
};

export interface IALog {
    user_id: string;
    user: IUser;
    _id: string;
    time: string;
    message: string;
}

const URL = "https://api.rgd.chat/";
//const URL = "http://localhost:5001/";
export default class API {
    static token = "";
    static async getJams() {
        const { data } = await axios(URL);
        return data.items as Array<JamData>;
    }
    static async getJam(id: number) {
        const { data } = await axios(URL + "jam/" + id);
        return data as JamData;
    }
    static async getUser(...args: string[]) {
        let url = URL + "user";
        if (args.length == 0) {
            url += "?token=" + API.token;
        } else {
            url += "?id=" + args.join(",");
        }
        const { data } = await axios(url);
        return data as Array<IUser>;
    }
    static async Search(query: string) {
        const { data } = await axios(
            `${URL}user.search?text=${encodeURIComponent(query)}`
        );
        return data;
    }

    static async getProjects() {
        const { data } = await axios(`${URL}projects/`);
        return data as Array<IProject>;
    }
    static async getProject(id: number) {
        const { data } = await axios(`${URL}projects/` + id);
        return data as IProject;
    }
    static async updateJam(jamData: JamData) {
        const { data } = await axios.post(`${URL}jam.update`, jamData, {
            headers: {
                authorization: API.token,
            },
        });
        return data;
    }
    static async updateProject(projectData: IProject) {
        const { data } = await axios.post(`${URL}project.update`, projectData, {
            headers: {
                authorization: API.token,
            },
        });
        return data;
    }
    static async getAdminLog() {
        const { data } = await axios.get(`${URL}admin.log`, {
            headers: {
                authorization: API.token,
            },
        });
        return data as Array<IALog>;
    }
}

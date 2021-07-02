import axios from "axios";

export interface IProject {
    id: number;
    user_id: Array<string>;
    project: string;
    preview: string;
    description: string;
}
export interface JamData {
    preview: string;
    title: string;
    date: string;
    description: string;
    liveStatus: boolean;
    id: number;
    games: Array<object>;
    fond: string;
    fondPerPlayer: number;
    votes: Array<object>;
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

const URL = "https://api.rgd.chat/";

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
}

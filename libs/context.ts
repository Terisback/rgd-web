import React from "react";
import { IUser } from "./api";

export interface IContext {
  User: IUser;
  setUser: React.Dispatch<React.SetStateAction<IUser>>;
}

export const AppContext = React.createContext({} as IContext);

export function useAppContext() {
  return React.useContext(AppContext);
}

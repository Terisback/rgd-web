import React from "react";
import style from "./style.module.css";
interface FlexCenterProps {
    children: React.ReactNode | React.ReactNodeArray;
}

export default function FlexCenter({ children }: FlexCenterProps) {
    return <div className={style.flexCenter}>{children}</div>;
}

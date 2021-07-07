import React from "react";

import style from "./style.module.css";

interface IAccordion {
    value: string;
    children: React.ReactNode | React.ReactNodeArray;
}

export default function Accordion({ value, children }: IAccordion) {
    const panelRef = React.useRef<HTMLDivElement>(null);
    const buttonRef = React.useRef<HTMLButtonElement>(null);

    const onClick = () => {
        buttonRef.current?.classList.toggle(style.active);
        if (panelRef.current?.style.display === "block") {
            panelRef.current.style.display = "none";
        } else {
            ///@ts-ignore
            panelRef.current.style.display = "block";
        }
    };

    return (
        <div className={style.container}>
            <button
                ref={buttonRef}
                className={style.accordion}
                onClick={onClick}
            >
                {value}
            </button>
            <div ref={panelRef} className={style.panel}>
                {children}
            </div>
        </div>
    );
}

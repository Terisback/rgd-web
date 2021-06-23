import Button from "./Button";
import style from "./style.module.css";

import { AppContext } from "../../../../libs/context";

import React from "react";

export interface Element {
  href: string;
  icon: string;
  title: string;
  admin?: boolean;
}

import { elements } from "..";

function checkAdmin(element: boolean | undefined, user: boolean) {
  if (element) {
    if (element === user) {
      return true;
    }
    return false;
  }
  return true;
}

export default function Menu() {
  const context = React.useContext(AppContext);
  return (
    <div className={style.Menu}>
      {elements.map((element: Element, index: number) =>
        checkAdmin(element.admin, context.User?.admin) ? (
          <Button
            href={element.href}
            title={element.title}
            icon={element.icon}
            key={"menu_" + index}
          />
        ) : (
          ""
        )
      )}
    </div>
  );
}

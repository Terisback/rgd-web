import { Element } from "./index";
import style from "./style.module.css";
import Link from "next/link";

import { useRouter } from "next/router";

export default function Button(props: Element) {
  const router = useRouter();
  function isActivePage(href:string) {
    return router.asPath === href
      || href != "" && router.asPath.startsWith(href + "/");
  }
  return (
    <Link href={props.href}>
      <a className={style.Button + (isActivePage(props.href) ? " " + style.ActivePage : "")}>
        <div>
          <img src={`/icons/${props.icon}.svg`} width="35em" height="35em" />
          {props.title}
        </div>
      </a>
    </Link>
  );
}

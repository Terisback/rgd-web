import { Element } from "./index";
import style from "./style.module.css";
import Link from "next/link";

import { useRouter } from "next/router";

export default function Button(props: Element) {
  const router = useRouter();
  return (
    <Link href={props.href}>
      <a className={style.Button}>
        <div className={router.asPath === props.href ? style.ActivePage : ""}>
          <img src={`/icons/${props.icon}.svg`} width="35em" height="35em" />
          {props.title}
        </div>
      </a>
    </Link>
  );
}

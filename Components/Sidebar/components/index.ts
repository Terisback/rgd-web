import { Element } from "./Menu/index";
import Logo from "./Logo";
import Menu from "./Menu";

const elements = [
  {
    href: "/",
    icon: "icon_7",
    title: "Информация",
    admin: false,
  },
  {
    href: "/projects",
    icon: "icon_1",
    title: "Игры сообщества",
    admin: false,
  },
  /*
  {
    href: "/tutorials",
    icon: "icon_2",
    title: "Туториалы",
    admin: false,
  },*/
  /*{
    href: "/fun",
    icon: "icon_3",
    title: "Развлечения",
    admin: false,
  },*/
  {
    href: "/jams",
    icon: "icon_6",
    title: "Архив джемов",
    admin: false,
  },
  /*{
    href: "/streams",
    icon: "icon_4",
    title: "Стримы",
    admin: false,
  },*/
  /*{
    href: "/votes",
    icon: "icon_5",
    title: "Голосование",
    admin: false,
  },*/
  /*{
    href: "/screenshotsaturday",
    icon: "icon_7",
    title: "Архив субботника",
    admin: false,
  },*/
  {
    href: "/donat",
    icon: "icon_8",
    title: "Донатеры",
    admin: false,
  },
  {
    href: "/admin",
    icon: "settings",
    title: "Админка",
    admin: true,
  },
];

export { Logo, Menu, elements };

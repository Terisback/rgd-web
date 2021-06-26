import style from "./style.module.css";

interface UserAvatarProps {
  src: string;
}

export default function UserAvatar({ src }: UserAvatarProps) {
  return (
    <img src={src} width="32em" alt="аватарка" className={style.userAvatar} />
  );
}

import style from "./style.module.css";

interface UserAvatarProps {
  src: string;
  size?: number;
}

export default function UserAvatar({ src, size = 32 }: UserAvatarProps) {
  return (
    <img
      src={src}
      width={size + "em"}
      alt="аватарка"
      className={style.userAvatar}
    />
  );
}

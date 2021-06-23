import style from "./style.module.css";
export default function Loading() {
  return (
    <div className={style.center}>
      <div className={style.loader}>Loading...</div>
    </div>
  );
}

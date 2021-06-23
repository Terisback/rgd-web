import React from "react";
import { AppContext } from "../libs/context";
import { useCookies } from "react-cookie";
import axios from "axios";

import style from "../styles/admin.module.css";
import API, { IUser } from "../libs/api";

import { useRouter } from "next/router";

export default function Admin() {
  const context = React.useContext(AppContext);
  const router = useRouter();
  const [cookie] = useCookies(["token"]);
  if (!context.User?.admin && typeof window !== "undefined") {
    return (window.location.href = window.location.origin);
  }
  const [jemName, setJemName] = React.useState("");
  const [image, setImage] = React.useState({} as File);
  const [preview, setPreview] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [date, setDate] = React.useState("");
  const jemHandle = (e: React.ChangeEvent<HTMLInputElement>) =>
    setJemName(e.target.value);
  const previewHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length !== 0) {
      ///@ts-ignore
      var file = e.target.files[0];
      var reader = new FileReader();
      var url = reader.readAsDataURL(file);
      reader.onloadend = (e) => {
        setPreview(reader.result as string);
      };
      setImage(file);
    }
  };
  const descHandle = (e: React.ChangeEvent<HTMLInputElement>) =>
    setDescription(e.target.value);
  const dateHandle = (e: React.ChangeEvent<HTMLInputElement>) =>
    setDate(e.target.value);

  const Sumbit = () => {
    var formData = new FormData();
    formData.append("file", image, "preview.png");
    formData.append("jemName", jemName);
    formData.append("desc", description);
    formData.append("date", date);
    axios({
      method: "post",
      url: "https://rgd-api.damirlut.tk/jem",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: cookie.token,
      },
    }).then((res) => {
      console.log("Success");
    });
  };

  const [search, setSearch] = React.useState([]);
  const input = React.useRef(null);
  const onSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    API.Search(e.target.value).then(setSearch);
  };

  if (typeof window === "undefined") return "";
  return (
    <div className="flexCenter">
      <div>
        <input ref={input} list="search" onChange={onSearchInput} />
        <datalist id="search">
          {search.map((user: IUser, index: number) => {
            return (
              <option value={user.id} key={"search_" + user.id}>
                {user.nickname}({user.username})
              </option>
            );
          })}
        </datalist>
        <button
          onClick={() => {
            ///@ts-ignore
            router.push("/user/" + input.current.value);
          }}
        >
          Перейти
        </button>
      </div>
      <div className={style.jem}>
        Название джема
        <input onChange={jemHandle} />
        Обложка
        <input type="file" accept="image/*" onChange={previewHandle} />
        <img src={preview} alt="image-preview" width="256px" height="auto" />
        Описание
        <input placeholder="Описание" onChange={descHandle} />
        Время проведения
        <input type="date" onChange={dateHandle} />
        <button onClick={Sumbit}>Отправить</button>
      </div>
    </div>
  );
}

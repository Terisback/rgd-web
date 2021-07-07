import React from "react";
import API, { IUser } from "../../libs/api";

export default function SearchInput() {
    const [search, setSearch] = React.useState([]);
    const input = React.useRef(null);
    const onSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        API.Search(e.target.value).then(setSearch);
    };
    return (
        <div>
            <input ref={input} list="search" onChange={onSearchInput} />
            <datalist id="search">
                {search.map((user: IUser) => {
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
    );
}

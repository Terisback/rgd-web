import React from "react";

interface IInput {
    value: string;
    name: string;
    id: string;
    action: (key: string, value: string) => void;
}
export function Input({ value, name, action, id }: IInput) {
    const [input, setInput] = React.useState(value || "");
    const handler = (e: React.ChangeEvent<HTMLInputElement>) => {
        action(id, e.target.value);
        setInput(e.target.value);
    };
    return (
        <div style={{ marginBottom: "1em" }}>
            {name}
            <input
                value={input}
                style={{ marginLeft: "1em" }}
                onChange={handler}
            />
        </div>
    );
}

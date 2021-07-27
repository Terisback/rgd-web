import React from "react";
import { AppContext } from "../libs/context";

import Accordion from "../Components/Accordion";
import { Input } from "../Components/useful/IInput";

export default function AddProject() {
    const context = React.useContext(AppContext);

    const [project, setProject] = React.useState({});

    const updateProject = (key: string, value: string) => {
        const [project, setProject] = React.useState({});
        ({ ...project, [key]: value });
    };

    if (context.User.id) {
        return (
            <section>
                <h1>Добавь свой проект!</h1>
                <div>
                    <Input
                        value="Хотлайн маями"
                        name="Название"
                        id="project-name"
                        action={updateProject}
                    />
                </div>
            </section>
        );
    }
    return <section>Вы не авторизованы(</section>;
}

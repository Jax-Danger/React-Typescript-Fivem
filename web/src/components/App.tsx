import React, { useState } from "react";
import { useNuiEvent } from "../utils/utils";

import "../debugData";

const App: React.FC = () => {
    const [visible, setVisible] = useState(false);
    useNuiEvent("setVisible", (data: boolean) =>
        setVisible(data));

    return (
        <main className={visible ? "block" : "hidden"}>
            <h1 className="text-3xl font-bold">Hello World!</h1>
        </main>
    );
};

export default App;

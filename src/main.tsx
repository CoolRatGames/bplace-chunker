import * as React from "react"
import * as ReactDOM from "react-dom/client"
import App from "./App"

const root: HTMLElement = document.getElementById("root")!;

ReactDOM.createRoot(root).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
import "./styles/global.css"
import { BrowserRouter } from "react-router";
import AuthProvider from "./AuthProvider";
import { createRoot } from "react-dom/client";
import App from "./App";

const rootElement = document.querySelector("#root");

const root = createRoot(rootElement!);

root.render(
    <BrowserRouter>
        <AuthProvider>
            <App/>
        </AuthProvider>
    </BrowserRouter>
)

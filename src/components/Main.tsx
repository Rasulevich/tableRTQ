import * as React from "react";
import { Content } from "./Content";
import { SideMenu } from "./SideMenu";
import './styles/Main.css';

export const Main = () => {
    return (
            <div className="main">
                <SideMenu/>
                <Content/>
            </div>
        )
}


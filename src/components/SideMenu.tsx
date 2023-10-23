import * as React from "react";
import icon3 from '../icons/icon3.png';
import { ProjectName } from "./ProjectNames";
import './styles/SideMenu.css';

export const SideMenu = () => {
    const ProjectsNames = ['По проекту','Обьекты','РД','MTO','CMP','График','MиМ','Рабочие','Капвложения','Бюджет','Финансирование']
    return (
        <div className="sideMenu">
            <div className="sideMenu_title">
                <div className="sideMenu_title_text">Название проекта</div> 
                <button><img src={icon3} alt='open menu'/></button>
            </div>
            <div className="sideMenu_items">
                {ProjectsNames.map((projectName,index) => <ProjectName projectName={projectName} key={index}/>)}
            </div>
        </div>

        )
}


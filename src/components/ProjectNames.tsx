import * as React from "react";
import icon4 from '../icons/icon4.png';
import './styles/ProjectNames.css';

export const ProjectName = ({projectName}) => {
    return (
            <div className="projects">
                <img src={icon4} className="projects_icon" alt='icon'/>
                <div className="project_title">{projectName}</div> 
            </div>
        )
}


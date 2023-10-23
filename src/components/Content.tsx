import * as React from "react";
import { Table } from './Table';
import './styles/Content.css';

export const Content = () => {

    return (
            <div className="content">
                <div className="content_title">Строительно-монтажные работы</div> 
                <Table />
            </div>            
        )
}


import * as React from "react";
import icon from '../icons/icon.png';
import icon2 from '../icons/icon2.png';
import './styles/Header.css';

export  const Header = () => {
    return (
        <div className="header_menu">
            <button>
                <img src={icon2} alt='menu_button' className="header_icon header_button"/> 
            </button>
            <button>
                <img src={icon} alt='back_button' className="header_icon header_button"/> 
            </button>
            <button className="header_button__active header_button header_button_text" >Просмотр</button>
            <button className="header_button header_button_text">Управление</button>
        </div>  
    )
}
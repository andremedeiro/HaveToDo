import React, {useState} from 'react';
import * as S from './style';

import sino from '../../assets/sino.svg';

function Header({haveLate, clickNotification, color, openTask}) {

    const [sideBar, setSidebar] = useState(false);
    const showSidebar = () => setSidebar(!sideBar);

    return (
        <S.Navbar color={color}>
            <div id="logo"><h1>Have<span>Todo</span></h1></div>
            <a onClick={clickNotification}><span className={haveLate ? 'notification active' : 'notification'}></span><img className="sino" src={sino} alt="Notificação"/></a>

            <div className={sideBar ? 'menu close' : 'menu'} onClick={showSidebar}>
                <div className="one"></div>
                <div className="two"></div>
                <div className="three"></div>
            </div>

            <S.Menu>
                <nav className={sideBar ? 'menu-toggle on' : 'menu-toggle'}>
                    <ul>
                        <li><a className="active">Home</a></li>
                        <li><a onClick={openTask}>Nova Tarefa</a></li>
                        <li><a href="#">Sincronize Celular</a></li>
                    </ul>

                    <h1>Have<span>Todo</span></h1>
                </nav>
            </S.Menu>
        </S.Navbar>
  );
}

export default Header;

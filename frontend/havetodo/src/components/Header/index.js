import React, {useState} from 'react';
import * as S from './style';

import sino from '../../assets/sino.svg';

function Header() {

    const [sideBar, setSidebar] = useState(false);
    const showSidebar = () => setSidebar(!sideBar);

  return (
      <S.Navbar>
            <div id="logo"><h1>Have<span>Todo</span></h1></div>
            <a href="#"><span></span><img className="sino" src={sino} alt="Notificação"/></a>

            <div className={sideBar ? 'menu close' : 'menu'} onClick={showSidebar}>
                <div className="one"></div>
                <div className="two"></div>
                <div className="three"></div>
            </div>

            <S.Menu>
                <nav className={sideBar ? 'menu-toggle on' : 'menu-toggle'}>
                    <ul>
                        <li><a className="active" href="#">Home</a></li>
                        <li><a href="#">Nova Tarefa</a></li>
                        <li><a href="#">Sincronize Celular</a></li>
                    </ul>

                    <h1>Have<span>Todo</span></h1>
                </nav>
            </S.Menu>
      </S.Navbar>
  );
}

export default Header;

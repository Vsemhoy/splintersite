import React, { useEffect, useState } from 'react';

import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Button, Menu } from 'antd';
import { Link } from 'react-router-dom';

import './style/mainmenublock.css';


const MainMenuBlock = (props) => {


  return (
    <div className={'spf-main-menu-bar'}>
        <nav>
            <Link to='/'>
                <Button>Главная</Button>
            </Link>
            <Link to='/emitter'>
                <Button>Emitter</Button>
            </Link>
        </nav>

    </div>
  )
};

export default MainMenuBlock;
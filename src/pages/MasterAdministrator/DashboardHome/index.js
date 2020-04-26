import React, { useState } from 'react';
import { MdMenu, MdClose } from 'react-icons/md';
import { BsFileCheck } from 'react-icons/bs';

import './styles.css';

import Home from '../../../assets/home.svg';
import Campus from '../../../assets/campus.svg';
import Administrators from '../../../assets/administrators.svg';

import Sidebar from '../../../components/Sidebar';
import Menu from '../../../components/Sidebar/Menu';
import MenuItem from '../../../components/Sidebar/MenuItem';
import Header from '../../../components/Header';
import Content from '../../../components/Content';

export default function DashboardHome() {
  const [toggle, setToggle] = useState(true);

  function handleToggleSidebar() {
    setToggle(!toggle);
  }

  return (
    <div className='general-container'>
      <Sidebar toggle={toggle} bgcolor='#111014 '>
        <Menu>
          <MenuItem menuicon={Home} title="Home" />
          <MenuItem menuicon={Campus} title="Campus" link="/master/registerCampus" />
          <MenuItem menuicon={Administrators} title="Administradores" />
        </Menu>
      </Sidebar>

      <Content toggle={toggle}>
        <Header toggle={toggle}>
          <button
            onClick={handleToggleSidebar}
            className={toggle ? 'btn-active' : 'btn-disabled'}
          >
            {toggle ? (
              <MdClose size={25} color='#FFF' />
            ) : (
                <MdMenu size={25} color='#FFF' />
              )}</button>
        </Header>

        <div className={toggle ? 'main-disabled' : 'main-active'}>
          <div className='description-page'>
            <h6 className='description'>Dados do sistema</h6>
          </div>
          <div className='box-informations'>
            <div className='box'>
              <div className='informations'>
                <p className='information'>Total de Admins</p>
                <p className='total'>50</p>
              </div>
              <img src={Administrators} alt='Administradores' style={{ width: '20%' }} />
            </div>
            <div className='box'>
              <div className='informations'>
                <p className='information'>Total de Campus</p>
                <p className='total'>60</p>
              </div>
              <img src={Campus} alt='Campus' style={{ width: '20%' }} />
            </div>
            <div className='box'>
              <div className='informations'>
                <p className='information'>Total de Outros</p>
                <p className='total'>10</p>
              </div>
              <img src={Administrators} alt='Administradores' style={{ width: '20%' }} />
            </div>
          </div>
          <div className='description-page'>
            <h6 className='description'>Lista dos últimos campus cadastrados</h6>
            <p className='informative'>Role para baixo para ver mais.</p>
          </div>
          <ul>
            <li>
              <BsFileCheck style={{ marginRight: '10px' }} size={24} color='#fff' />
              <div className='new-registers'>
                <p className='name-campus'>Campus Cedro</p>
                <p className='date-register'>12 / 04 / 2020</p>
              </div>
            </li>
            <li>
              <BsFileCheck style={{ marginRight: '10px' }} size={24} color='#fff' />
              <div className='new-registers'>
                <p className='name-campus'>Campus Iguatú</p>
                <p className='date-register'>12 / 04 / 2020</p>
              </div>
            </li>
            <li>
              <BsFileCheck style={{ marginRight: '10px' }} size={24} color='#fff' />
              <div className='new-registers'>
                <p className='name-campus'>Campus Quixadá</p>
                <p className='date-register'>12 / 04 / 2020</p>
              </div>
            </li>
            <li>
              <BsFileCheck style={{ marginRight: '10px' }} size={24} color='#fff' />
              <div className='new-registers'>
                <p className='name-campus'>Campus Crato</p>
                <p className='date-register'>12 / 04 / 2020</p>
              </div>
            </li>
            <li>
              <BsFileCheck style={{ marginRight: '10px' }} size={24} color='#fff' />
              <div className='new-registers'>
                <p className='name-campus'>Campus Limoeiro</p>
                <p className='date-register'>12 / 04 / 2020</p>
              </div>
            </li>
          </ul>
        </div>
      </Content>
    </div>
  );
}

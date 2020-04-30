import React, { useState } from 'react';
import { MdMenu, MdClose } from 'react-icons/md';
import { BsFileCheck } from 'react-icons/bs';

import './styles.css';

import Campus from '../../../assets/campus.svg';
import Administrators from '../../../assets/administrators.svg';

import Sidebar from '../../../components/MenuAdminMaster';
import Header from '../../../components/Header';
import Content from '../../../components/Content';
import Footer from '../../../components/footer';
import Description from '../../../components/DescriptionsPages';

export default function DashboardHome() {
  const [toggle, setToggle] = useState(true);

  function handleToggleSidebar() {
    setToggle(!toggle);
  }

  return (
    <div className='general-container'>

      <Sidebar toggle={toggle} />
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
          <Description description="Dados do sistema." />
          <div className='box-informations'>
            <div className='box'>
              <div className='informations'>
                <p className='information'>Total de Admins</p>
                <p className='total'>50</p>
              </div>
              <div className="box-icon">
                <img src={Administrators} alt='Administradores' />
              </div>
            </div>
            <div className='box'>
              <div className='informations'>
                <p className='information'>Total de Campus</p>
                <p className='total'>60</p>
              </div>
              <div className="box-icon">
                <img src={Campus} alt='Campus' />
              </div>
            </div>
            <div className='box'>
              <div className='informations'>
                <p className='information'>Total de Outros</p>
                <p className='total'>10</p>
              </div>
              <div className="box-icon">
                <img src={Administrators} alt='Administradores' />
              </div>
            </div>
          </div>

          <Description
            description="Lista dos últimos campus cadastrados"
            tip="Role para baixo para ver mais."
          />

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

          <Footer description="© 2020 - IFCE / Developed by - Samuel Lima" />

        </div>
      </Content>
    </div>
  );
}

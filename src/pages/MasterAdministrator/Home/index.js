import React, { useState, useEffect } from 'react';
import { MdMenu, MdClose } from 'react-icons/md';
import { BsFileCheck, BsBuilding, BsPerson, BsPersonDash } from 'react-icons/bs';

import './styles.css';

import Sidebar from '../../../components/MenuAdminMaster';
import Header from '../../../components/Header';
import Content from '../../../components/Content';
import Footer from '../../../components/footer';
import Description from '../../../components/DescriptionsPages';

import api from '../../../services/api';

export default function DashboardHome() {
  const [toggle, setToggle] = useState(true);
  const [totalCampus, setTotalCampus] = useState('');
  const [totalAdmins, setTotalAdmins] = useState('');
  const [totalAdminsNullGroup, setTotalAdminsNullGroup] = useState('');

  function handleToggleSidebar() {
    setToggle(!toggle);
  }

  useEffect(() => {
    async function loadCampus() {
      const response = await api.get('api/campus/filter');
      setTotalCampus(response.data.total);
    }

    loadCampus();
  }, []);

  useEffect(() => {
    async function loadAdmins() {
      const response = await api.get('api/users/searchAdmCampus');
      setTotalAdmins(response.data.total);
    }

    loadAdmins();
  }, []);

  useEffect(() => {
    async function loadAdminNullGroup() {
      const response = await api.get('api/users/searchUsersNullGroup');
      setTotalAdminsNullGroup(response.data.total);
    }

    loadAdminNullGroup();
  }, []);


  return (
    <div className='general-container'>

      <Sidebar toggle={toggle} />
      <Content toggle={toggle} bg="#0B0A0D">
        <Header toggle={toggle} color="#fff">
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
                <p className='total'>{totalAdmins}</p>
              </div>
              <div className="box-icon">
                <BsPerson size={50} color="#ffffff" />
              </div>
            </div>
            <div className='box'>
              <div className='informations'>
                <p className='information'>Total de Campus</p>
                <p className='total'>{totalCampus}</p>
              </div>
              <div className="box-icon">
                <BsBuilding size={45} color="#ffffff" />
              </div>
            </div>
            <div className='box'>
              <div className='informations'>
                <p className='information'>Sem grupo</p>
                <p className='total'>{totalAdminsNullGroup}</p>
              </div>
              <div className="box-icon">
                <BsPersonDash size={50} color="#ffffff" />
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

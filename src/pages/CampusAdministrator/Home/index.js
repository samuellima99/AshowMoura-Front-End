import React, { useState, useEffect } from 'react';
import { MdMenu, MdClose } from 'react-icons/md';
import {
  BsColumnsGap,
  BsFileEarmarkText,
  BsStar,
} from 'react-icons/bs';

import './styles.css';

import Sidebar from '../../../components/MenuAdminCampus';
import Header from '../../../components/Header';
import Content from '../../../components/Content';
import Footer from '../../../components/footer';
import Description from '../../../components/DescriptionsPages';

import api from '../../../services/api';

export default function HomeCampus() {
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
      <Content toggle={toggle} bg="#f5f5f8">
        <Header toggle={toggle} color="#0B0A0D">
          <button
            onClick={handleToggleSidebar}
            className={toggle ? 'btn-active' : 'btn-disabled'}
          >
            {toggle ? (
              <MdClose size={25} color='#0B0A0D' />
            ) : (
                <MdMenu size={25} color='#0B0A0D' />
              )}</button>
        </Header>

        <div className={toggle ? 'main-disabled' : 'main-active'}>
          <Description description="Dados do sistema." color="#0B0A0D" />
          <div className='box-informations-campus'>
            <div className='box'>
              <div className='informations'>
                <p className='information'>Total de Ambientes</p>
                <p className='total'>{totalAdmins}</p>
              </div>
              <div className="box-icon">
                <BsColumnsGap size={40} color="#ffffff" />
              </div>
            </div>
            <div className='box'>
              <div className='informations'>
                <p className='information'>Total de Demandas</p>
                <p className='total'>{totalCampus}</p>
              </div>
              <div className="box-icon">
                <BsFileEarmarkText size={50} color="#ffffff" />
              </div>
            </div>
            <div className='box'>
              <div className='informations'>
                <p className='information'>Total de Feedbacks</p>
                <p className='total'>{totalAdminsNullGroup}</p>
              </div>
              <div className="box-icon">
                <BsStar size={50} color="#ffffff" />
              </div>
            </div>
          </div>

          <Description
            description="Últimos Ambientes e demandas registrados."
            tip="Role para baixo para ver mais."
            color="#0B0A0D"
          />

          <div className="lists">
            <div className="list-places">
              <ul>
                <li className="place">
                  <BsColumnsGap
                    size={24}
                    color="#0B0A0D"
                    style={{ marginLeft: '10px', marginRight: '10px' }}
                  />
                  Ambiente 01
                </li>
                <li className="place">
                  <BsColumnsGap
                    size={24}
                    color="#0B0A0D"
                    style={{ marginLeft: '10px', marginRight: '10px' }}
                  />
                  Ambiente 02
                </li>
                <li className="place">
                  <BsColumnsGap
                    size={24}
                    color="#0B0A0D"
                    style={{ marginLeft: '10px', marginRight: '10px' }}
                  />
                  Ambiente 03
                </li>
              </ul>

            </div>
            <div className="list-demands">
              <ul >
                <li className="demand">
                  <BsFileEarmarkText
                    size={24}
                    color="#0B0A0D"
                    style={{ marginLeft: '10px', marginRight: '10px' }}
                  />
                  Demanda 01
                </li>
                <li className="demand">
                  <BsFileEarmarkText
                    size={24}
                    color="#0B0A0D"
                    style={{ marginLeft: '10px', marginRight: '10px' }}
                  />
                  Demanda 02
                </li>
                <li className="demand">
                  <BsFileEarmarkText
                    size={24}
                    color="#0B0A0D"
                    style={{ marginLeft: '10px', marginRight: '10px' }}
                  />
                  Demanda 03
                </li>
              </ul>
            </div>
          </div>
        </div>
        <Footer description="© 2020 - IFCE / Front-end developed by - Samuel Lima" color="#111014" />
      </Content>
    </div>
  );
}

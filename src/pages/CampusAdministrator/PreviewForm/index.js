import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MdMenu, MdClose } from 'react-icons/md';

import './styles.css';

import IFLogo from '../../../assets/IF.png';

import Sidebar from '../../../components/MenuAdminCampus';
import Header from '../../../components/Header';
import Content from '../../../components/Content';
import Description from '../../../components/DescriptionsPages';
import Footer from '../../../components/footer';

import api from '../../../services/api';

export default function RegisterGroupOccurrences() {
  const [toggle, setToggle] = useState(true);

  function handleToggleSidebar() {
    setToggle(!toggle);
  }

  const { id } = useParams();

  useEffect(() => {

    async function loadQuestions() {
      try {
        const response = await api.get(`api/forms/show/${id}`);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    loadQuestions();

  }, [id]);


  return (
    <div className="general-container">
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

          <Description
            description="Pre-visualização de Formulário"
            tip="Área destinada para a pre-visualização dos formulários de feeback."
            color="#0B0A0D"
          />

          <div className="form-container-preview">
            <div className="form-preview">
              <div className="header-form">
                <img src={IFLogo} alt="Instituto Federal" />
                <span className="preview-title">Formulário de Feedback das resoluções de demanda.</span>
              </div>
              <div className="body-form">
                <span className="question">Questão 01</span>
                <ul className="questions-items">
                  <li >A - Reposta</li>
                  <li >B - Reposta</li>
                  <li >C - Reposta</li>
                  <li >D - Reposta</li>
                </ul>
              </div>
            </div>
          </div>

          <Footer description="© 2020 - IFCE / Developed by - Samuel Lima" color="#111014" />
        </div>
      </Content>
    </div>
  );
}

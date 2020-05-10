import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

import './styles.css';

import {
  MdMenu,
  MdClose,
} from 'react-icons/md';

import {
  BsFillReplyFill,
} from 'react-icons/bs';

import Sidebar from '../../../components/MenuAdminCampus';
import Header from '../../../components/Header';
import Content from '../../../components/Content';
import Footer from '../../../components/footer';
import Description from '../../../components/DescriptionsPages';

import api from '../../../services/api';

export default function ListDemands() {
  const [toggle, setToggle] = useState(true);
  const [demand, setDemand] = useState('');
  const [campus, setCampus] = useState('');
  const [object, setObject] = useState('');
  const [groupOccurrence, setGroupOccurrence] = useState('');
  const [photo, setPhoto] = useState('');


  function handleToggleSidebar() {
    setToggle(!toggle);
  }

  const { id } = useParams();

  useEffect(() => {
    async function loadDetails() {
      try {
        const response = await api.get(`api/occurrences/show/${id}`);
        setDemand(response.data.description);
        setCampus(response.data.campus.name);
        setObject(response.data.objects.name);
        setGroupOccurrence(response.data.group_occurrences.name);
        setPhoto(response.data.photo);
        console.log(response.data)

      } catch (error) {
        console.log(error)
      }
    }

    loadDetails();

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
              <MdClose size={25} color='#111014' />
            ) : (
                <MdMenu size={25} color='#111014' />
              )}</button>
        </Header>

        <div className={toggle ? 'main-disabled' : 'main-active'}>

          <Description
            description="Detalhes da demanda."
            tip="Área destinada para o detalhamento das demandas."
            color="#111014"
          />

          <div className="details-container-campus">
            <div className="details">
              <div className="descriptions-demands">
                <p className="demand"><span>Demanda:</span> {demand}</p>
                <p className="campus"><span>Campus:</span> {campus}</p>
                <p className="group-occurrence"><span>Grupo de ocorrência:</span> {groupOccurrence}</p>
                <p className="object"><span>Objeto:</span> {object}</p>
                <div className="actions-btn">
                  <button >
                    <Link className="link" to={`/campus/usersMaintenance/${id}`}>
                      Enviar Demanda
                    </Link>
                    <BsFillReplyFill size={20} color="#fff" />
                  </button>
                </div>
              </div>
              <div className="image-demand">
                <img src={photo} alt={demand} />
              </div>
            </div>
          </div>
        </div>
        <Footer description="© 2020 - IFCE / Front-end developed by - Samuel Lima" color="#111014" />
      </Content>
    </div >
  );
}

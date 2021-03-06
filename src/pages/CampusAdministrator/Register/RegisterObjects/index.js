import React, { useState, useEffect } from 'react';
import { MdMenu, MdClose } from 'react-icons/md';
import Swal from 'sweetalert2'

import { useHistory } from 'react-router-dom';

import '../../styles/global.css';

import Sidebar from '../../../../components/MenuAdminCampus';
import Header from '../../../../components/Header';
import Content from '../../../../components/Content';
import Description from '../../../../components/DescriptionsPages';
import Modal from '../../../../components/Modal';
import Footer from '../../../../components/footer';

import api from '../../../../services/api';

export default function RegisterObjects() {
  const [toggle, setToggle] = useState(true);
  const [nameObject, setNameObject] = useState('');
  const [places, setPlaces] = useState([]);
  const [placeId, setPlaceId] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [setErrors] = useState('');

  function handleModal() {
    setShowModal(!showModal);
  }

  function handleClose() {
    setShowModal(!showModal);
  }

  function handleToggleSidebar() {
    setToggle(!toggle);
  }


  //configuration alert
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    onOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })

  function loadAlertSuccess() {
    Toast.fire({
      icon: 'success',
      title: 'Ambiente salvo com sucesso!'
    });
  }

  function loadAlertError() {
    Toast.fire({
      icon: 'error',
      title: 'Aconteceu um erro, tente novamente!'
    });
  }

  function handleSelectPlace(e) {
    setPlaceId(e.target.value);
  }

  useEffect(() => {
    async function loadPlaces() {
      try {
        const response = await api.get('api/places/filter');
        setPlaces(response.data.data);
        console.log(response.data.data)
      } catch (error) {
        console.log(error);
      }
    }

    loadPlaces();
  }, []);

  const history = useHistory();

  async function handleRegisterObjects(e) {
    e.preventDefault();

    try {
      const response = await api.post('api/objects/', {
        name: nameObject,
        fk_place_id: placeId
      });

      if (response.status !== 201) {
        loadAlertError();
        setErrors(response.data.name);
      } else {
        loadAlertSuccess();
        history.push('/campus/listObject');
      }
    } catch (error) {
      console.log(error);
    }
  }

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
          {
            showModal ? (
              <Modal
                text="Deseja mesmo fazer isso?"
                description="Ao cancelar você será direcionado a lista de campus!"
                btnPrimaryText="Sim"
                btnSecundaryText="Não"
                btnPrimary="#00C13F"
                bg="#ffffff"
                textcolor="#111014"
                show={showModal}
                close={() => { handleClose() }}
                redirect="/master/listCampus"
              />
            ) : (
                <>
                  <Description
                    description="Registrar Objetos"
                    tip="Área destinada para o registro de novos objetos."
                    color="#0B0A0D"
                  />

                  <div className="form-container-campus">
                    <form onSubmit={e => handleRegisterObjects(e)}>
                      <div className="input-group">
                        <label>Nome do Objeto</label>
                        <input
                          type="text"
                          placeholder="Ex: Mesa"
                          onChange={e => setNameObject(e.target.value)}
                        />

                      </div>
                      <div className="select-group">
                        <label>Selecione um ambiente</label>
                        <select onChange={(e) => handleSelectPlace(e)}>
                          {
                            places.map(camp => (
                              <option key={camp.id} value={camp.id}>{camp.name}</option>
                            ))
                          }
                        </select>

                      </div>
                      <button type="submit" className="btn-register">Salvar Objeto</button>
                      <button type="button" className="btn-cancel" onClick={() => handleModal()}>Cancelar</button>
                    </form>
                  </div>
                </>
              )
          }
          <Footer description="© 2020 - IFCE / Developed by - Samuel Lima" color="#111014" />
        </div>
      </Content>
    </div>
  );
}

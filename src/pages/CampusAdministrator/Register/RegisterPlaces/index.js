import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { MdMenu, MdClose } from 'react-icons/md';
import Swal from 'sweetalert2'

import '../../styles/global.css';

import Sidebar from '../../../../components/MenuAdminCampus';
import Header from '../../../../components/Header';
import Content from '../../../../components/Content';
import Description from '../../../../components/DescriptionsPages';
import Modal from '../../../../components/Modal';
import Footer from '../../../../components/footer';

import api from '../../../../services/api';

export default function RegisterPlaces() {
  const [toggle, setToggle] = useState(true);
  const [namePlace, setNamePlace] = useState('');
  const [campus, setCampus] = useState([]);
  const [campusId, setCampusId] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState('');

  function handleModal() {
    setShowModal(!showModal);
  }

  function handleClose() {
    setShowModal(!showModal);
  }

  function handleToggleSidebar() {
    setToggle(!toggle);
  }

  const history = useHistory();

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

  function handleSelectCampus(e) {
    setCampusId(e.target.value);
  }

  useEffect(() => {
    async function loadCampus() {
      try {
        const response = await api.get('api/campus/');
        setCampus(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    loadCampus();
  }, []);

  async function handleRegisterPlace(e) {
    e.preventDefault();

    try {
      const response = await api.post('api/places/', {
        name: namePlace,
        fk_campus_id: campusId
      });

      if (response.status !== 201) {
        loadAlertError();
        setErrors(response.data.name);
      } else {
        loadAlertSuccess();
        history.push('/campus/listPlaces');
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
                textcolor="#111014"
                bg="#ffffff"
                show={showModal}
                close={() => { handleClose() }}
                redirect="/master/listCampus"
              />
            ) : (
                <>
                  <Description
                    description="Registrar Ambientes"
                    tip="Área destinada para o registro de novos ambientes."
                    color="#0B0A0D"
                  />

                  <div className="form-container-campus">
                    <form onSubmit={e => handleRegisterPlace(e)}>
                      <div className="input-group">
                        <label>Nome do Ambiente</label>
                        <input
                          type="text"
                          placeholder="Ex: Biblioteca"
                          onChange={e => setNamePlace(e.target.value)}
                        />
                        <p className="errors">{errors}</p>
                      </div>
                      <div className="select-group">
                        <label>Selecione um campus</label>
                        <select onChange={(e) => handleSelectCampus(e)}>
                          {
                            campus.map(camp => (
                              <option key={camp.id} value={camp.id}>{camp.name}</option>
                            ))
                          }
                        </select>
                        <p className="errors">{errors.fk_campus_id}</p>
                      </div>
                      <button type="submit" className="btn-register">Salvar Grupo</button>
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

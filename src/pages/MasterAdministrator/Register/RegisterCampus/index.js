import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { MdMenu, MdClose } from 'react-icons/md';
import Swal from 'sweetalert2'

import './styles.css';

import Sidebar from '../../../../components/MenuAdminMaster';
import Header from '../../../../components/Header';
import Content from '../../../../components/Content';
import Description from '../../../../components/DescriptionsPages';
import Modal from '../../../../components/Modal';

import api from '../../../../services/api';

export default function RegisterCampus() {
  const [toggle, setToggle] = useState(true);
  const [nameCampus, setNameCampus] = useState('');
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
      title: 'Campus salvo com sucesso!'
    });
  }

  function loadAlertError() {
    Toast.fire({
      icon: 'error',
      title: 'Aconteceu um erro, tente novamente!'
    });
  }

  async function handleRegisterCampus(e) {
    e.preventDefault();

    try {
      const response = await api.post('api/campus/', {
        name: nameCampus
      });

      if (response.status !== 201) {
        loadAlertError();
        setErrors(response.data.name[0]);
      } else {
        loadAlertSuccess();
        history.push('/master/listCampus');
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="general-container">
      <Sidebar toggle={toggle} bgcolor='#111014 ' />
      <Content toggle={toggle} bg="#0B0A0D">
        <Header toggle={toggle} color="#ffffff">
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
          {
            showModal ? (
              <Modal
                text="Deseja mesmo fazer isso?"
                description="Ao cancelar você será direcionado a lista de campus!"
                btnPrimaryText="Sim"
                btnSecundaryText="Não"
                btnPrimary="#00C13F"
                bg="#111014"
                show={showModal}
                close={() => { handleClose() }}
                redirect="/master/listCampus"
              />
            ) : (
                <>
                  <Description description="Registrar Campus" tip="Área destinada para o registro de novos Campus." />
                  <div className="form-container">
                    <form onSubmit={e => handleRegisterCampus(e)}>
                      <div className="input-group">
                        <label>Nome do Campus</label>
                        <input
                          type="text"
                          placeholder="Ex: Campus Cedro"
                          onChange={e => setNameCampus(e.target.value)}
                        />
                        <p className="errors">{errors}</p>
                      </div>
                      <button type="submit" className="btn-register">Salvar Campus</button>
                      <button type="button" className="btn-cancel" onClick={() => handleModal()}>Cancelar</button>
                    </form>
                  </div>
                </>
              )
          }
        </div>
      </Content>
    </div>
  );
}

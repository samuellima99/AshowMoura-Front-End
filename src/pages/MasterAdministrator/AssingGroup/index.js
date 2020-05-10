import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { MdMenu, MdClose } from 'react-icons/md';
import Swal from 'sweetalert2'

import './styles.css';

import Sidebar from '../../../components/MenuAdminMaster';
import Header from '../../../components/Header';
import Content from '../../../components/Content';
import Description from '../../../components/DescriptionsPages';
import Modal from '../../../components/Modal';

import api from '../../../services/api';

export default function RegisterCampus() {
  const [toggle, setToggle] = useState(true);
  const [fk_group_user_id, setFk_group_user_id] = useState('');
  const [showModal, setShowModal] = useState(false);

  function handleModal() {
    setShowModal(!showModal);
  }

  function handleClose() {
    setShowModal(!showModal);
  }

  const history = useHistory();
  const { id } = useParams();

  console.log(id);

  function handleToggleSidebar() {
    setToggle(!toggle);
  }

  function handleUserType(e) {
    setFk_group_user_id(e.target.value);
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
      title: 'Grupo de usuário atribuído com sucesso!'
    });
  }

  function loadAlertError() {
    Toast.fire({
      icon: 'error',
      title: 'Aconteceu um erro, tente novamente!'
    });
  }


  async function ChangeUserGroup(e) {
    e.preventDefault();

    try {
      let response = await api.get(`/api/users/show/${id}`);

      const resp = await api.put(`/api/users/changeUserType/${response.data.id}`, { fk_group_user_id });

      if (resp.status === 200) {
        loadAlertSuccess();
        history.push('/master/listAdmins');
      } else {
        loadAlertError();
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
                btnSecundary="#ff0027"
                show={showModal}
                close={() => { handleClose() }}
                redirect="/master/assignUserGroup"
              />
            ) : (
                <>
                  <Description
                    description="Atribuir Grupo de Usuário"
                    tip="Área destinada para atribuição de grupos de usuário."
                  />
                  <div className="form-container">
                    <form onSubmit={e => ChangeUserGroup(e)}>
                      <div className="select-group">
                        <label>Selecione um grupo</label>
                        <select onChange={(e) => handleUserType(e)}>
                          <option value="1">Administrador Geral</option>
                          <option value="2">Administrador de Campus</option>
                          <option value="3">Funcionário da Manutenção</option>
                        </select>
                      </div>

                      <button type="submit" className="btn-register">Atribuir Grupo</button>
                      <button type="button" className="btn-cancel" onClick={() => handleModal()} >Cancelar</button>
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

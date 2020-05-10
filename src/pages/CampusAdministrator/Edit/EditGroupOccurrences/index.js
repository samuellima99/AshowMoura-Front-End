import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
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

export default function EditGroupOccurrences() {
  const [toggle, setToggle] = useState(true);
  const [nameGroup, setNameGroup] = useState('');
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
      title: 'Grupo editado com sucesso!'
    });
  }

  function loadAlertError() {
    Toast.fire({
      icon: 'error',
      title: 'Aconteceu um erro, tente novamente!'
    });
  }

  const { id } = useParams();

  useEffect(() => {
    loadDataCampus();
    async function loadDataCampus() {
      const response = await api.get(`api/groupoccurrences/show/${id}`);
      setNameGroup(response.data.name);
    }
  }, [id]);

  const history = useHistory();

  async function handleEditGroup(e) {
    e.preventDefault();

    try {
      const response = await api.put(`api/groupoccurrences/${id}`, {
        name: nameGroup
      });

      if (response.status !== 201) {
        loadAlertError();
        setErrors(response.data.name);
      } else {
        loadAlertSuccess();
        history.push('/campus/listGroupOccurrences');
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
                    description="Editar Grupo de Ocorrência"
                    tip="Área destinada para a alteração dos dados dos grupos de ocorrência."
                    color="#0B0A0D"
                  />

                  <div className="form-container-campus">
                    <form onSubmit={e => handleEditGroup(e)}>
                      <div className="input-group">
                        <label>Nome do group</label>
                        <input
                          type="text"
                          placeholder="Ex: Infraestrutura"
                          value={nameGroup}
                          onChange={e => setNameGroup(e.target.value)}
                        />
                        <p className="errors">{errors}</p>
                      </div>
                      <button type="submit" className="btn-register">Salvar Alterações</button>
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

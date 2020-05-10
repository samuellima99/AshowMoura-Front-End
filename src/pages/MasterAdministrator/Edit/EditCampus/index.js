import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom';
import { MdMenu, MdClose } from 'react-icons/md';
import Swal from 'sweetalert2'

import './styles.css';

import Sidebar from '../../../../components/MenuAdminMaster';
import Header from '../../../../components/Header';
import Content from '../../../../components/Content';
import Description from '../../../../components/DescriptionsPages';
import Modal from '../../../../components/Modal';

import api from '../../../../services/api';

export default function EditCampus() {
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

  const history = useHistory();
  const { id } = useParams();

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
  });

  function loadAlertSuccess() {
    Toast.fire({
      icon: 'success',
      title: 'Campus editado com sucesso!'
    });
  }

  function loadAlertError() {
    Toast.fire({
      icon: 'error',
      title: 'Aconteceu um erro, tente novamente!'
    });
  }

  useEffect(() => {
    loadDataCampus();
    async function loadDataCampus() {
      const response = await api.get(`api/campus/show/${id}`);
      setNameCampus(response.data.name);
    }
  }, [id]);

  async function handleEditCampus(e) {
    e.preventDefault();
    try {
      const response = await api.put(`api/campus/${id}`, {
        name: nameCampus
      });

      if (response.status === 201) {
        loadAlertSuccess();
        history.push('/master/listCampus');
      } else {
        loadAlertError();
        setErrors(response.data.name[0]);
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
                bg="#111014"
                show={showModal}
                close={() => { handleClose() }}
                redirect="/master/listCampus"
              />
            ) : (
                <>
                  <Description
                    description="Editar Campus"
                    tip="Área destinada para edição de dados dos Campus."
                  />
                  <div className="form-container">
                    <form onSubmit={(e) => handleEditCampus(e)}>
                      <div className="input-group">
                        <label>Nome do Campus</label>
                        <input
                          type="text"
                          placeholder="Ex: Campus Cedro"
                          value={nameCampus}
                          onChange={e => setNameCampus(e.target.value)}
                        />
                        <p className="errors">
                          {errors}
                        </p>
                      </div>
                      <button type="submit" className="btn-register">Editar Campus</button>
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

import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { MdMenu, MdClose } from 'react-icons/md';
import Swal from 'sweetalert2'

import './styles.css';

import Sidebar from '../../../../components/MenuAdminMaster';
import Header from '../../../../components/Header';
import Content from '../../../../components/Content';
import Footer from '../../../../components/footer';
import Description from '../../../../components/DescriptionsPages';
import Modal from '../../../../components/Modal';


import api from '../../../../services/api';


export default function EditAdmin() {
  const [toggle, setToggle] = useState(true);
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [campusId, setFk_campus_id] = useState('');
  const [campus, setCampus] = useState([]);
  const [showModal, setShowModal] = useState(false);

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
  })

  function loadAlertSuccess() {
    Toast.fire({
      icon: 'success',
      title: 'Administrador salvo com sucesso!'
    });
  }

  function loadAlertError() {
    Toast.fire({
      icon: 'error',
      title: 'Aconteceu um erro, tente novamente!'
    });
  }

  function handleSelectCampus(e) {
    setFk_campus_id(e.target.value);
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


  useEffect(() => {
    async function loadDataAdmin() {
      const response = await api.get(`api/users/show/${id}`);
      console.log(response.data)
      setName(response.data.name);
      setCpf(response.data.cpf);
      setEmail(response.data.email);
      setFk_campus_id(response.data.fk_campus_id);
    }
    loadDataAdmin();
  }, [id, setFk_campus_id]);


  async function handleEditAdmin(e) {
    e.preventDefault();

    try {
      const response = await api.put(`api/users/${id}`, {
        name,
        email,
      });

      console.log(response)
      if (response.status !== 200) {
        loadAlertError();
      } else {
        loadAlertSuccess();
        history.push('/master/listAdmins');
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
                redirect="/master/listAdmins"
              />
            ) : (
                <>

                  <Description
                    description="Editar Administrador"
                    tip="Área destinada para a edição dos dados dos administradores de Campus."
                  />

                  <div className="form-container-admin">
                    <form onSubmit={e => handleEditAdmin(e)} className="form-admins">
                      <div className="inputs-container">
                        <div className="primary-collumn">
                          <div className="input-group-admin">
                            <label>Nome do Administrador</label>
                            <input
                              type="text"
                              placeholder="Ex: Rangel Souza"
                              value={name}
                              onChange={e => setName(e.target.value)}
                            />
                          </div>

                          <div className="input-group-admin">
                            <label>E-mail de Acesso</label>
                            <input
                              type="text"
                              placeholder="Ex: Rangel@ifce.edu.br"
                              value={email}
                              onChange={e => setEmail(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="btn-group">
                        <button
                          type="submit"
                          className="btn-register"
                        >
                          Editar
                          </button>
                      </div>
                      <div className="btn-group">
                        <button
                          type="button"
                          className="btn-cancel"
                          onClick={() => handleModal()}
                        >
                          Cancelar
                          </button>
                      </div>

                    </form>
                  </div>
                </>
              )
          }
        </div>
        <Footer description="© 2020 - IFCE / Developed by - Samuel Lima" />
      </Content>
    </div>
  );
}

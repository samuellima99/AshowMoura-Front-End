import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
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


export default function RegisterAdmin() {
  const [toggle, setToggle] = useState(true);
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fk_campus_id, setFk_campus_id] = useState('');
  const [campus, setCampus] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState([]);

  function handleModal() {
    setShowModal(!showModal);
  }

  function handleClose() {
    setShowModal(!showModal);
  }

  const history = useHistory();

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

  async function handleRegisterAdmin(e) {
    e.preventDefault();

    try {
      const response = await api.post('api/register', {
        name: name,
        cpf,
        email,
        password,
        fk_campus_id
      });

      if (response.status === 200) {
        loadAlertError();
        setErrors(response.data.errors);
      } else {
        loadAlertSuccess();
        history.push('/master/listAdmins');
      }
    } catch (error) {
      console.log(error.message);
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
                redirect="/master/listAdmins"
              />
            ) : (
                <>
                  <Description
                    description="Registrar Administrador"
                    tip="Área destinada para o registro de novos administradores de Campus."
                  />

                  <div className="form-container-admin">
                    <form onSubmit={e => handleRegisterAdmin(e)} className="form-admins">
                      <div className="inputs-container">
                        <div className="primary-collumn">
                          <div className="input-group-admin">
                            <label>Nome do Administrador</label>
                            <input
                              type="text"
                              placeholder="Ex: Rangel Souza"
                              onChange={e => setName(e.target.value)}
                            />
                            {errors.map((error) => (
                              <p className="errors">{error.name}</p>
                            ))}
                          </div>
                          <div className="input-group-admin">
                            <label>CPF</label>
                            <input
                              type="text"
                              placeholder="Ex: 610.907.883-20"
                              onChange={e => setCpf(e.target.value)}
                            />
                            {errors.map((error) => (
                              <p className="errors">{error.cpf}</p>
                            ))}
                          </div>
                          <div className="input-group-admin">
                            <label>E-mail de Acesso</label>
                            <input
                              type="text"
                              placeholder="Ex: Rangel@ifce.edu.br"
                              onChange={e => setEmail(e.target.value)}
                            />
                            {errors.map((error) => (
                              <p className="errors">{error.email}</p>
                            ))}
                          </div>
                        </div>
                        <div className="secundary-collumn">
                          <div className="input-group-admin">
                            <label>Senha de Acesso</label>
                            <input
                              type="password"
                              placeholder="Ex: _*2020R"
                              onChange={e => setPassword(e.target.value)}
                            />
                            {errors.map((error) => (
                              <p className="errors">{error.password}</p>
                            ))}
                          </div>
                          <div className="select-group">
                            <label>Selecionar Campus</label>
                            <select onChange={(e) => handleSelectCampus(e)}>
                              {
                                campus.map(camp => (
                                  <option key={camp.id} value={camp.id}>{camp.name}</option>
                                ))
                              }
                            </select>
                            {errors.map((error) => (
                              <p className="errors">{error.fk_campus_id}</p>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="btn-container">
                        <div className="btn-group">
                          <button type="submit" className="btn-register">Salvar Administrador</button>
                        </div>
                        <div className="btn-group">
                          <button type="button" className="btn-cancel" onClick={() => handleModal()}>Cancelar</button>
                        </div>
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

import React, { useState } from 'react';
import { MdMenu, MdClose } from 'react-icons/md';
import Swal from 'sweetalert2'

import './styles.css';

import Home from '../../../../assets/home.svg';
import Campus from '../../../../assets/campus.svg';
import Administrators from '../../../../assets/administrators.svg';

import Sidebar from '../../../../components/Sidebar';
import Menu from '../../../../components/Sidebar/Menu'
import MenuItem from '../../../../components/Sidebar/MenuItem';
import Header from '../../../../components/Header';
import Content from '../../../../components/Content';

import api from '../../../../services/api';

export default function RegisterCampus() {
  const [toggle, setToggle] = useState(true);
  const [nameCampus, setNameCampus] = useState('');

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
      title: 'Campus Salvo com sucesso!'
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
    console.log(nameCampus)

    try {
      const response = await api.post('api/campus/', {
        name: nameCampus
      });

      console.log(response)
      if (response.status !== 201) {
        loadAlertError();
      } else {
        loadAlertSuccess();
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="general-container">
      <Sidebar toggle={toggle} bgcolor='#111014 '>
        <Menu>
          <MenuItem menuicon={Home} title="Home" />
          <MenuItem menuicon={Campus} title="Campus" link="/master/registerCampus" />
          <MenuItem menuicon={Administrators} title="Administradores" />
        </Menu>
      </Sidebar>

      <Content toggle={toggle}>
        <Header toggle={toggle} user='Samuel'>
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
          <div className='description-page'>
            <h6 className='description'>Registrar Campus</h6>
            <p className='informative'>Área destinada para o registro de Campus.</p>
          </div>
          <div className="form-register">
            <form onSubmit={e => handleRegisterCampus(e)}>
              <div className="input-group">
                <label>Nome do Campus</label>
                <input
                  type="text"
                  placeholder="Ex: Campus Cedro"
                  onChange={e => setNameCampus(e.target.value)}
                />
              </div>
              <button type="submit" className="btn-register-campus">Salvar Campus</button>
              <button type="submit" className="btn-cancel-campus">Cancelar</button>
            </form>
          </div>
        </div>
      </Content>
    </div>
  );
}

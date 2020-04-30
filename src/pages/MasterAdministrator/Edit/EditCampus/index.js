import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom';
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

export default function EditCampus() {
  const [toggle, setToggle] = useState(true);
  const [nameCampus, setNameCampus] = useState('');

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
      } else {
        loadAlertError()
      }
    } catch (error) {
      console.log(error);
    }
  }

  function cancel() {
    history.goBack();
  }

  return (
    <div className="general-container">
      <Sidebar toggle={toggle} bgcolor='#111014 '>
        <Menu>
          <MenuItem menuicon={Home} title="Home" />
          <MenuItem menuicon={Campus} title="Campus" link="/master/listCampus" />
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
            <h6 className='description'>Editar Campus</h6>
            <p className='informative'>Área destinada para edição de dados dos Campus.</p>
          </div>
          <div className="form-register">
            <form onSubmit={(e) =>  handleEditCampus(e) }>
              <div className="input-group">
                <label>Nome do Campus</label>
                <input
                  type="text"
                  placeholder="Ex: Campus Cedro"
                  value={nameCampus}
                  onChange={e => setNameCampus(e.target.value)}
                />
              </div>
              <button type="submit" className="btn-register-campus">Editar Campus</button>
              <button type="button" className="btn-cancel-campus" onClick={cancel}>Cancelar</button>
            </form>
          </div>
        </div>
      </Content>
    </div>
  );
}

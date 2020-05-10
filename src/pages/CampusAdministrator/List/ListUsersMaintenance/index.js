import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Swal from 'sweetalert2'

import '../../styles/global.css';

import {
  MdMenu,
  MdClose,
} from 'react-icons/md';

import {
  BsSearch,
  BsBoxArrowInUp
} from 'react-icons/bs';

import Sidebar from '../../../../components/MenuAdminCampus';
import Header from '../../../../components/Header';
import Content from '../../../../components/Content';
import Footer from '../../../../components/footer';
import Description from '../../../../components/DescriptionsPages';
import Pagination from '../../../../components/Pagination';

import Table from '../../../../components/Table';
import Thead from '../../../../components/Table/Thead';
import Tbody from '../../../../components/Table/Tbody';
import Tr from '../../../../components/Table/Tr';
import Th from '../../../../components/Table/Th';
import Td from '../../../../components/Table/Td';

import api from '../../../../services/api';

export default function ListDemands() {
  const [toggle, setToggle] = useState(true);
  const [userMaintenance, setUserMaintenance] = useState([]);
  const [photoDemand, setPhotoDemand] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState('');
  const [search, setSearch] = useState('');

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

  function loadAlertSuccess(username) {
    Toast.fire({
      icon: 'success',
      title: `Demanda enviada ao funcionário ${username}`
    });
  }

  function loadAlertError() {
    Toast.fire({
      icon: 'error',
      title: 'Aconteceu um erro, tente novamente!'
    });
  }

  function handleToggleSidebar() {
    setToggle(!toggle);
  }

  function prevPage() {
    if (currentPage === 1) {
      return;
    } else {
      const prevPage = currentPage - 1;
      setCurrentPage(prevPage);
    }
  }

  function NextPage() {
    if (currentPage === lastPage) {
      return;
    } else {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
    }
  }

  useEffect(() => {
    async function loadUsers() {
      try {
        const response = await api.get(`api/users/searchUserMaintenance?page=${currentPage}`);
        setUserMaintenance(response.data.data);
        setCurrentPage(response.data.current_page);
        setLastPage(response.data.last_page);
        console.log(response)
      } catch (error) {
        console.log(error)
      }
    }

    loadUsers();

  }, [currentPage]);

  useEffect(() => {
    async function filterUser() {
      try {
        const response = await api.get(`api/users/searchUserMaintenance?name=${search}`);
        setUserMaintenance(response.data.data);
      } catch (error) {
        console.log(error)
      }
    }

    filterUser();

  }, [search]);

  function updateSearch(e) {
    setSearch(e.target.value.substr(0, 20));
  }

  const { id } = useParams();

  useEffect(() => {
    async function showInformationDemands() {
      try {
        const response = await api.get(`api/occurrences/show/${id}`);
        setPhotoDemand(response.data.photo);
      } catch (error) {
        console.log(error);
      }
    }

    showInformationDemands();
  }, [id]);

  async function assingDemand(idUser, userName) {
    try {
      const response = await api.post(`api/occurrences/forward/${id}`, {
        photo: photoDemand,
        fk_user_responsability: idUser
      });

      if (response.status === 201) {
        loadAlertSuccess(userName);
      } else {
        loadAlertError();
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
              <MdClose size={25} color='#111014' />
            ) : (
                <MdMenu size={25} color='#111014' />
              )}</button>
        </Header>

        <div className={toggle ? 'main-disabled' : 'main-active'}>

          <Description
            description="Lista de Funcionários da Manutenção."
            tip="Área destinada para o listagem dos funcionários da manutenção."
            color="#111014"
          />

          <div className="table-container-campus">
            <div className="table">

              <div className="actions">
                <div className="input-op-group">
                  <BsSearch size={18} color="#111014" style={{ position: 'absolute', marginLeft: '20px' }} />
                  <input
                    type="search"
                    placeholder="Buscar funcionário..."
                    value={search}
                    onChange={updateSearch.bind(this)}
                  />
                </div>
              </div>

              <Table>
                <Thead>
                  <Tr color="#2CC464">
                    <Th></Th>
                    <Th>Nome</Th>
                    <Th>Cpf</Th>
                    <Th>Atribuir Demanda</Th>
                  </Tr>
                </Thead>
                <Tbody color="#ffffff">
                  {userMaintenance.map(user => (
                    <Tr key={user.id}>
                      <Td
                        color="#111014"
                      >
                        {user.id}
                      </Td>
                      <Td
                        color="#111014"
                      >
                        {user.name}
                      </Td>
                      <Td
                        color="#111014"
                      >
                        {user.cpf}
                      </Td>
                      <Td>
                        <Link to="#" onClick={() => assingDemand(user.id, user.name)} className="btn-actions">
                          <BsBoxArrowInUp size={20} color="#3708bc" />
                        </Link>
                      </Td>
                    </Tr>
                  ))
                  }
                </Tbody>
              </Table>

              <Pagination
                prev={() => { prevPage() }}
                next={() => { NextPage() }}
                currentPage={currentPage}
                total={lastPage}
                colorBtn="#2CC464"
                colorText="#111014"
              />
            </div>
          </div>
        </div>
        <Footer description="© 2020 - IFCE / Front-end developed by - Samuel Lima" color="#111014" />
      </Content>
    </div >
  );
}

import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {
  MdMenu,
  MdClose,
  MdAdd, MdLink,
  MdLowPriority,
  MdCreate,
  MdDeleteSweep
} from 'react-icons/md';

import { BsSearch } from 'react-icons/bs';

import '../../styles/global.css';

import Sidebar from '../../../../components/MenuAdminMaster';
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

export default function ListAdmins() {
  const [toggle, setToggle] = useState(true);
  const [admins, setAdmins] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState('');
  const [search, setSearch] = useState('');

  const history = useHistory();

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
    async function loadAdmins() {
      try {
        const response = await api.get(`api/users/searchAdmCampus?page=${currentPage}`);
        setAdmins(response.data.data);
        setCurrentPage(response.data.current_page);
        setLastPage(response.data.last_page);
        console.log(response)
      } catch (error) {
        console.log(error)
      }
    }

    loadAdmins();

  }, [currentPage]);

  useEffect(() => {
    async function filterAdmin() {
      try {
        const response = await api.get(`api/users/searchAdmCampus?name=${search}`);
        setAdmins(response.data.data);
      } catch (error) {
        console.log(error)
      }
    }

    filterAdmin();

  }, [search]);

  function updateSearch(e) {
    setSearch(e.target.value.substr(0, 20));
  }

  async function RemoveUserGroup(id) {
    try {
      await api.put(`api/users/removeUserType/${id}`);

      setAdmins(admins.filter(admin => admin.id !== id));

      history.push('/master/assignUserGroup');

    } catch (err) {
      alert("erro ao exluír atendente!");
    }
  }

  async function DeleteAdmin(id) {
    try {
      await api.delete(`api/users/${id}`);
      setAdmins(admins.filter(admin => admin.id !== id));

    } catch (err) {
      alert("erro ao exluír campus!");
    }
  }

  return (
    <div className="general-container">
      <Sidebar toggle={toggle} />
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

          <Description
            description="Lista de Administradores"
            tip="Área destinada para o listagem dos administradores de Campus."
          />

          <div className="table-container">
            <div className="table">

              <div className="actions">
                <div className="input-op-group-master">
                  <BsSearch size={18} color="#ffffff" style={{ position: 'absolute', marginLeft: '20px' }} />
                  <input
                    type="search"
                    placeholder="Buscar Admin..."
                    value={search}
                    onChange={updateSearch.bind(this)}
                  />
                </div>
                <div className="options">
                  <div className="btn-op-group-master">
                    <Link to="/master/registerAdmin" className="op-link-master">
                      <MdAdd
                        size={24}
                        color="#3708bc"
                        style={{ marginRight: '10px' }}
                      />
                      Adicionar
                    </Link>
                  </div>
                  <div className="btn-op-group-master">
                    <Link to="/master/assignUserGroup" className="op-link-master">
                      <MdLink
                        size={24}
                        color="#ff0027"
                        style={{ marginRight: '10px' }}
                      />
                      Atribuir Grupo
                    </Link>
                  </div>
                </div>
              </div>

              <Table>
                <Thead>
                  <Tr>
                    <Th></Th>
                    <Th>Nome</Th>
                    <Th>CPF</Th>
                    <Th>Campus</Th>
                    <Th>Desatribuir</Th>
                    <Th>Editar</Th>
                    <Th>Excluír</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {admins.map(admin => (
                    <Tr key={admin.id}>
                      <Td>{admin.id}</Td>
                      <Td>{admin.name}</Td>
                      <Td>{admin.cpf}</Td>
                      <Td>{admin.campus.name}</Td>
                      <Td>
                        <Link onClick={() => RemoveUserGroup(admin.id)} className="btn-actions-master">
                          <MdLowPriority size={20} color="#ffffff" />
                        </Link>
                      </Td>
                      <Td>
                        <Link to={`/master/editAdmins/${admin.id}`} className="btn-actions-master">
                          <MdCreate size={20} color="#ffffff" />
                        </Link>
                      </Td>
                      <Td>
                        <Link className="btn-actions-master" onClick={() => DeleteAdmin(admin.id)}>
                          <MdDeleteSweep size={20} color="#ff0027" />
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
              />
            </div>
          </div>
        </div>
        <Footer description="© 2020 - IFCE / Developed by - Samuel Lima" />
      </Content>
    </div >
  );
}

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MdMenu, MdClose, MdAdd } from 'react-icons/md';
import { BsSearch, BsTrash, BsPencil } from 'react-icons/bs';

import '../../styles/global.css';

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

export default function ListGroupOccorrences() {
  const [toggle, setToggle] = useState(true);
  const [groupOccurrences, setGroupOccurrences] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState('');
  const [search, setSearch] = useState('');


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
    async function loadgroups() {
      try {
        const response = await api.get(`api/groupoccurrences/searchDemands?page=${currentPage}`);
        setGroupOccurrences(response.data.data);
        setCurrentPage(response.data.current_page);
        setLastPage(response.data.last_page);
        console.log(response)
      } catch (error) {
        console.log(error)
      }
    }

    loadgroups();

  }, [currentPage]);

  useEffect(() => {
    async function filtergroups() {
      try {
        const response = await api.get(`api/groupoccurrences/searchDemands?name=${search}`);
        setGroupOccurrences(response.data.data);
      } catch (error) {
        console.log(error)
      }
    }

    filtergroups();

  }, [search]);

  function updateSearch(e) {
    setSearch(e.target.value.substr(0, 20));
  }

  async function DeleteGroup(id) {
    try {
      await api.delete(`api/groupoccurrences/${id}`);
      setGroupOccurrences(groupOccurrences.filter(group => group.id !== id));

    } catch (err) {
      alert("erro ao exluír Grupo!");
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
            description="Lista de Grupos de Ocorrência."
            tip="Área destinada para o listagem dos grupos de ocoreência."
            color="#111014"
          />

          <div className="table-container-campus">
            <div className="table">

              <div className="actions">
                <div className="input-op-group">
                  <BsSearch size={18} color="#111014" style={{ position: 'absolute', marginLeft: '20px' }} />
                  <input
                    type="search"
                    placeholder="Buscar Admin..."
                    value={search}
                    onChange={updateSearch.bind(this)}
                  />
                </div>
                <div className="options">
                  <div className="btn-op-group">
                    <Link to="/campus/registerGroupOccurrences" className="op-link">
                      <MdAdd
                        size={24}
                        color="#3708bc"
                        style={{ marginRight: '10px' }}
                      />
                      Adicionar
                    </Link>
                  </div>
                </div>
              </div>

              <Table>
                <Thead>
                  <Tr color="#2CC464">
                    <Th></Th>
                    <Th>Nome</Th>
                    <Th>Editar</Th>
                    <Th>Excluír</Th>
                  </Tr>
                </Thead>
                <Tbody color="#ffffff">
                  {groupOccurrences.map(group => (
                    <Tr key={group.id}>
                      <Td
                        color="#111014"
                      >
                        {group.id}
                      </Td>
                      <Td
                        color="#111014"
                      >
                        {group.name}
                      </Td>
                      <Td>
                        <Link to={`/campus/EditGroupOccurrences/${group.id}`} className="btn-actions">
                          <BsPencil size={20} color="#3708bc" />
                        </Link>
                      </Td>
                      <Td>
                        <Link className="btn-actions" onClick={() => DeleteGroup(group.id)}>
                          <BsTrash size={20} color="#3708bc" />
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

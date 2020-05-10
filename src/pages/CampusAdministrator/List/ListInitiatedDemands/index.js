import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import '../../styles/global.css';

import {
  MdMenu,
  MdClose,
} from 'react-icons/md';

import {
  BsSearch,
  BsCheckCircle,
  BsFileEarmarkText,
  BsFillPipFill,
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

export default function ListInitiatedDemands() {
  const [toggle, setToggle] = useState(true);
  const [initiatedDemands, setInitiatedDemands] = useState([]);
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
    async function loadInitiatedDemands() {
      try {
        const response = await api.get(`api/occurrences/filterForwardInitDemands?page=${currentPage}`);
        setInitiatedDemands(response.data.data);
        setCurrentPage(response.data.current_page);
        setLastPage(response.data.last_page);
        console.log(response.data)
      } catch (error) {
        console.log(error)
      }
    }

    loadInitiatedDemands();

  }, [currentPage]);

  useEffect(() => {
    async function filterInitiatedDemands() {
      try {
        const response = await api.get(`api/occurrences/filterForwardInitDemands?name=${search}`);
        setInitiatedDemands(response.data.data);
      } catch (error) {
        console.log(error)
      }
    }

    filterInitiatedDemands();

  }, [search]);

  function updateSearch(e) {
    setSearch(e.target.value.substr(0, 20));
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
            description="Lista de Demandas Iniciadas."
            tip="Área destinada para o listagem das demandas iniciadas."
            color="#111014"
          />

          <div className="table-container-campus">
            <div className="table">

              <div className="actions">
                <div className="input-op-group">
                  <BsSearch size={18} color="#111014" style={{ position: 'absolute', marginLeft: '20px' }} />
                  <input
                    type="search"
                    placeholder="Buscar demanda..."
                    value={search}
                    onChange={updateSearch.bind(this)}
                  />
                </div>
                <div className="options">
                  <div className="btn-op-group">
                    <Link to="/campus/listDemands" className="op-link">
                      <BsFileEarmarkText
                        size={24}
                        color="#3708bc"
                        style={{ marginRight: '10px' }}
                      />
                      Abertas
                    </Link>
                  </div>
                  <div className="btn-op-group">
                    <Link to="/campus/listCompletedDemands" className="op-link">
                      <BsCheckCircle
                        size={24}
                        color="#2cc464"
                        style={{ marginRight: '10px' }}
                      />
                     Finalizadas
                    </Link>
                  </div>
                </div>
              </div>

              <Table>
                <Thead>
                  <Tr color="#2CC464">
                    <Th></Th>
                    <Th>Demanda</Th>
                    <Th>Responsável</Th>
                    <Th>Detalhes</Th>
                  </Tr>
                </Thead>
                <Tbody color="#ffffff">
                  {initiatedDemands.map(demand => (
                    <Tr key={demand.id}>
                      <Td
                        color="#111014"
                      >
                        {demand.id}
                      </Td>
                      <Td
                        color="#111014"
                      >
                        {demand.occurrences.description}
                      </Td>
                      <Td
                        color="#111014"
                      >
                        {demand.users_responsability.name}
                      </Td>
                      <Td>
                        <Link to={`/campus/detailsDemands/${demand.id}`} className="btn-actions">
                          <BsFillPipFill size={20} color="#3708bc" />
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

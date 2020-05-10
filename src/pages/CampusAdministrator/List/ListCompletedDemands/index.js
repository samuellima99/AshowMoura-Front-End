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
  BsClockHistory
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

export default function ListCompletedDemands() {
  const [toggle, setToggle] = useState(true);
  const [completedDemands, setCompletedDemands] = useState([]);
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
    async function loadCompletedDemands() {
      try {
        const response = await api.get(`api/occurrences/filterForwardCloseDemands?page=${currentPage}`);
        setCompletedDemands(response.data.data);
        setCurrentPage(response.data.current_page);
        setLastPage(response.data.last_page);
        console.log(response.data)
      } catch (error) {
        console.log(error)
      }
    }

    loadCompletedDemands();

  }, [currentPage]);

  useEffect(() => {
    async function filterCompletedDemands() {
      try {
        const response = await api.get(`api/occurrences/filterForwardCloseDemands?name=${search}`);
        setCompletedDemands(response.data.data);
      } catch (error) {
        console.log(error)
      }
    }

    filterCompletedDemands();

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
            description="Lista de Demandas Finalizadas."
            tip="Área destinada para o listagem das demandas finalizadas."
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
                    <Link to="/campus/listInitiatedDemands" className="op-link">
                      <BsClockHistory
                        size={24}
                        color="#3708bc"
                        style={{ marginRight: '10px' }}
                      />
                     Iniciadas
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
                  </Tr>
                </Thead>
                <Tbody color="#ffffff">
                  {completedDemands.map(demand => (
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

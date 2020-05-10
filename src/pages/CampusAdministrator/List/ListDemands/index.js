import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'

import '../../styles/global.css';

import {
  MdMenu,
  MdClose,
} from 'react-icons/md';

import {
  BsSearch,
  BsCheckCircle,
  BsClockHistory,
  BsPip,
  BsReply,
  BsCheckBox,
  BsFileEarmarkArrowUp
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
  const [Demands, setDemands] = useState([]);
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
    async function loadDemands() {
      try {
        const response = await api.get(`api/occurrences/filterDemands?page=${currentPage}`);
        setDemands(response.data.data);
        setCurrentPage(response.data.current_page);
        setLastPage(response.data.last_page);
        console.log(response)
      } catch (error) {
        console.log(error)
      }
    }

    loadDemands();

  }, [currentPage]);

  useEffect(() => {
    async function filterDemands() {
      try {
        const response = await api.get(`api/occurrences/filterDemands?name=${search}`);
        setDemands(response.data.data);
      } catch (error) {
        console.log(error)
      }
    }

    filterDemands();

  }, [search]);

  function updateSearch(e) {
    setSearch(e.target.value.substr(0, 20));
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
      title: 'Demanda finalizada com sucesso!'
    });
  }

  function loadAlertError() {
    Toast.fire({
      icon: 'error',
      title: 'Aconteceu um erro, tente novamente!'
    });
  }


  async function finishDemand(id) {
    try {
      const response = await api.post(`api/occurrences/finishOccurrence/${id}`);
      console.log(response);
      if (response.status === 200) {
        loadAlertSuccess();
      } else {
        loadAlertError();
      }
    } catch (error) {
      console.log(error)
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
            description="Lista de Demandas."
            tip="Área destinada para o listagem das demandas."
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
                    <Link to="/campus/listInitiatedDemands" className="op-link">
                      <BsClockHistory
                        size={24}
                        color="#3708bc"
                        style={{ marginRight: '10px' }}
                      />
                      Iniciadas
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
                    <Th>Campus</Th>
                    <Th>Detalhes</Th>
                    <Th>Encaminhar</Th>
                    <Th>Finalizar</Th>
                    <Th>Enviar Feedback</Th>
                  </Tr>
                </Thead>
                <Tbody color="#ffffff">
                  {Demands.map(demand => (
                    <Tr key={demand.id}>
                      <Td
                        color="#111014"
                      >
                        {demand.id}
                      </Td>
                      <Td
                        color="#111014"
                      >
                        {demand.description}
                      </Td>
                      <Td
                        color="#111014"
                      >
                        {demand.campus.name}
                      </Td>
                      <Td>
                        <Link to={`/campus/detailsDemands/${demand.id}`} className="btn-actions">
                          <BsPip size={20} color="#3708bc" />

                        </Link>
                      </Td>
                      <Td>
                        <Link to={`/campus/usersMaintenance/${demand.id}`} className="btn-actions">
                          <BsReply size={20} color="#3708bc" />
                        </Link>
                      </Td>
                      <Td>
                        <Link to="#" className="btn-actions" onClick={() => finishDemand(demand.id)}>
                          <BsCheckBox size={20} color="#3708bc" />
                        </Link>
                      </Td>
                      <Td>
                        <Link to={`/campus/usersMaintenance/${demand.id}`} className="btn-actions">
                          <BsFileEarmarkArrowUp size={20} color="#3708bc" />
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

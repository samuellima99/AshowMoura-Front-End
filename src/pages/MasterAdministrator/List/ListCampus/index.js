import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MdMenu, MdClose, MdAdd, MdLink } from 'react-icons/md';
import { BsSearch, BsTrash, BsPencil } from 'react-icons/bs';

import './styles.css';

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

export default function ListCampus() {
  const [toggle, setToggle] = useState(true);
  const [campus, setCampus] = useState([]);
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
    async function loadCampus() {
      try {
        const response = await api.get(`api/campus/filter?page=${currentPage}`);
        setCampus(response.data.data);
        setCurrentPage(response.data.current_page);
        setLastPage(response.data.last_page);
        console.log(response)
      } catch (error) {
        console.log(error)
      }
    }

    loadCampus();

  }, [currentPage]);

  useEffect(() => {
    async function filterCampus() {
      try {
        const response = await api.get(`api/campus/filter?name=${search}`);
        setCampus(response.data.data);
      } catch (error) {
        console.log(error)
      }
    }

    filterCampus();

  }, [search]);

  function updateSearch(e) {
    setSearch(e.target.value.substr(0, 20));
  }

  async function DeleteCampus(id) {
    try {
      await api.delete(`api/campus/${id}`);
      setCampus(campus.filter(camp => camp.id !== id));

    } catch (err) {
      alert("erro ao exluír campus!");
    }
  }


  return (
    <div className="general-container">
      <Sidebar toggle={toggle} />
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

          <Description
            description="Lista de Campus"
            tip="Área destinada para o listagem dos Campus."
          />

          <div className="table-container">
            <div className="table">

              <div className="actions">
                <div className="input-op-group">
                  <BsSearch size={20} color="#111014" style={{position: 'absolute', marginLeft: '20px'}} />
                  <input
                    type="search"
                    placeholder="Buscar..."
                    value={search}
                    onChange={updateSearch.bind(this)}
                  />
                </div>
                <div className="options">
                  <div className="btn-op-group">
                    <Link to="/master/registerCampus" className="op-link">
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
                  <Tr>
                    <Th></Th>
                    <Th>Nome</Th>
                    <Th>Editar</Th>
                    <Th>Excluír</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {campus.map(camp => (
                    <Tr key={camp.id}>
                      <Td>{camp.id}</Td>
                      <Td>{camp.name}</Td>
                      <Td>
                        <Link to={`/master/editCampus/${camp.id}`} className="btn-actions">
                          <BsPencil size={20} color="#ffffff" />
                        </Link>
                      </Td>
                      <Td>
                        <Link className="btn-actions" onClick={() => DeleteCampus(camp.id)}>
                          <BsTrash size={20} color="#ff1100" />
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
      </Content>
    </div >
  );
}

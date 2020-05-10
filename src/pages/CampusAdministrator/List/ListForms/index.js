import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import '../../styles/global.css';

import {
  MdMenu,
  MdClose,
} from 'react-icons/md';

import {
  BsSearch,
  BsPlus,
  BsFileEarmarkText,
  BsTrash
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

export default function ListForms() {
  const [toggle, setToggle] = useState(true);
  const [forms, setForms] = useState([]);
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
    async function loadForms() {
      try {
        const response = await api.get(`api/forms/filter?page=${currentPage}`);
        setForms(response.data.data);
        setCurrentPage(response.data.current_page);
        setLastPage(response.data.last_page);
        console.log(response.data)
      } catch (error) {
        console.log(error)
      }
    }

    loadForms();

  }, [currentPage]);

  useEffect(() => {
    async function filterDemands() {
      try {
        const response = await api.get(`api/forms/filter?name=${search}`);
        setForms(response.data.data);
      } catch (error) {
        console.log(error)
      }
    }

    filterDemands();

  }, [search]);

  function updateSearch(e) {
    setSearch(e.target.value.substr(0, 20));
  }

  async function DeleteForm(id) {
    try {
      await api.delete(`api/objects/${id}`);
      setForms(forms.filter(form => form.id !== id));

    } catch (err) {
      alert("erro ao exluír formulário!");
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
            description="Lista de fomulários criados."
            tip="Área destinada para o listagem dos formulários de feedback."
            color="#111014"
          />

          <div className="table-container-campus">
            <div className="table">

              <div className="actions">
                <div className="input-op-group">
                  <BsSearch size={18} color="#111014" style={{ position: 'absolute', marginLeft: '20px' }} />
                  <input
                    type="search"
                    placeholder="Buscar formulário..."
                    value={search}
                    onChange={updateSearch.bind(this)}
                  />
                </div>
                <div className="options">
                  <div className="btn-op-group">
                    <Link to="/campus/registerForm" className="op-link">
                      <BsPlus
                        size={24}
                        color="#3708bc"
                        style={{ marginRight: '10px' }}
                      />
                      Novo Form
                    </Link>
                  </div>
                </div>
              </div>

              <Table>
                <Thead>
                  <Tr color="#2CC464">
                    <Th></Th>
                    <Th>Nome</Th>
                    <Th>Visualizar</Th>
                    <Th>Deletar</Th>
                  </Tr>
                </Thead>
                <Tbody color="#ffffff">
                  {forms.map(form => (
                    <Tr key={form.id}>
                      <Td
                        color="#111014"
                      >
                        {form.id}
                      </Td>
                      <Td
                        color="#111014"
                      >
                        {form.name}
                      </Td>
                      <Td>
                        <Link to={`/campus/previewForm/${form.id}`} className="btn-actions">
                          <BsFileEarmarkText size={20} color="#3708bc" />
                        </Link>
                      </Td>
                      <Td>
                        <Link className="btn-actions" onClick={() => DeleteForm(form.id)}>
                          <BsTrash size={20} color="#ff0027" />
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

import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { MdMenu, MdClose } from 'react-icons/md';
import Swal from 'sweetalert2'

import './styles.css';
import '../../styles/global.css';

import Sidebar from '../../../../components/MenuAdminCampus';
import Header from '../../../../components/Header';
import Content from '../../../../components/Content';
import Description from '../../../../components/DescriptionsPages';
import Modal from '../../../../components/Modal';
import Footer from '../../../../components/footer';

import api from '../../../../services/api';

export default function RegisterFormQuestion() {
  const [toggle, setToggle] = useState(true);
  const [nameQuestion, setNameQuestion] = useState('');
  const [forms, setForms] = useState([]);
  const [formId, setFormId] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [setErrors] = useState('');

  function handleModal() {
    setShowModal(!showModal);
  }

  function handleClose() {
    setShowModal(!showModal);
  }

  function handleToggleSidebar() {
    setToggle(!toggle);
  }

  const history = useHistory();

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
      title: 'Questão adicionada com sucesso!'
    });
  }

  function loadAlertError() {
    Toast.fire({
      icon: 'error',
      title: 'Aconteceu um erro, tente novamente!'
    });
  }

  function handleSelectForm(e) {
    setFormId(e.target.value);
  }

  useEffect(() => {
    async function loadForms() {
      try {
        const response = await api.get('api/forms/search/');
        setForms(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    loadForms();
  }, []);

  async function handleRegisterFormQuestions(e) {
    e.preventDefault();
    console.log(formId, nameQuestion)
    try {
      const response = await api.post('api/questionforms/', {
        name: nameQuestion,
        fk_form_id: formId
      });

      if (response.status !== 201) {
        loadAlertError();
        setErrors(response.data.name);
      } else {
        loadAlertSuccess();
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
              <MdClose size={25} color='#0B0A0D' />
            ) : (
                <MdMenu size={25} color='#0B0A0D' />
              )}</button>
        </Header>

        <div className={toggle ? 'main-disabled' : 'main-active'}>
          {
            showModal ? (
              <Modal
                text="Deseja mesmo fazer isso?"
                description="Ao cancelar você será direcionado a lista de campus!"
                btnPrimaryText="Sim"
                btnSecundaryText="Não"
                btnPrimary="#00C13F"
                textcolor="#111014"
                bg="#ffffff"
                show={showModal}
                close={() => { handleClose() }}
                redirect="/master/listCampus"
              />
            ) : (
                <>
                  <Description
                    description="Registrar Questões"
                    tip="Área destinada para o registro das questões dos formulários de feedback."
                    color="#0B0A0D"
                  />

                  <div className="form-container-campus">
                    <form onSubmit={e => handleRegisterFormQuestions(e)}>
                      <div className="input-group">
                        <label>Descrição da questão</label>
                        <input
                          type="text"
                          placeholder="Ex: O que achou da resolução da demanda?"
                          onChange={e => setNameQuestion(e.target.value)}
                        />

                      </div>
                      <div className="select-group">
                        <label>Selecione um Formulário</label>
                        <select onChange={(e) => handleSelectForm(e)}>
                          {
                            forms.map(form => (
                              <option key={form.id} value={form.id}>{form.name}</option>
                            ))
                          }
                        </select>
                      </div>
                      <div className="actions-insertQuestion">
                        <button type="submit" className="btn-register">Adicionar</button>
                        <button
                          type="button"
                          className="btn-register"
                          onClick={()=>{history.push('/campus/registerQuestionItem')}}
                        >
                          Avançar
                        </button>
                      </div>
                      <button type="button" className="btn-cancel" onClick={() => handleModal()}>Cancelar</button>
                    </form>
                  </div>
                </>
              )
          }
          <Footer description="© 2020 - IFCE / Developed by - Samuel Lima" color="#111014" />
        </div>
      </Content>
    </div>
  );
}
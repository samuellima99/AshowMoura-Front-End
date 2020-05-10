import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { MdMenu, MdClose } from 'react-icons/md';
import Swal from 'sweetalert2'

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
  const [itemQuestion, setItemQuestion] = useState('');
  const [questions, setQuestions] = useState([]);
  const [questionId, setquestionId] = useState('');
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
      title: 'Item adicionado com sucesso!'
    });
  }

  function loadAlertError() {
    Toast.fire({
      icon: 'error',
      title: 'Aconteceu um erro, tente novamente!'
    });
  }

  function handleSelectQuestion(e) {
    setquestionId(e.target.value);
  }

  useEffect(() => {
    async function loadQuestions() {
      try {
        const response = await api.get('api/questionforms/');
        setQuestions(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    loadQuestions();
  }, []);

  async function handleRegisterQuestionItem(e) {
    e.preventDefault();
    console.log(itemQuestion, questionId)
    try {
      const response = await api.post('api/itensquestions/', {
        name: itemQuestion,
        fk_question_form_id: questionId
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
                    description="Registrar Item de Questão"
                    tip="Área destinada para o registro dos item de questões dos formulários de feedback."
                    color="#0B0A0D"
                  />

                  <div className="form-container-campus">
                    <form onSubmit={e => handleRegisterQuestionItem(e)}>
                      <div className="input-group">
                        <label>Descrição do item de questão</label>
                        <input
                          type="text"
                          placeholder="Ex: Item A"
                          onChange={e => setItemQuestion(e.target.value)}
                        />

                      </div>
                      <div className="select-group">
                        <label>Selecione uma questão</label>
                        <select onChange={(e) => handleSelectQuestion(e)}>
                          {
                            questions.map(question => (
                              <option key={question.id} value={question.id}>{question.name}</option>
                            ))
                          }
                        </select>
                      </div>
                      <div className="actions-insertQuestion">
                        <button type="submit" className="btn-register">Adicionar</button>
                        <button
                          type="button"
                          className="btn-register"
                          onClick={()=>{history.push('/campus/registerItems')}}
                        >
                        Finalizar
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

import React from 'react';
import { useHistory } from 'react-router-dom';
import {
  BsPeople,
  BsColumnsGap,
  BsInboxes,
  BsFileEarmarkText,
  BsStar,
  BsHouse
} from 'react-icons/bs';

import Sidebar from '../Sidebar';
import Menu from '../Sidebar/Menu';
import MenuItem from '../Sidebar/MenuItem';

import api from '../../services/api';

export default function MenuAdminMaster({ toggle }) {

  const history = useHistory();

  async function logout() {
    await api.post('api/logout');
    localStorage.clear();
    history.push('/campus/signin');
  }

  return (
    <Sidebar toggle={toggle} bgcolor='#2CC464' logout={() => logout()}>
      <Menu>
        <MenuItem
          menuicon={
            <BsHouse
              size={25}
              color="#ffffff"
              style={{ marginLeft: '10px' }}
            />
          }
          title="Home"
          link="/campus/home"
        />
        <MenuItem
          menuicon={
            <BsPeople
              size={25}
              color="#ffffff"
              style={{ marginLeft: '10px' }}
            />
          }
          title="Grupo de Ocorrências"
          link="/campus/listGroupOccurrences"
        />
        <MenuItem
          menuicon={
            <BsColumnsGap
              size={24}
              color="#ffffff"
              style={{ marginLeft: '10px' }}
            />
          }
          title="Ambientes"
          link="/campus/listPlaces"
        />
        <MenuItem
          menuicon={
            <BsInboxes
              size={24}
              color="#ffffff"
              style={{ marginLeft: '10px' }}
            />
          }
          title="Objetos"
          link="/campus/listObject"
        />
        <MenuItem
          menuicon={
            <BsFileEarmarkText
              size={25}
              color="#ffffff"
              style={{ marginLeft: '10px' }}
            />
          }
          title="Demandas"
          link="/campus/listDemands"
        />
        <MenuItem
          menuicon={
            <BsStar
              size={25}
              color="#ffffff"
              style={{ marginLeft: '10px' }}
            />
          }
          title="Feedback"
          link="/campus/listForms"
        />
      </Menu>
    </Sidebar>
  );
}

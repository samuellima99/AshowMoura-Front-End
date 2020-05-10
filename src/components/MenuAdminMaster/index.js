import React from 'react';
import { useHistory } from 'react-router-dom';
import { BsHouse, BsBuilding, BsPerson } from 'react-icons/bs';

import Sidebar from '../Sidebar';
import Menu from '../Sidebar/Menu';
import MenuItem from '../Sidebar/MenuItem';

import api from '../../services/api';

export default function MenuAdminMaster({ toggle }) {

  const history = useHistory();

  async function logout() {
    await api.post('api/logout');
    localStorage.clear();
    history.push('/master/signin');
  }

  return (
    <Sidebar toggle={toggle} bgcolor='#111014' logout={() => logout()}>
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
          link="/master/home"
        />
        <MenuItem
          menuicon={
            <BsBuilding
              size={25}
              color="#ffffff"
              style={{ marginLeft: '10px' }}
            />
          }
          title="Campus"
          link="/master/listCampus"
        />
        <MenuItem
          menuicon={
            <BsPerson
              size={25}
              color="#ffffff"
              style={{ marginLeft: '10px' }}
            />
          }
          title="Administradores"
          link="/master/listAdmins"
        />
      </Menu>
    </Sidebar>
  );
}

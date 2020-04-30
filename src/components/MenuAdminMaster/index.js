import React from 'react';

import Home from '../../assets/home.svg';
import Campus from '../../assets/campus.svg';
import Administrators from '../../assets/administrators.svg';

import Sidebar from '../Sidebar';
import Menu from '../Sidebar/Menu';
import MenuItem from '../Sidebar/MenuItem';

export default function MenuAdminMaster({toggle}) {

  return (
    <Sidebar toggle={toggle} bgcolor='#111014 '>
      <Menu>
        <MenuItem menuicon={Home} title="Home" link="/master/home" />
        <MenuItem menuicon={Campus} title="Campus" link="/master/listCampus" />
        <MenuItem menuicon={Administrators} title="Administradores" link="/master/listAdmins" />
      </Menu>
    </Sidebar>
  );
}

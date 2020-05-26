import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2'

//import icons
import {
  MdMailOutline,
  MdLockOutline,
  MdVisibility,
  MdVisibilityOff,
} from 'react-icons/md';

// import styles
import './styles.css';

// import assets
import Logo from '../../../assets/logoBranca.png';

//import services
import api from '../../../services/api';
import { login } from '../../../services/auth';


export default function SigninMaster() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const history = useHistory();

  function handlePasswordVisibility() {
    setPasswordVisibility(!passwordVisibility);
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

  function loadAlertError() {
    Toast.fire({
      icon: 'warning',
      title: 'Você não pode logar por aqui, Redirecionando...'
    });
  }

  async function handleSignIn(e) {
    e.preventDefault();
    if (!email || !password) {
      setError('Preencha e-mail e senha para continuar!');
    } else {
      try {
        setLoading(true);
        const response = await api.post('api/login', {
          email,
          password,
        });

        if (response.data.fk_group_user_id === 1) {
          setLoading(false);
          login(response.data.access_token);
          localStorage.setItem('@User', response.data.name);
          localStorage.setItem('@GroupId', response.data.fk_group_user_id);

          history.push('/master/home');
        } else {
          loadAlertError();
          localStorage.clear();

          setTimeout(() => {
            history.push('/campus/signin');
          }, 4000);
        }

      } catch (err) {
        setLoading(false);
        setError('Erro no login, verifique suas credenciais.');
      }
    }
  }
  return (
    <div className="container">
      <div className="box-signin">
        <div className="signin-left" style={{ backgroundColor: '#0A0B0D' }}>
          <div className="logo">
            <img src={Logo} alt="logo-ashow" width="250px" />
          </div>
          <p className="message">Bem vindo ao Ashowmoura</p>
        </div>
        <div className="signin-right">
          <form onSubmit={(e) => handleSignIn(e)} className="singin-form">
            <h3>Faça seu Login</h3>
            <div className="input-group" style={{ position: 'relative' }}>
              <MdMailOutline
                size={20}
                color="#888888"
                style={{ position: 'absolute', top: '13px', left: '18px' }}
              />
              <input
                type="email"
                id="email"
                autoComplete="off"
                placeholder="Digite seu e-mail"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-group" style={{ position: 'relative' }}>
              <MdLockOutline
                size={20}
                color="#888888"
                style={{ position: 'absolute', top: '13px', left: '18px' }}
              />
              <input
                type={passwordVisibility ? 'text' : 'password'}
                id="password"
                placeholder="Digite sua senha"
                onChange={(e) => setPassword(e.target.value)}
              />
              {passwordVisibility ? (
                <MdVisibility
                  onClick={handlePasswordVisibility}
                  size={20}
                  color="#888888"
                  style={{ position: 'absolute', top: '13px', left: '225px', cursor: 'pointer' }}
                />
              ) : (
                  <MdVisibilityOff
                    onClick={handlePasswordVisibility}
                    size={20}
                    color="#888888"
                    style={{ position: 'absolute', top: '13px', left: '225px', cursor: 'pointer' }}
                  />
                )}

            </div>
            {error ? <p className="messageError">{error}</p> : null}
            <div className="btn-group">
              <button
                type="submit"
                className="btn-signin"
                style={{ backgroundColor: '#0A0B0D' }}
              >
                {loading ? 'Logando...' : 'Entrar'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

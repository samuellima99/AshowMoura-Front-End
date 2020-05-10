import React from 'react';
import { useHistory } from 'react-router-dom';
import { MdHelpOutline } from 'react-icons/md';
import './styles.css';

function Modal({ text, description, btnPrimary, btnPrimaryText, show, close, redirect, bg, textcolor }) {
  const history = useHistory();

  function cancel() {
    history.push(`${redirect}`);
  }


  return (
    <div className="ModalContainer">
      <div className={show ? 'modal-active' : 'modal-disabled'} style={{ backgroundColor: `${bg}` }}>
        <div className="header">
          <button className="btn-close" onClick={close} style={{color: `${textcolor}`}} >X</button>
        </div>
        <MdHelpOutline size={80} style={{ marginTop: '2%' }} color="#FF0027" />
        <div className="texts">
          <h1 style={{color: `${textcolor}`}} className="head">{text}</h1>
          <p style={{color: `${textcolor}`}} className="desc">{description}</p>
        </div>
        <div className="BoxBtn">
          <button
            style={{ backgroundColor: `${btnPrimary}`, border: 'none' }}
            onClick={() => cancel()}
          >
            {btnPrimaryText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;

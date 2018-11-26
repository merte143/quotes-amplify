import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import './IntroModal.css';
import { Link } from "react-router-dom";

export default class IntroModal extends React.Component {

  render() {
    const { isOpen, closeModal, content } = this.props
    return (
      <div>
        <Modal onHide={() => closeModal()} show={isOpen} className='intro-modal'>
          <Modal.Header closeButton/>
          <Modal.Body>
            <h1>Welcome to Denkarium,</h1>
            <p>A place inspired by Dumbledore's pensieve in the Harry Potter movies. This is a calm place to be inspired and inspire others.</p>
            <h3>What do you want to do?</h3>
            <Link className='btn btn-primary' onClick={() => closeModal()} to={ '/' }>Read a thought</Link>
            <Link className='btn btn-link' onClick={() => closeModal()} to={ '/member' }>Submit a quote</Link>
            <Link className='btn btn-link' onClick={() => closeModal()} to={ '/about-us' }>Learn more</Link>
          </Modal.Body>
        </Modal>
      </div>
      
    )
  }
}

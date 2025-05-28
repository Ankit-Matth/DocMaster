import React, { useState } from 'react';
import { Navbar, Nav, Modal } from 'react-bootstrap';
import './Footer.css'

const Footer = () => {
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

  const handleClose = () => {
    setShowTermsModal(false);
    setShowPrivacyModal(false);
  };

  const handleShowTerms = () => setShowTermsModal(true);

  const handleShowPrivacy = () => setShowPrivacyModal(true);

  return (
    <>
      <Navbar bg="black" variant="dark" className='d-flex justify-content-between px-3 py-2'>
        <Navbar.Brand className='footerText'>&copy; DocMaster - Your Ultimate PDF Toolkit!</Navbar.Brand>
        <Nav>
          <Nav.Link className='footerText' href="#privacy-policy" style={{color: 'white', marginLeft: '0.5rem'}} onClick={handleShowPrivacy}>Privacy Policy</Nav.Link>
          <Nav.Link className='footerText' href="#terms" style={{color: 'white', marginLeft: '0.5rem'}} onClick={handleShowTerms}>Terms & Conditions</Nav.Link>
        </Nav>
      </Navbar>

      <Modal className='termsAndConditions' show={showTermsModal} onHide={handleClose} backdrop="static" keyboard={false} centered scrollable={true} dialogClassName="modal-width">
        <Modal.Header closeButton>
          <Modal.Title>Terms & Conditions</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <p>This agreement describes the conditions and rules under which we offer you our services. By using the DocMaster web app ("Services"), you are agreeing to be bound by the following terms and conditions:</p>
            <ol type='1'>
              <li>Use of the DocMaster service is at your own risk.</li>
              <li>You bear full responsibility for any data transmitted to DocMaster servers.</li>
              <li>You agree not to use the DocMaster service to upload any illegal materials.</li>
              <li>You agree not to integrate the DocMaster service into your own or 3rd party applications.</li>
              <li>You may use the DocMaster service for any purpose, personal or commercial.</li>
              <li>We reserves the right to change or cease any of services at DocMaster, at any time.</li>
              <li>We reserves the right to change the terms of this agreement without notice.</li>
              <li>The DocMaster service does not provide any guarantees.</li>
            </ol>
        </Modal.Body>
      </Modal>

      <Modal className='privacyPolicy' show={showPrivacyModal} onHide={handleClose} backdrop="static" keyboard={false} centered scrollable={true} dialogClassName="modal-width">
        <Modal.Header closeButton>
          <Modal.Title>Privacy Policy</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <p>Your privacy is important to us. It is DocMaster's policy to respect your privacy regarding any information we may collect from you across our website, https://docmaster.com, and other sites we own and operate.</p>
            <p>We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent. We also let you know why we’re collecting it and how it will be used.</p>
            <p>We only retain collected information for as long as necessary to provide you with your requested service. What data we store, we’ll protect within commercially acceptable means to prevent loss and theft, as well as unauthorized access, disclosure, copying, use or modification.</p>
            <p>Submitted data and the generated files are kept only for the time necessary to efficiently process your requests and then permanently deleted.</p>
            <p>Submitted data and the generated files will not be shared or accessed by our company, except if it is requested by law enforcement authorities.</p>
            <p>In order to improve the quality of the DocMaster service, we may save and analyze the metadata of your requests.</p>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Footer;

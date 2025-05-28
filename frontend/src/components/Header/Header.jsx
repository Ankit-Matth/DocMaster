import React, { useState } from 'react';
import { NavLink } from 'react-router-dom'; 
import Logo from '../../assets/logo.png';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './Header.css';

import pdfToJPGSvg from '../../assets/Tools/pdfToJPG.svg';
import pdfToWordSvg from '../../assets/Tools/pdfToWord.svg';
import pdfToExcelSvg from '../../assets/Tools/pdfToExcel.svg';
import pdfToPPTSvg from '../../assets/Tools/pdfToPPT.svg';
import jpgToPDFSvg from '../../assets/Tools/jpgToPDF.svg';
import wordToPDFSvg from '../../assets/Tools/wordToPDF.svg';
import excelToPDFSvg from '../../assets/Tools/excelToPDF.svg';
import pptToPDFSvg from '../../assets/Tools/pptToPDF.svg';
import mergePDFSvg from '../../assets/Tools/mergePDF.svg';
import splitPDFSvg from '../../assets/Tools/splitPDF.svg';
import compressPDFSvg from '../../assets/Tools/compressPDF.svg';
import editPDFSvg from '../../assets/Tools/editPDF.svg';

function Header() {
  const [navBarExpanded, setNavBarExpanded] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    if (showDropdown) {
      setShowDropdown(false);
      setNavBarExpanded(false);
    } else {
      setShowDropdown(true); 
    }
  };

  const toggleNavbar = () => {
    if (window.innerWidth < 768) {
      if (navBarExpanded) {
        setNavBarExpanded(false);
      } else {
        setNavBarExpanded(true);
      }
    }
  };

  return (
    <Navbar expand="md" style={{ backgroundColor: '#f5f5f5' }} id="header" sticky='top' expanded={navBarExpanded}>
      <Container fluid>
        <Navbar.Brand as={NavLink} to="home" className="px-2 d-flex justify-content-start" id='logo' style={{ width: '16%' }}>
          <img src={Logo} width="100%" alt="DocMaster logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={toggleNavbar}/>
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end px-2">
          <Nav id="nav">
            <NavDropdown
              title="All Tools"
              id="basic-nav-dropdown"
              className="navItems"
              show={showDropdown} 
              onMouseEnter={() => setShowDropdown(true)}
              onMouseLeave={() => setShowDropdown(false)}
              onClick={()=>{showDropdown ? setShowDropdown(false) : setShowDropdown(true)}}
            >
              <div className="row p-2">
                <div className="col dropDownCol">
                  <NavDropdown.Item as={NavLink} to="pdfToJPG" onClick={toggleDropdown}>
                    <img src={pdfToJPGSvg} alt="SVG" style={{ width: '14%', marginRight: '5px' }} />
                    PDF to JPG
                  </NavDropdown.Item>
                  <NavDropdown.Item as={NavLink} to="pdfToExcel" onClick={toggleDropdown}>
                   <img src={pdfToExcelSvg} alt="SVG" style={{ width: '14%', marginRight: '5px' }} />
                    PDF to Excel
                  </NavDropdown.Item>
                  <NavDropdown.Item as={NavLink} to="pdfToWord" onClick={toggleDropdown}>
                    <img src={pdfToWordSvg} alt="SVG" style={{ width: '14%', marginRight: '5px' }} />
                    PDF to Word
                  </NavDropdown.Item>
                  <NavDropdown.Item as={NavLink} to="pdfToPPT" onClick={toggleDropdown}>
                    <img src={pdfToPPTSvg} alt="SVG" style={{ width: '14%', marginRight: '5px' }} />
                    PDF to PowerPoint
                  </NavDropdown.Item>
                </div>
                <div className="col dropDownCol">
                  <NavDropdown.Item as={NavLink} to="jpgToPDF" onClick={toggleDropdown}>
                    <img src={jpgToPDFSvg} alt="SVG" style={{ width: '14%', marginRight: '5px' }} />
                    JPG to PDF
                  </NavDropdown.Item>
                  <NavDropdown.Item as={NavLink} to="excelToPDF" onClick={toggleDropdown}>
                    <img src={excelToPDFSvg} alt="SVG" style={{ width: '14%', marginRight: '5px' }} />
                    Excel to PDF
                  </NavDropdown.Item>
                  <NavDropdown.Item as={NavLink} to="wordToPDF" onClick={toggleDropdown}>
                    <img src={wordToPDFSvg} alt="SVG" style={{ width: '14%', marginRight: '5px' }} />
                    Word to PDF
                  </NavDropdown.Item>
                  <NavDropdown.Item as={NavLink} to="pptToPDF" onClick={toggleDropdown}>
                    <img src={pptToPDFSvg} alt="SVG" style={{ width: '14%', marginRight: '5px' }} />
                    PowerPoint to PDF
                  </NavDropdown.Item>
                </div>
                <div className="col dropDownCol">
                  <NavDropdown.Item as={NavLink} to="editPDF" onClick={toggleDropdown}>
                    <img src={editPDFSvg} alt="SVG" style={{ width: '12%', marginRight: '5px' }} />
                    Edit PDF
                  </NavDropdown.Item>
                  <NavDropdown.Item as={NavLink} to="splitPDF" onClick={toggleDropdown}>
                    <img src={splitPDFSvg} alt="SVG" style={{ width: '14%', marginRight: '5px' }} />
                    Split PDF
                  </NavDropdown.Item>
                  <NavDropdown.Item as={NavLink} to="mergePDF" onClick={toggleDropdown}>
                    <img src={mergePDFSvg} alt="SVG" style={{ width: '14%', marginRight: '5px' }} />
                    Merge PDF
                  </NavDropdown.Item>
                  <NavDropdown.Item as={NavLink} to="compressPDF" onClick={toggleDropdown}>
                    <img src={compressPDFSvg} alt="SVG" style={{ width: '14%', marginRight: '5px' }} />
                    Compress PDF
                  </NavDropdown.Item>
                </div>
              </div>
            </NavDropdown>
            <Nav.Link as={NavLink} to="compressPDF" className="navItems" onClick={toggleNavbar}>
              Compress PDF
            </Nav.Link>
            <Nav.Link as={NavLink} to="splitPDF" className="navItems" onClick={toggleNavbar}>
              Split PDF
            </Nav.Link>
            <Nav.Link as={NavLink} to="mergePDF" className="navItems" onClick={toggleNavbar}>
              Merge PDF
            </Nav.Link>
            <Nav.Link as={NavLink} to="home" className="navItems" onClick={toggleNavbar}>
              Home
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;

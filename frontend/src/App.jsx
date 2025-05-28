import React, { useEffect } from 'react';
import './App.css'; 
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { Outlet, useLocation } from 'react-router-dom';

function App() {
  const location = useLocation();

  useEffect(() => {
    document.title = getTitleFromPathname(location.pathname);
  }, [location.pathname]);

  const getTitleFromPathname = (pathname) => {
    if (pathname == "/home" || pathname == "/") {
      return "Home | DocMaster";
    } else if (pathname == "/mergePDF") {
      return "Merge PDF | DocMaster";
    } else if (pathname == "/compressPDF") {
      return "Compress PDF | DocMaster";
    } else if (pathname == "/splitPDF") {
      return "Split PDF | DocMaster";
    } else if (pathname == "/pdfToJPG") {
      return "PDF to JPG | DocMaster";
    } else if (pathname == "/jpgToPDF") {
      return "JPG to PDF | DocMaster";
    } else if (pathname == "/pptToPDF") {
      return "PPT to PDF | DocMaster";
    } else if (pathname == "/pdfToPPT") {
      return "PDF to PPT | DocMaster";
    } else if (pathname == "/wordToPDF") {
      return "Word to PDF | DocMaster";
    } else if (pathname == "/pdfToWord") {
      return "PDF to Word | DocMaster";
    } else if (pathname == "/excelToPDF") {
      return "Excel to PDF | DocMaster";
    } else if (pathname == "/pdfToExcel") {
      return "PDF to Excel | DocMaster";
    } else if (pathname == "/editPDF") {
      return "PDF Editor | DocMaster";
    } else {
      return "Error | DocMaster";
    }
  };

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;

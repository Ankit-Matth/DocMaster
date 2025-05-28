import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import Home from './components/Home/Home.jsx'
import SelectBox from './components/SelectBox/SelectBox.jsx'

import pdfToJPGSvg from './assets/SelectBox/pdfToJPG.svg';
import pdfToWordSvg from './assets/SelectBox/pdfToWord.svg';
import pdfToExcelSvg from './assets/SelectBox/pdfToExcel.svg';
import pdfToPPTSvg from './assets/SelectBox/pdfToPPT.svg';
import jpgToPDFSvg from './assets/SelectBox/jpgToPDF.svg';
import wordToPDFSvg from './assets/SelectBox/wordToPDF.svg';
import excelToPDFSvg from './assets/SelectBox/excelToPDF.svg';
import pptToPDFSvg from './assets/SelectBox/pptToPDF.svg';
import mergePDFSvg from './assets/SelectBox/mergePDF.svg';
import splitPDFSvg from './assets/SelectBox/splitPDF.svg';
import compressPDFSvg from './assets/SelectBox/compressPDF.svg';
import editPDFSvg from './assets/SelectBox/editPDF.svg';

const toolsData = [
  { toolTitle: "Compress PDF", toolImg: compressPDFSvg},
  { toolTitle: "Split PDF" , toolImg: splitPDFSvg},
  { toolTitle: "Merge PDF files" , toolImg: mergePDFSvg}, 
  { toolTitle: "Convert JPG to PDF" , toolImg: jpgToPDFSvg},
  { toolTitle: "Convert PDF to JPG" , toolImg: pdfToJPGSvg},
  { toolTitle: "Excel to PDF Converter" , toolImg: excelToPDFSvg},
  { toolTitle: "PDF to Excel Converter" , toolImg: pdfToExcelSvg},
  { toolTitle: "Word to PDF Converter" , toolImg: wordToPDFSvg},
  { toolTitle: "PDF to Word Converter" , toolImg: pdfToWordSvg},
  { toolTitle: "PowerPoint to PDF Converter" , toolImg: pptToPDFSvg},
  { toolTitle: "PDF to PowerPoint Converter" , toolImg: pdfToPPTSvg},
  { toolTitle: "PDF Editor" , toolImg: editPDFSvg}
];

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: "",
        element: <Home/>,
      },
      {
        path: "home",
        element: <Home/>,
      },
      {
        path: "compressPDF",
        element: <SelectBox bgColor={"#E74C3C"} toolTitle={toolsData[0].toolTitle} toolImg={toolsData[0].toolImg}/>
      },
      {
        path: "splitPDF",
        element: <SelectBox bgColor={"#E67E22"} toolTitle={toolsData[1].toolTitle} toolImg={toolsData[1].toolImg}/>,
      },
      {
        path: "mergePDF",
        element: <SelectBox bgColor={"#1FB6BF"} toolTitle={toolsData[2].toolTitle} toolImg={toolsData[2].toolImg}/>,
      },
      {
        path: "jpgToPDF",
        element: <SelectBox bgColor={"#9B59B6"} toolTitle={toolsData[3].toolTitle} toolImg={toolsData[3].toolImg}/>,
      },
      {
        path: "pdfToJPG",
        element: <SelectBox bgColor={"#9B59B6"} toolTitle={toolsData[4].toolTitle} toolImg={toolsData[4].toolImg}/>,
      },
      {
        path: "excelToPDF",
        element: <SelectBox bgColor={"#27AE60"} toolTitle={toolsData[5].toolTitle} toolImg={toolsData[5].toolImg}/>,
      },
      {
        path: "pdfToExcel",
        element: <SelectBox bgColor={"#27AE60"} toolTitle={toolsData[6].toolTitle} toolImg={toolsData[6].toolImg}/>,
      },
      {
        path: "wordToPDF",
        element: <SelectBox bgColor={"#2980B9"} toolTitle={toolsData[7].toolTitle} toolImg={toolsData[7].toolImg}/>,
      },
      {
        path: "pdfToWord",
        element: <SelectBox bgColor={"#2980B9"} toolTitle={toolsData[8].toolTitle} toolImg={toolsData[8].toolImg}/>,
      },
      {
        path: "pptToPDF",
        element: <SelectBox bgColor={"#D35400"} toolTitle={toolsData[9].toolTitle} toolImg={toolsData[9].toolImg}/>,
      },
      {
        path: "pdfToPPT",
        element: <SelectBox bgColor={"#D35400"} toolTitle={toolsData[10].toolTitle} toolImg={toolsData[10].toolImg}/>,
      },
      {
        path: "editPDF",
        element: <SelectBox bgColor={"#196AC8"} toolTitle={toolsData[11].toolTitle} toolImg={toolsData[11].toolImg}/>,
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)

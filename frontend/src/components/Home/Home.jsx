import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Tool from '../Tools/Tool';
import Features from '../Features/Features';
import './Home.css';

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

import noLossSVG from '../../assets/Features/noLoss.svg';
import noSignUpSVG from '../../assets/Features/noSignUp.svg';
import privacySVG from '../../assets/Features/privacy.svg';
import safeProcessingSVG from '../../assets/Features/safeProcessing.svg';
import freeForAllSVG from '../../assets/Features/freeForAll.svg';
import allToolsSVG from '../../assets/Features/allTools.svg';

import featuresData from '../Features/featuresData.json';

const combinedFeaturesData = featuresData.map((feature, index) => ({
  ...feature,
  featureSVG: [noLossSVG, noSignUpSVG, privacySVG, safeProcessingSVG, freeForAllSVG, allToolsSVG][index]
}));

const toolsData = [
  { toolTitle: "PDF to JPG", toolImg: pdfToJPGSvg, toolHref:  "pdfToJPG" },
  { toolTitle: "PDF to Word", toolImg: pdfToWordSvg, toolHref:  "pdfToWord" },
  { toolTitle: "PDF to PowerPoint", toolImg:  pdfToPPTSvg, toolHref:  "pdfToPPT"},
  { toolTitle: "PDF to Excel", toolImg: pdfToExcelSvg, toolHref:  "pdfToExcel" },
  { toolTitle: "Excel to PDF", toolImg: excelToPDFSvg, toolHref:  "excelToPDF" },
  { toolTitle: "PowerPoint to PDF", toolImg: pptToPDFSvg, toolHref:  "pptToPDF" },
  { toolTitle: "Word to PDF", toolImg: wordToPDFSvg, toolHref:  "wordToPDF" },
  { toolTitle: "JPG to PDF", toolImg: jpgToPDFSvg, toolHref:  "jpgToPDF" },
  { toolTitle: "Compress PDF", toolImg: compressPDFSvg, toolHref:  "compressPDF" },
  { toolTitle: "Merge PDF", toolImg: mergePDFSvg, toolHref:  "mergePDF" },
  { toolTitle: "Split PDF", toolImg: splitPDFSvg, toolHref:  "splitPDF" },
  { toolTitle: "Edit PDF", toolImg: editPDFSvg, toolHref:  "editPDF" }
];

const Home = () => {
  return (
    <>
      <Container className="my-5" id='home' fluid>
        <Row className="my-4"> 
          <Col className='colBelowNavbar'>
            <h1>Streamline Your PDF Workflow with DocMaster</h1>
            <h4>Say goodbye to the hassle of juggling multiple software solutions – DocMaster is the only tool that you'll ever need for handling PDFs efficiently.</h4>
          </Col>
        </Row>
        
        {[0, 1, 2].map(index => (
          <Row key={index} className="m-4" xs={12}>
            {toolsData.slice(index * 4, (index + 1) * 4).map(tool => (
              <Col key={tool.toolTitle} xs={6} md={3} className='toolsCol'>
                <Tool toolSvg={tool.toolImg} name={tool.toolTitle} toolHref={tool.toolHref} />
              </Col>
            ))}
          </Row>
        ))}
      </Container>

      <Container className="my-5" id='features' fluid>
        <h1 className="my-2">Our Features</h1>
        <Row className='my-5 p-4 mx-auto'>
        {combinedFeaturesData.map((feature, index) => (
          <Features key={index} featureSvg={feature.featureSVG} cardTitle={feature.cardTitle} cardBody={feature.cardBody}/>
        ))}
        </Row>
      </Container>
    </>
  );
};

export default Home;

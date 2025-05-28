import React, { useRef, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation hook
import { Container, Row, Col, Form, Spinner } from 'react-bootstrap'; // Import Spinner from react-bootstrap
import axios from 'axios'; // Import axios for making HTTP requests
import selectFilesSvg from '../../assets/selectFiles.svg';
import PDFEditor from '../PDFEditor/PDFEditor';
import Features from '../Features/Features';
import './SelectBox.css';

import noLossSVG from '../../assets/Features/noLoss.svg';
import noSignUpSVG from '../../assets/Features/noSignUp.svg';
import privacySVG from '../../assets/Features/privacy.svg';
import safeProcessingSVG from '../../assets/Features/safeProcessing.svg';
import freeForAllSVG from '../../assets/Features/freeForAll.svg';
import allToolsSVG from '../../assets/Features/allTools.svg';

import featuresData from '../Features/featuresData.json';
import DownloadComp from '../DownloadComp/DownloadComp';
import LoadingComp from '../LoadingComp/LoadingComp';
import Template from '../Template/Template';

const combinedFeaturesData = featuresData.map((feature, index) => ({
  ...feature,
  featureSVG: [noLossSVG, noSignUpSVG, privacySVG, safeProcessingSVG, freeForAllSVG, allToolsSVG][index]
}));


const SelectBox = ({ bgColor, toolTitle, toolImg }) => {
  const selectBoxRef = useRef(null);
  const [fileName, setFileName] = useState(null); // State to hold the file path
  const [convertedFilePath, setConvertedFilePath] = useState(null); // State to hold the file path
  const [uploading, setUploading] = useState(false); // State to indicate upload status
  const location = useLocation(); // Get current location

  // Utility function to get allowed file types based on tool title
  const getAllowedFileTypes = (title) => {
    switch (title) {
      case "PDF Editor":
      case "Convert PDF to JPG":
      case "PDF to Word Converter":
      case "PDF to Excel Converter":
      case "Split PDF":
      case "Compress PDF":
        return ["application/pdf"];
      case "Merge PDF files":
        return ["application/pdf"];
      case "PDF to PowerPoint Converter":
        return ["application/pdf"];
      case "Excel to PDF Converter":
        return ["application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"];
      case "PowerPoint to PDF Converter":
        return ["application/vnd.openxmlformats-officedocument.presentationml.presentation", "application/vnd.ms-powerpoint"];
      case "Word to PDF Converter":
        return ["application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
      case "Convert JPG to PDF":
        return ["image/jpeg", "image/jpg", "image/png"];
      default:
        return [];
    }
  };
  
  

  const handleOuterBoxClick = () => {
    // Check if the click originated from the outer box
    if (!selectBoxRef.current.contains(event.target)) {
      // Programmatically click the select box
      selectBoxRef.current.click();
    }
  };

  const handleMultipleSelect = async (event) => {
    const files = event.target.files;
    let validFiles = [];
  
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (isValidFileType(file)) {
        validFiles.push(file);
      }
    }
  
    try {
      setUploading(true); // Start uploading, set uploading state to true
      const lastSegment = window.location.href.split('/').pop();

      const formData = new FormData();
      validFiles.forEach(file => formData.append('files', file)); // Use 'file' as the key
      formData.append('lastSegment', lastSegment);

  
      const response = await axios.post(`http://localhost:5000/uploadMultiple`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
  
      // Update state with the file path received from the server
      setFileName(response.data.fileName);
      setConvertedFilePath(response.data.convertedFilePath)
    } catch (error) {
      console.error('Error uploading file:', error);
      // Handle error, show error message
    } finally {
      setUploading(false); // Upload finished, set uploading state to false
    }
  };
  const handleFileSelect = async (event) => {
    const files = event.target.files;
    let validFiles = [];
  
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (isValidFileType(file)) {
        validFiles.push(file);
      }
    }
  
    try {
      setUploading(true); // Start uploading, set uploading state to true
      const lastSegment = window.location.href.split('/').pop();

      const formData = new FormData();
      validFiles.forEach(file => formData.append('file', file)); // Use 'file' as the key
      formData.append('lastSegment', lastSegment);

  
      const response = await axios.post(`http://localhost:5000/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
  
      // Update state with the file path received from the server
      setFileName(response.data.fileName);
      setConvertedFilePath(response.data.convertedFilePath)
    } catch (error) {
      console.error('Error uploading file:', error);
      // Handle error, show error message
    } finally {
      setUploading(false); // Upload finished, set uploading state to false
    }
  };

  // Utility function to check if the file type is allowed
  const isValidFileType = (file) => {
    const allowedFileTypes = getAllowedFileTypes(toolTitle);
    return allowedFileTypes.includes(file.type);
  };

  // Scroll to the top when the component is rendered
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    // Function to clear selected file when route changes
    const clearSelectedFile = () => {
      setFileName(null);
    };

    // Check if the route has changed
    if (location !== null && location.pathname !== '/') {
      clearSelectedFile();
    }
  }, [location]); // Listen for changes in location

  return (
    <>
      {uploading ? <LoadingComp /> : (
        <>
          {fileName ? (
            toolTitle === "PDF Editor" ? (
              <PDFEditor fileName={fileName} />
            ) : (
              toolTitle === "Split PDF" || toolTitle === "Compress PDF" ?
              <Template toolTitle={toolTitle} fileDirectory={fileName}/> 
              : 
              <DownloadComp toolTitle={toolTitle} convertedFilePath={convertedFilePath}/>
            )
          ) : (
            <div>
              <Container className="my-5" id='selectBox'>
                <Row className="my-4">
                  <h1 className='toolTitle'>{toolTitle}</h1>
                </Row>
                <Row>
                  <Col xs={10} md={12} lg={11} className="p-3 outerBox m-auto rounded" style={{ backgroundColor: bgColor }} onClick={handleOuterBoxClick}>
                    <Form className="innerBox rounded">
                      <Form.Group controlId="formFile">
                        <img src={toolImg} alt="selectFilesSVG" className="mb-3 toolImg" style={{ width: '16rem', color: 'white' }} />
                        <Form.Control
                          type="file"
                          multiple={toolTitle === "Merge PDF files" || toolTitle === "Convert JPG to PDF"}
                          accept={getAllowedFileTypes(toolTitle).join(",")}
                          className="p-2 selectBox"
                          ref={selectBoxRef}
                          onChange={toolTitle === "Merge PDF files" || toolTitle === "Convert JPG to PDF" ? handleMultipleSelect : handleFileSelect}
                        />
                        <p className="text-white mt-2">or drop Files here</p>
                      </Form.Group>
                    </Form>
                  </Col>
                </Row>
              </Container>
              <Container className="my-5" fluid>
                <Row className='my-5 p-4 mx-auto'>
                  {combinedFeaturesData.map((feature, index) => (
                    <Features key={index} featureSvg={feature.featureSVG} cardTitle={feature.cardTitle} cardBody={feature.cardBody}/>
                  ))}
                </Row>
              </Container>
            </div>
          )}
        </>
      )}
    </>
  );
  
};

export default SelectBox;

import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import axios from 'axios'; // Import Axios

import './Template.css';
import LoadingComp from '../LoadingComp/LoadingComp';
import DownloadComp from '../DownloadComp/DownloadComp';

function Template({ toolTitle, fileDirectory }) {
    const [fromPage, setFromPage] = useState('');
    const [toPage, setToPage] = useState('');
    const [compressionLevel, setCompressionLevel] = useState(null);
    const [isDownloadActive, setIsDownloadActive] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [convertedFilePath, setConvertedFilePath] = useState(null);

    let updatedTitle = "";

    if (toolTitle === "Split PDF") {
        updatedTitle = "Split by custom range"
    } else if (toolTitle === "Compress PDF") {
        updatedTitle = "Select compression level"
    }

    const handleSplitPDF = async () => {
        setUploading(true);
        const inputData = {
            fileDirectory,
            pageRange: `${fromPage}-${toPage}`
        };

        try {
            const response = await axios.post(`http://localhost:5000/downloadSplit`, inputData);
            setIsDownloadActive(response.data.isDownloadActive);
            setConvertedFilePath(response.data.convertedFilePath)
        } catch (error) {
            console.error('Error:', error); 
        } finally {
            setUploading(false);
        }
    };

    const handleCompressPDF = async () => {
        setUploading(true);
        const inputData = {
            fileDirectory,
            compressionLevel // Include compression level in the request
        };

        try {
            const response = await axios.post(`http://localhost:5000/downloadCompress`, inputData);
            setIsDownloadActive(response.data.isDownloadActive);
            setConvertedFilePath(response.data.convertedFilePath)
        } catch (error) {
            console.error('Error:', error); 
        } finally {
            setUploading(false);
        }
    }

    return (
        <>
        {uploading ? <LoadingComp/> : (
            isDownloadActive ? 
            <DownloadComp  toolTitle={toolTitle} convertedFilePath={convertedFilePath}/> :
            
            <Container className='template'>
            <h1>{updatedTitle}</h1>
            {toolTitle === "Split PDF" && (
                <Row className="input-container" style={{ width: '43%', margin: 'auto' }}>
                    <Col>
                        <Form.Group controlId="fromPage" className='d-flex'>
                            <Form.Label style={{ fontSize: '1.2em' }}>From Page:</Form.Label>
                            <Form.Control type="number" value={fromPage} onChange={e => setFromPage(e.target.value)} style={{padding: '10px'}} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="toPage" className='d-flex'>
                            <Form.Label style={{ fontSize: '1.2em' }}>To Page:</Form.Label>
                            <Form.Control type="number" value={toPage} onChange={e => setToPage(e.target.value)} style={{padding: '10px'}} />
                        </Form.Group>
                    </Col>
                </Row>
            )}

            {toolTitle === "Compress PDF" && (
                <Row>
                    <Col xs={4} style={{margin: 'auto'}}>
                        <div className="box" onClick={() => setCompressionLevel("text")}>
                            <Form.Group>
                                <input
                                    type="radio"
                                    name="compressionLevel"
                                    id="compressionLevel1"
                                    value={"text"}
                                    checked={compressionLevel === "text"}
                                />
                                <label htmlFor="compressionLevel1">Less quality, high compression</label>
                            </Form.Group>
                        </div>
                        <div className="box" onClick={() => setCompressionLevel("web")}>
                            <Form.Group>
                                <input
                                    type="radio"
                                    name="compressionLevel"
                                    id="compressionLevel2"
                                    value={"web"}
                                    checked={compressionLevel === "web"}
                                />
                                <label htmlFor="compressionLevel2">Good quality, good compression</label>
                            </Form.Group>
                        </div>
                        <div className="box" onClick={() => setCompressionLevel("printer")}>
                            <Form.Group>
                                <input
                                    type="radio"
                                    name="compressionLevel"
                                    id="compressionLevel3"
                                    value={"printer"}
                                    checked={compressionLevel === "printer"}
                                />
                                <label htmlFor="compressionLevel3">High quality, less compression</label>
                            </Form.Group>
                        </div>
                    </Col>
                </Row>
            )}

            <Row className="button-container">
                <Col>
                {toolTitle === "Split PDF" && (
                    <Button variant="primary" className="split-btn" onClick={handleSplitPDF}>Split PDF</Button>
                )}

                {toolTitle === "Compress PDF" && (
                     <Button variant="primary" className="compress-btn" onClick={handleCompressPDF}>Compress PDF</Button>
                )}
                </Col>
            </Row>
            </Container>
        )}
        </>
    );
}

export default Template;

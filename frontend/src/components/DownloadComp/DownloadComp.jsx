import React from 'react';
import Button from 'react-bootstrap/Button';
import downloadSvg from '../../assets/download.svg';
import './DownloadComp.css';

function DownloadComp({ toolTitle, convertedFilePath }) {
    let updatedTitle = "";
    let downloadBtnText = "";

    if (toolTitle === "Convert PDF to JPG") {
        updatedTitle = "PDF has been converted to JPG images";
        downloadBtnText = "Download JPG images";
    } else if (toolTitle === "PDF to Word Converter") {
        updatedTitle = "Your PDF has been converted to a WORD document";
        downloadBtnText = "Download WORD";
    } else if (toolTitle === "PDF to Excel Converter") {
        updatedTitle = "Your PDF has been converted to an EXCEL spreadsheet";
        downloadBtnText = "Download EXCEL";
    } else if (toolTitle === "Split PDF") {
        updatedTitle = "PDF has been split!";
        downloadBtnText = "Download split PDF";
    } else if (toolTitle === "Compress PDF") {
        updatedTitle = "PDF have been compressed!";
        downloadBtnText = "Download compressed PDF";
    } else if (toolTitle === "Merge PDF files") {
        updatedTitle = "PDFs have been merged!";
        downloadBtnText = "Download merged PDF";
    } else if (toolTitle === "PDF to PowerPoint Converter") {
        updatedTitle = "Your PDF has been converted to a POWERPOINT presentation";
        downloadBtnText = "Download POWERPOINT";
    } else if (toolTitle === "Excel to PDF Converter") {
        updatedTitle = "EXCEL file has been converted to PDF";
        downloadBtnText = "Download PDF";
    } else if (toolTitle === "PowerPoint to PDF Converter") {
        updatedTitle = "POWERPOINT file has been converted to PDF";
        downloadBtnText = "Download PDF";
    } else if (toolTitle === "Word to PDF Converter") {
        updatedTitle = "WORD file has been converted to PDF";
        downloadBtnText = "Download PDF";
    } else if (toolTitle === "Convert JPG to PDF") {
        updatedTitle = "The images have been converted to PDF";
        downloadBtnText = "Download PDF";
    }

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = convertedFilePath; // Use the correct relative path
        link.download = convertedFilePath.split('\\').pop(); // Set the file name

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    

    return (
        <div className='container downloadComp'>
            <h1>{updatedTitle}</h1>
            <Button variant="success" className="successBtn" onClick={handleDownload}>
                <div className="left-column">
                    <img src={downloadSvg} alt="SVG" style={{width: '6rem'}}/>
                </div>
                <div className="right-column">
                    <div className='top'>
                        {downloadBtnText}
                    </div>
                    <div className='bottom'>
                        Click if the download does not start automatically...
                    </div>
                </div>
            </Button>
        </div>
    );
}

export default DownloadComp;

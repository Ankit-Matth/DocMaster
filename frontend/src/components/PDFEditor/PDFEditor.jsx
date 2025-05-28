import React, { useEffect } from 'react';
import WebViewer from '@pdftron/webviewer';
import { Container } from 'react-bootstrap';
import './PDFEditor.css';

const PDFEditor = ({fileName}) => {

  useEffect(() => {
    const initializeWebViewer = async () => {
      const filePath = 'uploads/' + fileName;
      // const filePath = 'uploads/Synopsis.pdf';

      const viewerElement = document.getElementById('viewer'); // Get the viewer element by ID
      const instance = await WebViewer({
        path: 'lib',
        licenseKey: 'demo:1710588157436:7f3ad24003000000005f6ba0fd53d807f3de076bfbefd11e253fba252c',
        initialDoc: filePath,
        disabledElements: [ 
          'toggleNotesButton',
          'settingsGeneralButton',
          'settingsAdvancedButton'
        ]
      }, viewerElement);

      instance.UI.openElements(['leftPanel', 'toolbarGroup-Annotate']);
      // You can now call WebViewer APIs here...
    };

    initializeWebViewer();
  }, []);

  return (
    <Container fluid>
      <div className="pdfEditor">
        {/* Assign an ID to the viewer element */}
        <div id="viewer" className="webviewer" style={{ height: "40rem" }}></div>
      </div>
    </Container>
  );
};

export default PDFEditor;

const express = require('express');
const path = require('path');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
const archiver = require('archiver');

const app = express();

const bodyParser = require('body-parser');

app.use(bodyParser.json());

const convertapi = require('convertapi')('secret_4gTTfYE1omRBXi29');

app.use(cors());

// Serve static files from the frontend/dist directory
app.use(express.static(path.join(__dirname, 'frontend', 'dist')));

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'frontend', 'public', 'uploads')));

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDirectory = path.join(__dirname, 'frontend', 'public', 'uploads');

    // Ensure the /uploads directory exists
    if (!fs.existsSync(uploadDirectory)) {
      fs.mkdirSync(uploadDirectory, { recursive: true });
    }

    // Generate a random directory name
    const randomDirectoryName = Math.floor(Math.random() * 1000) + '_Files';
    const destinationPath = path.join(uploadDirectory, randomDirectoryName);

    // Create the directory if it doesn't exist
    if (!fs.existsSync(destinationPath)) {
      fs.mkdirSync(destinationPath, { recursive: true });
    }

    cb(null, destinationPath);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

// Multer configuration for handling multiple files
const multipleUpload = multer({
  storage: storage, 
  limits: { files: 10 }
});

// New route for uploading multiple files
app.post('/uploadMultiple', multipleUpload.array('files'), async (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).send('No files uploaded.');
  } 
  
  try {
    const uploadedFiles = [];
    
    // Generate a random directory name
    const randomDirectoryName = Math.floor(Math.random() * 1000) + '_Files';
    const destinationPath = path.join(__dirname, 'frontend', 'public', 'uploads', randomDirectoryName);
    
    // Move all uploaded files into the random directory
    for (const file of req.files) {
      const filePath = path.join(destinationPath, file.originalname);
      
      // Create the random directory if it doesn't exist
      if (!fs.existsSync(destinationPath)) {
        fs.mkdirSync(destinationPath, { recursive: true });
      }
      
      fs.renameSync(file.path, filePath); 

      uploadedFiles.push({
        originalName: file.originalname,
        path: filePath
      });
    }  
    const filePaths = uploadedFiles.map(file => file.path);

    const lastSegment = req.body.lastSegment;

    let convertResult;
    let convertedFilesPath;
    let relativeFilePath;


    if (lastSegment == "mergePDF") {
        // Perform the merge operation using ConvertAPI
        convertResult = await convertapi.convert('merge', { Files: filePaths }, 'pdf');
    
        // Specify the path where the merged file will be saved
        convertedFilesPath = path.join(destinationPath, 'merged_file.pdf');

        // Save the merged file
        await convertResult.saveFiles(convertedFilesPath);

        relativeFilePath = path.relative(path.join(__dirname, 'frontend', 'public'), convertedFilesPath);
    } else {
        // Perform the merge operation using ConvertAPI
        convertResult = await convertapi.convert('pdf', { Files: filePaths }, 'images');
    
        // Specify the path where the merged file will be saved
        convertedFilesPath = path.join(destinationPath, 'pdf_file.pdf');
      
        // Save the merged file
        await convertResult.saveFiles(convertedFilesPath);
      
        relativeFilePath = path.relative(path.join(__dirname, 'frontend', 'public'), convertedFilesPath);
    }

    // Respond with the merged file path or any other necessary information
    res.send({ fileName: randomDirectoryName+"\\"+"pdf_file.pdf", convertedFilePath: relativeFilePath });
  } catch (error) {
    console.error('Error uploading files:', error);
    res.status(500).send('Error uploading files.');
  }
});


// Upload route
app.post('/upload', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  const lastSegment = req.body.lastSegment;

  // Generate a random directory name for converted files
  const randomConvertedDirectoryName = Math.floor(Math.random() * 1000) + '_converted_Files';
  const convertedFilesPath = path.join(__dirname, 'frontend', 'public', 'uploads', randomConvertedDirectoryName);

  // Create the directory if it doesn't exist
  if (!fs.existsSync(convertedFilesPath)) {
    fs.mkdirSync(convertedFilesPath, { recursive: true });
  }

  try {
    let result;
    let convertedFilePath;
    let relativeConvertedFilePath;
    if (lastSegment == "pdfToWord") {
      result = await convertapi.convert('docx', {
        File: req.file.path 
      },'pdf');
      await result.saveFiles(convertedFilesPath);
      convertedFilePath = path.join(convertedFilesPath, `${req.file.originalname.replace('.pdf', '.docx')}`);
      relativeConvertedFilePath = path.relative(path.join(__dirname, 'frontend', 'public'), convertedFilePath);
    } else if (lastSegment == "pdfToPPT") {
      result = await convertapi.convert('pptx', {
        File: req.file.path 
      },'pdf'); 
      await result.saveFiles(convertedFilesPath);
      convertedFilePath = path.join(convertedFilesPath, `${req.file.originalname.replace('.pdf', '.pptx')}`);
      relativeConvertedFilePath = path.relative(path.join(__dirname, 'frontend', 'public'), convertedFilePath);
    } else if (lastSegment == "pdfToExcel") {
      result = await convertapi.convert('xlsx', {
        File: req.file.path 
      },'pdf');
      await result.saveFiles(convertedFilesPath);
      convertedFilePath = path.join(convertedFilesPath, `${req.file.originalname.replace('.pdf', '.xlsx')}`);
      relativeConvertedFilePath = path.relative(path.join(__dirname, 'frontend', 'public'), convertedFilePath);
    } else if (lastSegment == "excelToPDF") {
      result = await convertapi.convert('pdf', {
        File: req.file.path 
      }, 'xlsx');
      await result.saveFiles(convertedFilesPath);
      convertedFilePath = path.join(convertedFilesPath, `${req.file.originalname.replace('.xlsx', '.pdf')}`);
      relativeConvertedFilePath = path.relative(path.join(__dirname, 'frontend', 'public'), convertedFilePath);
    } else if (lastSegment == "wordToPDF") {
      result = await convertapi.convert('pdf', {
        File: req.file.path 
      }, 'docx');
      await result.saveFiles(convertedFilesPath);
      convertedFilePath = path.join(convertedFilesPath, `${req.file.originalname.replace('.docx', '.pdf')}`);
      relativeConvertedFilePath = path.relative(path.join(__dirname, 'frontend', 'public'), convertedFilePath);
    } else if (lastSegment == "pptToPDF") {
      result = await convertapi.convert('pdf', {
        File: req.file.path 
      }, 'pptx');
      await result.saveFiles(convertedFilesPath);
      convertedFilePath = path.join(convertedFilesPath, `${req.file.originalname.replace('.pptx', '.pdf')}`);
      relativeConvertedFilePath = path.relative(path.join(__dirname, 'frontend', 'public'), convertedFilePath);
    } else if (lastSegment == "pdfToJPG") {
      result = await convertapi.convert('jpg', {
        File: req.file.path 
      }, 'pdf');
      await result.saveFiles(convertedFilesPath);

      const jpgFiles = fs.readdirSync(convertedFilesPath).filter(file => file.endsWith('.jpg'));

      // Create a zip file for all converted JPG files
      const zipFileName = `DocMaster_pdf_to_jpg.zip`;
      const zipFilePath = path.join(__dirname, 'frontend', 'public', 'uploads', zipFileName);
      const output = fs.createWriteStream(zipFilePath);
      const archive = archiver('zip', {
        zlib: { level: 9 } // Sets the compression level
      });
      archive.pipe(output);
      jpgFiles.forEach(file => {
        const filePath = path.join(convertedFilesPath, file);
        archive.append(fs.createReadStream(filePath), { name: file });
      });
      await archive.finalize();

      // Send the path to the zip file
      const relativeZipFilePath = path.relative(path.join(__dirname, 'frontend', 'public'), zipFilePath);

      convertedFilePath = path.join(convertedFilesPath, `${req.file.originalname.replace('.pdf', '.jpg')}`);
      relativeConvertedFilePath = relativeZipFilePath
    } 

    // Extract the random directory name from the destination path
    const randomDirectoryName = req.file.destination.split(path.sep).pop();

    // Send both directory name and file name in the response
    res.send({ fileName: randomDirectoryName+"/"+req.file.originalname, convertedFilePath: relativeConvertedFilePath });
    } catch (error) {
      console.error('Error converting file:', error);
      res.status(500).send('Error converting file.');
    }
});

app.post('/downloadCompress', async (req, res) => {
  // Extract values from the request body
  const { fileDirectory, compressionLevel } = req.body;

  let filePath = path.join(__dirname, 'frontend', 'public', 'uploads', fileDirectory);

  // Generate a random directory name for converted files
  const randomConvertedDirectoryName = Math.floor(Math.random() * 1000) + '_converted_Files';
  const convertedFilesPath = path.join(__dirname, 'frontend', 'public', 'uploads', randomConvertedDirectoryName);

  // Create the directory if it doesn't exist
  if (!fs.existsSync(convertedFilesPath)) {
    fs.mkdirSync(convertedFilesPath, { recursive: true });
  }

  let result;

  try {
    result = await convertapi.convert('compress', {
      File: filePath,
      Presets: compressionLevel
    }, 'pdf');
    await result.saveFiles(convertedFilesPath);

    const convertedFileName = fs.readdirSync(convertedFilesPath);

    // convertedFilesPath = path.join(convertedFilesPath, `${req.file.originalname.replace('.pptx', '.pdf')}`);
    let relativeConvertedFilePath = path.relative(path.join(__dirname, 'frontend', 'public'), convertedFilesPath);
    relativeConvertedFilePath = relativeConvertedFilePath + "\\" + convertedFileName

    res.send({  isDownloadActive: true, convertedFilePath: relativeConvertedFilePath });
  } catch (error) {
    // Handle errors
    console.error('Error converting or saving files:', error.message);
    // Send an error response
    res.status(500).json({ error: 'Internal server error.' });
  }
});
app.post('/downloadSplit', async (req, res) => {
  // Extract values from the request body
  const { fileDirectory, pageRange } = req.body;

  let filePath = path.join(__dirname, 'frontend', 'public', 'uploads', fileDirectory);

  // Generate a random directory name for converted files
  const randomConvertedDirectoryName = Math.floor(Math.random() * 1000) + '_converted_Files';
  const convertedFilesPath = path.join(__dirname, 'frontend', 'public', 'uploads', randomConvertedDirectoryName);

  // Create the directory if it doesn't exist
  if (!fs.existsSync(convertedFilesPath)) {
    fs.mkdirSync(convertedFilesPath, { recursive: true });
  }

  let result;

  try {
    result = await convertapi.convert('split', {
      File: filePath,
      SplitByCustomRange: pageRange
    }, 'pdf');
    await result.saveFiles(convertedFilesPath);

    const convertedFileName = fs.readdirSync(convertedFilesPath);

    // convertedFilesPath = path.join(convertedFilesPath, `${req.file.originalname.replace('.pptx', '.pdf')}`);
    let relativeConvertedFilePath = path.relative(path.join(__dirname, 'frontend', 'public'), convertedFilesPath);
    relativeConvertedFilePath = relativeConvertedFilePath + "\\" + convertedFileName

    res.send({  isDownloadActive: true, convertedFilePath: relativeConvertedFilePath });
  } catch (error) {
    // Handle errors
    console.error('Error converting or saving files:', error.message);
    // Send an error response
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// Serve the React app for any request that doesn't match an existing file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
});

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
}); 
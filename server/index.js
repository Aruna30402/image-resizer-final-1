const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const archiver = require('archiver');
const cors = require('cors');
const path = require('path');
const fs = require('fs-extra');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
const outputDir = path.join(__dirname, 'output');

fs.ensureDirSync(uploadsDir);
fs.ensureDirSync(outputDir);

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

const upload = multer({ 
  storage: storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp|bmp|tiff/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'));
    }
  },
  limits: {
    fileSize: 50 * 1024 * 1024 // 50MB limit
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Process and resize images
app.post('/api/resize', upload.array('images', 20), async (req, res) => {
  try {
    const { width, height, format, maintainAspectRatio } = req.body;
    
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No images uploaded' });
    }

    const images = req.files;
    const resizedImages = [];
    const timestamp = Date.now();
    const sessionDir = path.join(outputDir, `session-${timestamp}`);

    // Create session directory
    fs.ensureDirSync(sessionDir);

    // Process each image
    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      const originalName = path.parse(image.originalname).name;
      const outputFormat = format || path.extname(image.originalname).slice(1);
      
      let sharpInstance = sharp(image.path);

      // Resize logic
      if (maintainAspectRatio === 'true') {
        sharpInstance = sharpInstance.resize(parseInt(width), parseInt(height), {
          fit: 'inside',
          withoutEnlargement: true
        });
      } else {
        sharpInstance = sharpInstance.resize(parseInt(width), parseInt(height));
      }

      // Set quality and format (using default quality of 80)
      if (outputFormat === 'jpeg' || outputFormat === 'jpg') {
        sharpInstance = sharpInstance.jpeg({ quality: 80 });
      } else if (outputFormat === 'png') {
        sharpInstance = sharpInstance.png({ quality: 80 });
      } else if (outputFormat === 'webp') {
        sharpInstance = sharpInstance.webp({ quality: 80 });
      }

      const outputPath = path.join(sessionDir, `${originalName}_resized.${outputFormat}`);
      await sharpInstance.toFile(outputPath);

      resizedImages.push({
        originalName: image.originalname,
        resizedName: `${originalName}_resized.${outputFormat}`,
        path: outputPath
      });
    }

    // Create zip file
    const zipPath = path.join(outputDir, `resized_images_${timestamp}.zip`);
    const output = fs.createWriteStream(zipPath);
    const archive = archiver('zip', { zlib: { level: 9 } });

    output.on('close', () => {
      console.log(`Archive created: ${archive.pointer()} total bytes`);
    });

    archive.on('error', (err) => {
      throw err;
    });

    archive.pipe(output);

    // Add resized images to zip
    for (const image of resizedImages) {
      archive.file(image.path, { name: image.resizedName });
    }

    await archive.finalize();

    // Clean up uploaded files and session directory
    for (const image of images) {
      fs.removeSync(image.path);
    }
    fs.removeSync(sessionDir);

    // Send zip file
    res.download(zipPath, `resized_images_${timestamp}.zip`, (err) => {
      if (err) {
        console.error('Error downloading file:', err);
      }
      // Clean up zip file after download
      setTimeout(() => {
        fs.removeSync(zipPath);
      }, 1000);
    });

  } catch (error) {
    console.error('Error processing images:', error);
    
    // Clean up uploaded files and session directory on error
    if (req.files && req.files.length > 0) {
      for (const image of req.files) {
        try {
          fs.removeSync(image.path);
        } catch (cleanupError) {
          console.error('Error cleaning up uploaded file:', cleanupError);
        }
      }
    }
    
    res.status(500).json({ error: 'Error processing images: ' + error.message });
  }
});

// Get supported image formats
app.get('/api/formats', (req, res) => {
  res.json({
    formats: [
      { value: 'jpg', label: 'JPEG' },
      { value: 'png', label: 'PNG' },
      { value: 'webp', label: 'WebP' }
    ]
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'File too large. Maximum size is 50MB.' });
    }
    if (error.code === 'LIMIT_FILE_COUNT') {
      return res.status(400).json({ error: 'Too many files. Maximum is 20 files.' });
    }
  }
  
  res.status(500).json({ error: error.message });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`API endpoint: http://localhost:${PORT}/api`);
});

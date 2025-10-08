# 🖼️ Image Resizer Tool

A modern web application that allows you to upload multiple images, resize them to your preferred dimensions, and download them as a zip folder. Built with React and Node.js.

## ✨ Features

- **Multiple Image Upload**: Upload up to 20 images at once
- **Drag & Drop Interface**: Easy file upload with drag and drop functionality
- **Customizable Resizing**: Set width, height, quality, and output format
- **Aspect Ratio Control**: Option to maintain or ignore original aspect ratio
- **Quick Presets**: Pre-defined size presets for common use cases
- **Batch Processing**: Process all images simultaneously
- **Zip Download**: Download all resized images in a single zip file
- **Responsive Design**: Works on desktop and mobile devices
- **Modern UI**: Beautiful, intuitive interface with smooth animations



## 📁 Project Structure

```
img_resizer-final/
├── client/                 # React frontend
│   ├── public/            # Static files
│   ├── src/               # Source code
│   │   ├── components/    # React components
│   │   ├── App.js         # Main app component
│   │   └── index.js       # Entry point
│   └── package.json       # Frontend dependencies
├── server/                # Node.js backend
│   ├── uploads/           # Temporary upload directory
│   ├── output/            # Temporary output directory
│   ├── index.js           # Server entry point
│   └── package.json       # Backend dependencies
├── package.json           # Root package.json
└── README.md             # This file
```


## 🎯 Usage

1. **Upload Images**
   - Drag and drop images onto the upload area, or click to select files
   - Supports: JPEG, PNG, GIF, WebP, BMP, TIFF
   - Maximum file size: 50MB per file
   - Maximum files: 20 at once

2. **Configure Resize Options**
   - Set width and height (in pixels)
   - Adjust quality (1-100%)
   - Choose output format (JPEG, PNG, WebP)
   - Toggle aspect ratio maintenance
   - Use quick presets for common sizes

3. **Process & Download**
   - Click "Process & Download Images" button
   - Wait for processing to complete
   - Zip file will automatically download

## 🔧 API Endpoints

- `GET /api/health` - Health check
- `POST /api/resize` - Process and resize images
- `GET /api/formats` - Get supported output formats

## 🎨 Supported Features

### Input Formats
- JPEG (.jpg, .jpeg)
- PNG (.png)
- GIF (.gif)
- WebP (.webp)
- BMP (.bmp)
- TIFF (.tiff)

### Output Formats
- JPEG with adjustable quality
- PNG with adjustable quality
- WebP with adjustable quality

### Resize Options
- **Width & Height**: Custom dimensions in pixels
- **Quality**: 1-100% compression quality
- **Aspect Ratio**: Maintain original proportions or stretch to exact dimensions
- **Quick Presets**: HD (1920×1080), Medium (800×600), Thumbnail (400×300), etc.



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

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation & Setup

1. **Clone or download this project**
   ```bash
   cd img_resizer-final
   ```

2. **Install all dependencies**
   ```bash
   npm run install-all
   ```

3. **Start the development servers**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

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

## 🛠️ Available Scripts

### Root Level Commands
- `npm run dev` - Start both frontend and backend servers
- `npm run install-all` - Install all dependencies for both client and server
- `npm run build` - Build the React app for production

### Client Commands
- `npm run client` - Start React development server
- `npm run install-client` - Install client dependencies
- `npm start` - Start React app (same as client)
- `npm run build` - Build for production

### Server Commands
- `npm run server` - Start Node.js server
- `npm run install-server` - Install server dependencies

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

## 🚀 Production Deployment

1. **Build the React app**
   ```bash
   npm run build
   ```

2. **Set up environment variables**
   ```bash
   export PORT=5000
   export NODE_ENV=production
   ```

3. **Start the server**
   ```bash
   cd server && npm start
   ```

## 🔒 Security Features

- File type validation
- File size limits (50MB per file)
- File count limits (20 files max)
- Temporary file cleanup
- CORS protection

## 🐛 Troubleshooting

### Common Issues

1. **"Module not found" errors**
   - Run `npm run install-all` to install all dependencies

2. **Port already in use**
   - Kill processes using ports 3000 or 5000
   - Or change ports in package.json scripts

3. **File upload fails**
   - Check file size (max 50MB)
   - Verify file format is supported
   - Ensure stable internet connection

4. **Images not resizing correctly**
   - Check that width/height values are positive numbers
   - Verify aspect ratio settings

## 📝 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

If you encounter any issues or have questions, please create an issue in the repository or contact the maintainer.

---

**Happy Image Resizing! 🎉**

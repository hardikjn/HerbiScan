# HerbiScan - AI-Powered Medicinal Plant Identification

[![Python](https://img.shields.io/badge/Python-3.10%2B-blue.svg)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.115%2B-brightgreen.svg)](https://fastapi.tiangolo.com/)
[![Transformers](https://img.shields.io/badge/🤗%20Transformers-4.51%2B-orange.svg)](https://huggingface.co/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Hugging Face Model](https://img.shields.io/badge/Model-dima806/medicinal--plants--image--detection-green.svg)](https://huggingface.co/dima806/medicinal_plants_image_detection)

## 🚀 Overview

**HerbiScan** is an AI-powered web application that identifies medicinal plants from leaf images and provides comprehensive information including:
- Plant identification
- Medicinal benefits (Ayurvedic)
- Soil requirements
- Physical appearance details
- Regional distribution in India

Built with modern web technologies, it combines a **FastAPI backend** with **Hugging Face Transformers** for plant classification and a **responsive Tailwind CSS frontend** for seamless user experience.

## ✨ Features

- ✅ **Instant Plant Identification** - Upload leaf image, get results in seconds
- ✅ **60+ Medicinal Plants** - Trained on Indian medicinal plants dataset
- ✅ **Detailed Plant Information** - Benefits, soil type, appearance, regions
- ✅ **Modern UI/UX** - Responsive design, drag & drop, image preview, confetti animations
- ✅ **CORS Enabled** - Works with any frontend
- ✅ **Production Ready** - Uvicorn server, proper error handling

## 📱 Demo

| Home Page | Upload & Scan | Results Display |
|-----------|---------------|-----------------|
| ![Home](HerbiScan-main/Herbiscan-Frontend/images/HerbiScanW.png) | ![Upload](HerbiScan-main/Herbiscan-Frontend/images/upload.jpg) | ![Results Example](HerbiScan-main/Herbiscan-Frontend/images/collage.jpg) |

## 🛠 Tech Stack

```
Backend: FastAPI + Uvicorn + PyTorch + Transformers
Frontend: HTML5 + Tailwind CSS + jQuery + Particles.js + AOS
AI Model: dima806/medicinal_plants_image_detection (Hugging Face)
Deployment: Ready for Render, Railway, Vercel, Heroku
```

## 🚀 Quick Start (Windows)

### 1. Clone & Setup Backend
```bash
cd HerbiScan-main/HerbiScan-backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
```

### 2. Run Backend Server
```bash
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```
Backend runs at `http://localhost:8000`

### 3. Open Frontend
```bash
# From project root
start HerbiScan-main/Herbiscan-Frontend/index.html
```
Frontend automatically connects to backend via CORS.

### 4. Test API
```bash
curl -X POST "http://localhost:8000/predict" -F "file=@path/to/leaf.jpg"
```

## 🏗 Architecture

```
[Frontend: HTML/JS/Tailwind] --POST /predict--> [FastAPI Backend]
                                                              |
                                         [Transformers Model] --> Prediction + Plant Info
                                                              |
[Laptop Camera/Upload] <-- Results JSON <--                 [Response]
```

## 🤖 AI Model Details

- **Model**: `dima806/medicinal_plants_image_detection`
- **Classes**: 60+ Indian medicinal plants (Tulsi, Neem, Amla, Ashwagandha, etc.)
- **Preprocessing**: ImageNet normalization (224x224)
- **Accuracy**: High confidence on clear leaf images

**Supported Plants** (sample):
```
✓ Tulsi - Immunity booster
✓ Neem - Antibacterial
✓ Amla - Vitamin C rich
✓ Ashwagandha - Stress relief
✓ Aloe Vera - Skin healing
✓ ... +50 more
```

## 📁 Project Structure

```
HerbiScan-main/
├── HerbiScan-backend/
│   ├── main.py          # FastAPI app + model
│   └── requirements.txt # Dependencies
├── Herbiscan-Frontend/
│   ├── index.html       # Main app
│   ├── scripts/         # upload.js, script.js
│   ├── styles/          # styles.css
│   └── images/          # UI assets
├── README.md
└── .gitignore
```

## 🔧 Local Development

### Backend Only
```bash
cd HerbiScan-main/Herbiscan-backend
pip install -r requirements.txt
uvicorn main:app --reload
```

### Frontend Development
Static HTML - just edit `index.html` and refresh browser.

### Environment Variables
```
PORT=8000  # Default
```

## ☁️ Deployment

### Render.com (Recommended - Free)
1. Backend: Deploy `HerbiScan-backend` as Python
2. Frontend: Deploy `Herbiscan-Frontend` as Static Site
3. Update frontend API_URL to production backend URL

### Docker (Coming Soon)
```dockerfile
# Dockerfile coming soon
```

## 🚀 Usage Flow

1. **Upload** leaf image (JPG/PNG <10MB)
2. **AI Analysis** via `/predict` endpoint
3. **Results**: Plant name + 4 info fields
4. **Visual Feedback**: Confetti + smooth animations

## 📈 Performance

- **Response Time**: <3 seconds per prediction (GPU recommended)
- **Image Size**: Up to 10MB
- **Model Size**: ~90MB (downloads on first run)

## 🔍 Troubleshooting

**Backend not connecting?**
```
cd HerbiScan-main/HerbiScan-backend && venv\Scripts\activate && uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

**Model download issues?**
```
pip install torch torchvision transformers --index-url https://download.pytorch.org/whl/cpu
```

**CORS errors?** Already enabled for `*` origins.

## 🤝 Contributing

1. Fork the repo
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is [MIT](LICENSE) licensed - see LICENSE file for details.

## 🙏 Acknowledgments

- [Hugging Face Transformers](https://huggingface.co/)
- [Tailwind CSS](https://tailwindcss.com/)
- [FastAPI](https://fastapi.tiangolo.com/)

---

⭐ **Star this repo if you found it useful!** ⭐

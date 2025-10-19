# 🪶 Flowchartify  
> **"Turn your pseudocode into elegant flowcharts — instantly."**

![Flowchartify Preview](./public/preview.png)

---

## ✨ Overview  
**Flowchartify** is a lightweight web app that lets you **convert pseudocode into interactive flowcharts** — instantly and beautifully.  
It’s designed for developers, students, and educators who want to visualize logic without jumping between clunky, paywalled tools.

Built with a focus on simplicity, extensibility, and performance — Flowchartify transforms your ideas into diagrams that *feel* like code.

---

## 🧩 Tech Stack
| Layer | Technology |
|-------|-------------|
| Frontend | **React**, **Vite**, **TailwindCSS**, **shadcn/ui** |
| Flow Rendering | **flowchart.js** |
| Exporting | **html-to-image** (for PNG / SVG download) |
| Backend (future) | Python / Flask (for pseudo → DSL conversion) |
| Deployment | **Vercel** |

---

## ⚙️ Features

### ✅ **MVP (Current Features)**
- 🧠 Live code editor for flowchart.js DSL  
- ⚡ Real-time flowchart rendering preview  
- 🖼️ Export flowchart as **PNG / SVG**  
- 💾 Clean UI with minimal distractions  
- 💻 Deployed instantly via Vercel  

### 🚀 **Planned Features**
- 🧩 **VSCode-style editor** with syntax highlighting (using Monaco or CodeMirror)
- 🧠 **Custom pseudocode syntax** with IntelliSense & autocomplete
- 🔄 **Automatic conversion** of pseudocode → flowchart.js DSL
- 🎨 **Customizable themes** (light/dark/semantic color schemes)
- ☁️ **User accounts** & cloud saves
- 💰 **Adsense integration** + subscription plans for premium tools
- 📤 **Export presets** (PDF, Markdown embeds, Notion integration)

---

## 🧑‍💻 Team
| Role | Name | Link |
|------|------|------|
| Lead Developer | **Aaron Hartono** | [GitHub →](https://github.com/aaronhartono) |
| Co-Developer | **Benedict Halim** | [GitHub →](https://github.com/tokinohana) |

---

## 🧠 Architecture
```plaintext
frontend/
 ├── src/
 │    ├── components/
 │    │     ├── Editor.tsx      # Text editor for pseudo / DSL
 │    │     ├── Preview.tsx     # Flowchart.js live preview
 │    │     └── Toolbar.tsx     # Render / Download / Clear buttons
 │    ├── utils/
 │    │     └── export.ts       # Handles PNG/SVG export
 │    ├── App.tsx
 │    ├── main.tsx
 │    └── index.css
 └── public/
      └── preview.png

# Professional Storytelling Portfolio

A modern, high-performance developer portfolio built with React, Tailwind CSS, and Framer Motion. Designed to tell your story through immersive scrolling, parallax effects, and interactive visualizations.

![Portfolio Preview](/preview.png)

## 🚀 Key Features

-   **Narrative-Driven Flow**: "Hero -> Journey -> Skills -> Showcase -> Contact" storytelling structure.
-   **Immersive Animations**: Scroll-triggered reveals, parallax backgrounds, and 3D tilt effects using Framer Motion.
-   **Modern Styling**: Built with Tailwind CSS for a premium, responsive design (Dark/Light mode supported).
-   **Performance**: Optimized with Vite for lightning-fast HMR and production builds.
-   **Icons**: Using Lucide React for consistent, crisp iconography.

## 🛠️ Tech Stack

-   **Frontend**: React 18+
-   **Build Tool**: Vite
-   **Styling**: Tailwind CSS
-   **Animation**: Framer Motion
-   **Icons**: Lucide React

## 🏃‍♂️ Getting Started

1.  **Install Dependencies**
    ```bash
    npm install
    ```

2.  **Start Development Server**
    ```bash
    npm run dev
    ```

3.  **Build for Production**
    ```bash
    npm run build
    ```

## 🎨 Customization

### 1. Personal Content
Update the data in the corresponding components:
-   **About/Experience**: `src/components/Story/JourneyTimeline.jsx`
-   **Skills**: `src/components/Story/SkillsVisualizer.jsx`
-   **Projects**: `src/components/Story/ProjectShowcase.jsx`
-   **Contact**: `src/components/Story/ContactStory.jsx`

### 2. Styling & Theme
-   Edit `tailwind.config.js` to change the color palette (primary, secondary, etc.).
-   Update `src/index.css` for global styles.

### 3. Images
-   Place your profile image and project screenshots in the `public/` folder.
-   Update standard image paths in `HeroStory.jsx` and `ProjectShowcase.jsx`.

## 📂 Project Structure

```
src/
├── components/
│   ├── Layout/          # Global layout (Nav, Footer)
│   ├── Story/           # Core storytelling components (Hero, Journey, etc.)
│   └── Navigation/      # Navigation bar logic
├── App.jsx              # Main application entry
├── index.css            # Global Tailwind styles
└── main.jsx             # React entry point
```

## 📄 License
MIT

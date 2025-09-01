
# Bhuwan Joshi – Portfolio

A modern, animated, and responsive developer portfolio built with **React** and **Vite**.

## Features

- ⚡ Fast Vite-powered React app with HMR
- 🎨 Dark/light theme toggle (context + CSS variables)
- 🖼️ Project showcase with modal details and featured badges
- ✨ Animated UI (Framer Motion): parallax, floating elements, custom cursor
- 📱 Fully responsive and mobile-friendly
- 🧑‍💻 Modular, maintainable component structure
- 📨 Contact form (mocked, ready for integration)
- 🛠️ ESLint, modern tooling, and easy customization

## Structure

```
src/
	components/
		About/
		Contact/
		CursorFollower/
		FloatingElements/
		Hero/
		Navigation/
		ParallaxSection/
		ProfileImage/
		Projects/
		ThemeToggle/
	context/
		ThemeContext.jsx
	styles/
		global.css
		theme.css
	theme/
		theme.js
	App.js
	index.js
public/
	forgexdev.png
	kodesql.png
	Earthly_wonders.png
	profile_img.png
	favicon.ico
	...
vite.config.js
eslint.config.js
```

## Projects

- **Forgex** – Full-stack developer learning platform ([Live](https://forgexdev.me))
- **KodeSQL** – SQL learning and challenge platform ([Live](https://kodesql.in))
- **Earthly Wonders** – Nature-inspired frontend ([GitHub](https://github.com/BhuwanJoshi-01/WEB_Project_Nature))

## Getting Started

1. **Install dependencies:**
	 ```sh
	 npm install
	 ```
2. **Run locally:**
	 ```sh
	 npm run dev
	 ```
3. **Build for production:**
	 ```sh
	 npm run build
	 ```

## Customization

- Add/edit projects in `src/components/Projects/Projects.jsx`
- Update theme in `src/theme/theme.js` and `src/styles/theme.css`
- Replace images in `public/`

## License

This project is for personal portfolio use. Feel free to fork and customize!

---

**Made with ❤️ by Bhuwan Joshi**

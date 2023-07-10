/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		fontFamily: {
			roboto: ["Roboto", "sans-serif"],
			open: ["Open Sans", "sans-serif"],
			tail: ["Yellowtail", "cursive"],
		},
		screens: {
			sm: "340px",
			// => @media (min-width: 640px) { ... }

			md: "1024px",
			// => @media (min-width: 1024px) { ... }

			desktop: "1280px",
			// => @media (min-width: 1280px) { ... }
		},
		backgroundImage: {
			"newletter-back": "url('/src/assets/newsletter/subscribe-bg.jpg')",
			"footer-texture": "url('/img/footer-texture.png')",
		},
		extend: {
			colors: {
				primary: "#1E1E1E",
				second: "#9C9C9C",
			},
			container: {
				// padding: {
				// 	DEFAULT: "1rem",
				// 	sm: "1rem",
				// 	lg: "4rem",
				// 	xl: "5rem",
				// 	"2xl": "6rem",
				// },
				center: true,
			},
		},
	},
	plugins: [],
};

/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ["class"],
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			backgroundImage: {
				"login-pattern": "url('/src/assets/herobg.png')",
			  },
			  colors: {
				primary: "#050816",
				secondary: "#aaa6c3",
				tertiary: "#151030",
				bg : "#402C78" ,
				bg2 : "#ab90f5" ,
				"black-100": "#100d25",
				"black-200": "#090325",
				"white-100": "#f3f3f3",
			  },
		}
	},
	plugins: [require("tailwindcss-animate")],
}
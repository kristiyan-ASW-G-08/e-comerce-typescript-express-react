module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      animation: {
        fade: 'fade ease-in-out 400ms  forwards',
        slide: 'slide ease-in-out 400ms  forwards',
      },
      keyframes: {
        fade: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        slide: {
          from: { opacity: '0', transform: 'translateX(-10vw)' },
          to: { opacity: '1', transform: 'translateX(0vw)' },
        },
      },
    },
  },
  plugins: [],
};

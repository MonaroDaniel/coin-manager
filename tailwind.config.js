/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg': {
          '00': 'var(--bg-00)',
          '01': 'var(--bg-01)',
          '02': 'var(--bg-02)',
        },
        'txt': {
          '00': 'var(--txt-00)',
          '01': 'var(--txt-01)',
        },
        'cl': {
          'light-success': 'var(--cl-light-success)',
          'dark-success': 'var(--cl-dark-success)',
          'light-danger': 'var(--cl-light-danger)',
        }
      }
    },
  },
  plugins: [],
}


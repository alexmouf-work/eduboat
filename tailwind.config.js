/** @type {import('tailwindcss').Config} */
// The palette defines the token names the harvested content elements use
// (neural / synapse / axon / myelin / bone), so the engine renders untouched.
// axon and myelin match the review-glyph colours hardcoded inside the elements
// (#5fb37a / #e07a5f) so ticks, crosses and tints stay one colour each.
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        neural: {
          950: '#070c15',
          900: '#0b1322',
          800: '#111c30',
          700: '#1a2842',
          600: '#28395c',
          500: '#3b5280',
        },
        synapse: '#4ba3e3',
        axon: '#5fb37a',
        myelin: '#e07a5f',
        bone: {
          50: '#f5f2ea',
          100: '#e6e1d3',
        },
      },
      fontFamily: {
        body: ['system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mcrdse: {
          bg: '#faf6ee',          // warm sand/cream background
          card: '#ffffff',        // milky white card background
          plum: '#200720',        // deep eggplant/plum primary text and borders
          violet: '#8b5cf6',      // brand purple button fill (focus/bliss)
          violetHover: '#7c3aed', // darker hover purple
          taupe: '#5c4e5c',       // muted charcoal/taupe secondary text
          sandDark: '#f2eae0',    // darker sand for hover states/sidebar backgrounds
          green: '#4f6f52',       // muted sage green for stable indicators
          amber: '#d97706',       // warm orange warning
          rose: '#be123c',        // deep red critical warning
        }
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['DM Serif Display', 'Playfair Display', 'Georgia', 'serif'],
      }
    },
  },
  plugins: [],
}

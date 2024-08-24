/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      screens: {
        smm: '440px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
        '3xl': '1760px'
      },
      fontFamily: {
        sans: ['Roboto', 'Inter', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
        mono: ['ui-monospace', 'SFMono-Regular'],
        display: ['Oswald', 'sans-serif'],
        body: ['Open Sans', 'sans-serif'],
      },
      colors: {
        primary: '#FF693A',
        secondary: '#021F69',
        border_color: '#8E9CAB',
        // headingcolor:'#FBCD35',
        
        headingcolor:'#8BC34A',
        viewmorebutton:'#3a77ff',
        detailscolor:'#002f34',
        loactioncolor:'#406367',
        texthover:'#00a49f',
        bordderscolor:'#A3B4B6'
        
      }
    }
  },
  plugins: []
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}", // Busca estilos en todos los HTML y archivos TypeScript
  ],
  theme: {
    extend: {
      colors: {
        // Añadimos unos colores personalizados con estilo "billar de noche"
        billarDark: '#121318',
        billarGreen: '#0d9488', // Un verde esmeralda elegante
      }
    },
  },
  plugins: [],
}

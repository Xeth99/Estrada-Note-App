/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      fontFamily: {
        RalewayBold: ["Raleway-Bold", "sans-serif"],
        RalewayRegular: ["Raleway-Regular", "sans-serif"],
      },
      colors: {
        primary: "#1DA1F2",
        realPrimary: "#ac4782",
        sidebarText: "#5F5F5F",
        inputBg: "#F4F4F4",
        review1: "#FFE2E8",
        review2: "#EBE8FF",
        review3: "#FFFEE2",
        addReview: "#EBEBEB",
        error: "#FF0000",
        success: "#4CAF50"
      },
    },
  },
  plugins: [],
};

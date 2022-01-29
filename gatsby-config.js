require('dotenv').config({
  path: `.env.${process.env.GATSBY_ACTIVE_ENV}`,
});

module.exports = {
  // Since `gatsby-plugin-typescript` is automatically included in Gatsby you
  // don't need to define it here (just if you need to change the options)
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-theme-material-ui',
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'assets',
        path: `${__dirname}/static/assets/`,
      },
    },
  ],
};

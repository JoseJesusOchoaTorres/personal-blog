module.exports = {
  siteMetadata: {
    title: `Jose Jesus`,
    name: `Jose Jesus`,
    siteUrl: `https://josejesus.dev/`,
    description: `Este es mi blog personal en el cual podrás encontrar temas relacionados a desarrollo web y arquitectura.`,
    hero: {
      heading: `Bienvenido a mi blog personal; Espero disfrutes leyendo mi contenido tanto como yo escribiendo.`,
      maxWidth: 652,
    },
    social: [
      {
        name: `linkedin`,
        url: `https://www.linkedin.com/in/jjot93/`,
      },
      {
        name: `github`,
        url: `https://github.com/JoseJesusOchoaTorres/`,
      },
      {
        name: `twitter`,
        url: `https://twitter.com/jjot93`,
      },
      {
        name: `instagram`,
        url: `https://www.instagram.com/jose.jesus.ochoa.torres/`,
      },
      {
        name: `facebook`,
        url: `https://www.facebook.com/jose.jesus.ochoa.torres`,
      },
      {
        name: `medium`,
        url: `https://medium.com/@jjot`,
      },
      {
        name: `dev`,
        url: `https://dev.to/josejesusochoatorres`,
      },
    ],
  },
  plugins: [
    {
      resolve: "@narative/gatsby-theme-novela",
      options: {
        contentPosts: "content/posts",
        contentAuthors: "content/authors",
        basePath: "/",
        authorsPage: true,
        sources: {
          local: true,
          // contentful: true,
        },
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'Jose Jesus',
        short_name: 'Jose Jesus',
        start_url: '/',
        background_color: '#fff',
        theme_color: '#fff',
        display: 'fullscreen',
        icon: 'src/assets/favicon.png',
      },
    },
    {
      resolve: `gatsby-plugin-netlify-cms`,
      options: {},
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: process.env.GOOGLE_ANALYTICS_TRACKING_ID || 'none',
      },
    },
    {
      resolve: 'gatsby-plugin-mailchimp',
      options: {
        endpoint: 'https://gmail.us20.list-manage.com/subscribe/post?u=dadcd99520332671586cf9a44&amp;id=ce31234930',
      },
    },
  ],
};

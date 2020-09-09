module.exports = {
  siteMetadata: {
    title: `Jose Jesus Ochoa`,
    name: `Jose Jesus`,
    siteUrl: `https://josejesus.dev/`,
    description: `This is my personal blog, where you can find programming articles`,
    hero: {
      heading: `Welcome to my personal blog; I hope you enjoy reading as much as I do writing.`,
      maxWidth: 652,
    },
    social: [
      {
        name: `twitter`,
        url: `https://twitter.com/jjot93`,
      },
      {
        name: `github`,
        url: `https://github.com/JoseJesusOchoaTorres/`,
      },
      {
        name: `instagram`,
        url: `https://www.instagram.com/jose.jesus.ochoa.torres/`,
      },
      {
        name: `linkedin`,
        url: `https://www.linkedin.com/in/jjot93/`,
      },
      {
        name: `facebook`,
        url: `https://www.facebook.com/jose.jesus.ochoa.torres`,
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
        name: `Jose Jesus Ochoa`,
        short_name: `Jose Jesus`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#fff`,
        display: `standalone`,
        icon: `src/assets/favicon.png`,
      },
    },
    {
      resolve: `gatsby-plugin-netlify-cms`,
      options: {
      },
    },
  ],
};

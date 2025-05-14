/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://breazy.stackblitz.io',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
  },
};
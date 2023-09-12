const { NextFederationPlugin } = require("@module-federation/nextjs-mf");
const path = require('path');
const deps = require('./package.json').dependencies;

module.exports = {
  webpack(config, options) {
      config.plugins.push(
        new NextFederationPlugin({
          name: "~",
          remotes: {
            // reduxState: 'reduxState',
            communityChannelStore: "communityChannelStore@http://localhost:8000/remoteEntryCommunity.js",
          },
          filename: "static/chunks/remoteEntryCommunity.js",
          shared: {
            react: {
              requiredVersion: deps.react,
              singleton: true,
              eager: true,
            },
            'react-redux': {
              requiredVersion: deps['react-redux'],
              singleton: true,
              eager: true,
            },
          },
        })
      );
      
      
    //   config.plugins.push(
    //     new CopyPlugin({
    //         patterns: [
    //           {
    //             from:
    //               process.env.BUILD_MODE == 'STAGE'
    //                 ? 'internals/scripts/firebase-messaging-sw.js'
    //                 : 'internals/scripts/firebase-messaging-sw-prod.js',
    //             to: 'firebase-messaging-sw.js',
    //           },
    //         ],
    //       })
    //   );
    //   config.plugins.push(
    //     new Dotenv({ systemvars: isEnvProduction })
    //   );

    return config;
  },
};


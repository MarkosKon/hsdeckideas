const merge = require('webpack-merge');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const common = require('./webpack.common.js');

console.log('We in production!');
module.exports = merge(common, {
  mode: 'production',
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      reportFilename: '../analyze/report.html',
      openAnalyzer: true,
    }),
    new DuplicatePackageCheckerPlugin({ verbose: true }),
    new WorkboxPlugin.GenerateSW({
      exclude: [
        /resources/,
        /_redirects/,
        /browserconfig.xml/,
        /sitemap.txt/,
        /google8ed3e1c54b107b96.html/,
      ],
    }),
  ],
});

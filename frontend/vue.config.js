let commitHash = require('child_process')
  .execSync('git rev-parse --short HEAD')
  .toString();

module.exports = {
  lintOnSave: false,
  publicPath: '',
  devServer: {
  	https: false
  },
  chainWebpack: (config) => {
    config.plugin('define').tap((definitions) => {
      definitions[0]['process.env']['COMMIT_HASH'] = JSON.stringify(commitHash);
      definitions[0]['process.env']['BALLOT_LENGTH'] = JSON.stringify(5);
      return definitions;
    });
  }
}

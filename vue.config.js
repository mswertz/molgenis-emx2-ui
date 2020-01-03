module.exports = {
    chainWebpack: (config) => {
      config.module
        .rule('storysource')
        .test(/\.stories\.js?$/)
        .pre()
        .use('storysource')
        .loader(require.resolve('@storybook/addon-storysource/loader'))
        .options({ parser: 'typescript' });
    },
  };
const {injectBabelPlugin} = require('react-app-rewired');
const rewireLess = require('react-app-rewire-less');


module.exports = function override(config, env) {
  config = injectBabelPlugin(['import', {libraryName: 'antd', style: true}], config);  // change importing css to less
  config = rewireLess.withLoaderOptions({
    modifyVars: {
      '@primary-color': '#039be9',                         // primary color for all components
      '@link-color': '#039be9',                            // link color
      '@success-color': '#52c41a',                         // success state color
      '@warning-color': '#faad14',                         // warning state color
      '@error-color': '#f5222d',                           // error state color
      '@font-size-base': '14px',                           // major text font size
      '@heading-color': 'rgba(0, 0, 0, .85)',              // heading text color
      '@text-color': 'rgba(0, 0, 0, .9)',                  // major text color
      '@text-color-secondary': 'rgba(0, 0, 0, .65)',       // secondary text color
      '@disabled-color': 'rgba(0, 0, 0, .25)',             // disable state color
      '@border-radius-base': '4px',                        // major border radius
      // '@border-color-base': '#039be9',                     // major border color
      '@box-shadow-base': '0 2px 8px rgba(0, 0, 0, .15)',   // major shadow for layers
      '@layout-header-background': '#23282d'                // DASK BACGROUND
    },
  })(config, env);
  return config;
};

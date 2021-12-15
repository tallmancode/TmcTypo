
// Import vue components
import * as components from '@/lib-components/index';

const defaultOptions = {
  wrapperClass: ''
}

// install function executed by Vue.use()
const install = function installTmcTypo(app, options) {

  let globalOptions = {...defaultOptions, ...options};

  app.config.globalProperties.$typo = {
    globalOptions : globalOptions
  }

  Object.entries(components).forEach(([componentName, component]) => {
    app.component(componentName, component);
  });


};

// Create module definition for Vue.use()
export default install;

// To allow individual component use, export components
// each can be registered via Vue.component()
export * from '@/lib-components/index';

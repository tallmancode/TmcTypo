
// Import vue components
import * as components from '@/lib-components/index';
import optionsApi from "./optionsApi";

const install = function installTmcTypo(app, options) {

  let globalOptions = {...optionsApi, ...options};

  app.config.globalProperties.$typo = {
    options: globalOptions
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

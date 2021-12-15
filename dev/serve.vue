<script>
import { defineComponent } from 'vue';
// Uncomment import and local "components" registration if library is not registered globally.
// import { TmcTypoSample } from '@/entry.esm';

export default defineComponent({
  name: 'ServeDev',
  // components: {
  //  TmcTypoSample,
  // }
});
</script>

<template>
  <div id="app">
      <typo-input :placeholder="'Enter Text'" :name="'first_name'"></typo-input>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
// Uncomment import and local "components" registration if library is not registered globally.
// import { TmcTypoSample } from '@/entry.esm';

export default defineComponent({
  name: 'ServeDev',
    data(){
      return{
          error: '',
          selectValue:  null
      }
    }
  // components: {
  //  TmcTypoSample,
  // }
});
</script>

<template>
  <div id="app">
      <typo-input :placeholder="'Enter Text'" :name="'first_name'"></typo-input>
      <typo-select v-model="selectValue"
                   :options="[
                       {name: 'test'},
                       {name: 'test2'}
                   ]"
                   :error="error"
                   :valueBy="'name'"
                   :placeholder="'Restaurant'"
      />
  </div>
</template>

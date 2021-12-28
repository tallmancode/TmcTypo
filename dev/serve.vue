

<template>
  <div id="app">
      <div class="container-fluid">
          <div class="row" style="justify-content: center; align-items: center">
              <div class="col-6">
                  <typo-select v-model="selectOptions.value"
                               :options="[
                       {name: 'test'},
                       {name: 'test2'}
                   ]"
                               :error="selectOptions.error"
                               :valueBy="'name'"
                               :placeholder="'Select Input'"
                  />
              </div>
              <div class="col-6">
                  <button class="btn btn__accent" @click="toggleSelectError">Clear Select</button>
                  <button class="btn btn__primary" @click="toggleSelectError">Toggle Error</button>
              </div>
          </div>
          <div class="row">
              <div class="col-12">
                  <typo-input v-model="text_input" :placeholder="'Text Input'" :name="'text_input'"></typo-input>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
// Uncomment import and local "components" registration if library is not registered globally.
// import { TmcTypoSample } from '@/entry.esm';

export default defineComponent({
    name: 'ServeDev',
    data(){
        return{
            selectOptions: {
                error: false,
                value:  null
            },
            text_input: null,

        }
    },
    methods: {
        toggleSelectError(){
            if(this.selectOptions.error){
                this.selectOptions.error = false
            }else{
                this.selectOptions.error = "Select Error"
            }
        }
    }
    // components: {
    //  TmcTypoSample,
    // }
});
</script>

<style lang="scss">
@import "variables";
@import "foundation/foundation";
.btn{
    margin-right: 10px;
}
</style>


<template>
  <div id="app">
      <div class="container-fluid">
          <div class="row" style="justify-content: center; align-items: center; border-bottom: 1px solid #ebebeb; padding-bottom: 16px">
              <div class="col-12">
                  <h3>Typo Input</h3>
              </div>
              <div class="col-6">
                  <typo-input :error="inputOptions.error"
                              v-model="inputOptions.value"
                              :placeholder="'Text Input'"
                              :name="'text_input'"
                              @clear:errorValue="inputOptions.error = false"
                  />
              </div>
              <div class="col-6">
                  <button class="btn btn__accent" @click="toggleInputClear">Clear Input</button>
                  <button class="btn btn__primary" @click="toggleInputError">Toggle Error</button>
              </div>
          </div>
          <div class="row" style="justify-content: center; align-items: center; border-bottom: 1px solid #ebebeb; padding-bottom: 16px">
              <div class="col-12">
                  <h3>Typo Select</h3>
              </div>
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
                  <button class="btn btn__accent" @click="toggleSelectClear">Clear Select</button>
                  <button class="btn btn__primary" @click="toggleSelectError">Toggle Error</button>
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
            inputOptions: {
                error: false,
                value:  null
            }
        }
    },
    methods: {
        toggleSelectError(){
            if(this.selectOptions.error){
                this.selectOptions.error = false
            }else{
                this.selectOptions.error = "Select Error"
            }
        },
        toggleSelectClear(){
            this.selectOptions.value = null
        },
        toggleInputError(){
            if(this.inputOptions.error){
                this.inputOptions.error = false
            }else{
                this.inputOptions.error = "Input Error"
            }
        },
        toggleInputClear(){
            this.inputOptions.value = null
        }
    }
});
</script>

<style lang="scss">
@import "variables";
@import "foundation/foundation";
.btn{
    margin-right: 10px;
}
</style>
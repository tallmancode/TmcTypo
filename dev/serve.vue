

<template>
  <div id="app">
      <div class="container-fluid">
          <TypoInputExample/>

          <TypoTextareaExample/>
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
                               @clear:errorValue="selectOptions.error = false"
                  />
              </div>
              <div class="col-6">
                  <button class="btn btn__accent" @click="toggleSelectClear">Clear Select</button>
                  <button class="btn btn__primary" @click="toggleSelectError">Toggle Error</button>
              </div>
          </div>

          <div class="row" style="justify-content: center; align-items: center; border-bottom: 1px solid #ebebeb; padding-bottom: 16px">
              <div class="col-12">
                  <h3>Typo Switch</h3>
              </div>
              <div class="col-6">
                  <typo-switch :label="'Typo Switch'"/>
              </div>
              <div class="col-6">
                  <button class="btn btn__accent" @click="toggleSelectClear">Clear Select</button>
                  <button class="btn btn__primary" @click="toggleSelectError">Toggle Error</button>
              </div>
          </div>


          <div class="row" style="justify-content: center; align-items: center; border-bottom: 1px solid #ebebeb; padding-bottom: 16px">
              <div class="col-12">
                  <h3>Typo AC</h3>
              </div>
              <div class="col-6">
                  <typo-ac :placeholder="'Typo Auto Complete'"
                           v-model="acOptions.value"
                           @update:searchInput="initAcSearch"
                           @click:out="clearAcSearch"
                           :options="acOptions.options"/>
              </div>
              <div class="col-6">
                  <button class="btn btn__accent" @click="toggleTextareaClear">Clear Auto Complete</button>
                  <button class="btn btn__primary" @click="toggleTextareaError">Toggle Error</button>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import TypoSwitch from "../src/lib-components/TypoSwitch";
import TypoInputExample from "./components/TypoInput/TypoInputExample";
import TypoTextareaExample from "./components/TypoTextarea/TypoTextareaExample";
export default defineComponent({
    name: 'ServeDev',
    components: {TypoSwitch, TypoInputExample, TypoTextareaExample},
    data(){
        return{
            selectOptions: {
                error: false,
                value:  null
            },
            inputOptions: {
                error: false,
                value:  null
            },
            textareaOptions: {
                error: false,
                value:  null
            },
            acOptions: {
                error: false,
                value: null,
                options: null
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

        initAcSearch(val){
            this.acOptions.options = [
                'Ac Option 1',
                'Ac Option 2',
                'Ac Option 3',
                'Ac Option 4',
            ]
        },
        clearAcSearch(){
            this.acOptions.options = null
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
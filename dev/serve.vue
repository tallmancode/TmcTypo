

<template>
  <div id="app">
      <div class="container-fluid">
          <TypoInputExample/>

          <TypoTextareaExample/>

          <TypoSwitchExample/>

          <TypoSelectExample></TypoSelectExample>





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
import TypoInputExample from "./components/TypoInput/TypoInputExample";
import TypoTextareaExample from "./components/TypoTextarea/TypoTextareaExample";
import TypoSwitchExample from "./components/TypoSwitch/TypoSwitchExample";
import TypoSelectExample from "./components/TypoSelect/TypoSelectExample";
export default defineComponent({
    name: 'ServeDev',
    components: {TypoInputExample, TypoTextareaExample, TypoSwitchExample, TypoSelectExample},
    data(){
        return{
            selectOptions: {
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
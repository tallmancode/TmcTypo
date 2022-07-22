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
                  <typo-switch />
              </div>
              <div class="col-6">
                  <button class="btn btn__accent" @click="toggleSelectClear">Clear Select</button>
                  <button class="btn btn__primary" @click="toggleSelectError">Toggle Error</button>
              </div>
          </div>

      </div>
  </div>

    <div id="app">
        <div class="container-fluid">
            <TypoSelectExample/>
            <TypoAcExample/>
            <TypoInputExample/>
            <TypoTextareaExample/>
            <TypoSwitchExample/>
        </div>
    </div>
</template>

<script>
import {defineComponent} from 'vue';
import TypoInputExample from "./components/TypoInput/TypoInputExample";
import TypoTextareaExample from "./components/TypoTextarea/TypoTextareaExample";
import TypoSwitchExample from "./components/TypoSwitch/TypoSwitchExample";
import TypoSelectExample from "./components/TypoSelect/TypoSelectExample";
import TypoAcExample from "./components/TypoAc/TypoAcExample";

export default defineComponent({
    name: 'ServeDev',
    components: {TypoInputExample, TypoTextareaExample, TypoSwitchExample, TypoSelectExample, TypoAcExample},
});
</script>

<style lang="scss">
@import "variables";
@import "foundation/foundation";

.btn {
    margin-right: 10px;
}
</style>

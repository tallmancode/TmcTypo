<template>
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

.btn {
    margin-right: 10px;
}
</style>

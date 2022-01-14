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
});
</script>

<style lang="scss">
@import "variables";
@import "foundation/foundation";

.btn {
    margin-right: 10px;
}
</style>
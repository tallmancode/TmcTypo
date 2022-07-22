<template>
    <div :class="['typo', {'error': errorValue}, computedOptions.labelType,]" >
        <label v-if="label"
               :data-error="errorValue"
               :for="id"
               :data-label="computedOptions.labelType === 'overlay' ? label : null"
               class="typo__label">
            {{ (computedOptions.labelType === 'standard'? label : '')}}
        </label>
        <textarea :id="id"
                  v-model="inputValue"
                  :name="name"
                  class="typo__textarea"
                  :style="'min-height:'+height">
        </textarea>
    </div>
</template>

<script>
import propsApi from "@/lib-components/TypoTextarea/propsApi";
import {computed} from "vue";
export default {
    name: "TypoTextarea",
    props: propsApi,
    setup(props, {emit}){
        const inputValue = computed({
            get: () => props.modelValue,
            set: (value) => emit('update:modelValue', value),
        });

        const errorValue = computed({
            get: () => props.error,
            set: (value) => emit('update:error', value),
        });

        return {
            inputValue,
            errorValue
        };
    },
    computed: {
        computedOptions(){
            return {...this.$typo.options, ...this.options};
        }
    },
    watch: {
        inputValue(newValue, oldValue) {
            if (oldValue !== newValue && this.errorValue) {
                this.errorValue = false
            }

            if (newValue === '') {
                this.inputValue = null
            }
        }
    }
}
</script>

<style lang="scss">
.typo{
    &__textarea{
        font-family: inherit;
        box-sizing: border-box;
        width: 100%;
        margin: 1em 0 0.5em;
        padding: 6px;
        border: 1px solid #bababa;
        border-radius: 3px;
        background: #fff;
        font-size: 16px;
        resize: none;
        outline: none;
        height: calc(3em + 2px);
        transition: border-color 0.3s;
    }
    &.error{
        .typo__textarea{
            color: #f00;
            border-color: #f00;
        }
    }
}
</style>
<template>
    <div :class="[
            'typo',
            computedOptions.labelType,
            {'error': errorValue},
        ]">
        <label v-if="label"
               :data-error="errorValue"
               :for="uuid()"
               :data-label="computedOptions.labelType === 'overlay' ? label : null"
               class="typo__label">
            {{ (computedOptions.labelType === 'standard'? label : '')}}
        </label>
        <input :id="uuid()"
               v-model="inputValue"
               :name="name"
               :type="type" class="typo__input"
                :autocomplete="computedOptions.autocomplete ? 'on' : 'off'">
    </div>
</template>

<script>
import {computed} from "vue";
import propsApi from "@/lib-components/TypoInput/propsApi";
export default {
    name: 'TypoInput',
    props: propsApi,
    setup(props, {emit}) {
        const uuid = () => {
            let name = props.name.match(
                /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
                .map(s => s.toLowerCase())
                .join('_');

            let alphaNum = Math.random().toString(36).split('').filter( function(value, index, self) {
                return self.indexOf(value) === index;
            }).join('').substr(2,8);

            return name+'_'+alphaNum
        }

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
            errorValue,
            uuid
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
@import "../../scss/typo";

.typo {
    .typo__input {
        box-sizing: border-box;
        width: 100%;
        margin: 1em 0 1em;
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

    &.error {
        .typo__input {
            color: #f00;
        }
    }
}

.typo:not(.error) .typo__input:focus, .typo .typo__input:active {
    transition-duration: 0.2s;
    outline: none !important;
    border-color: #0091da;
}

.typo:not(.error) .typo__input:focus + .typo__label[placeholder]:before, .typo .typo__input:active + .typo__label[placeholder]:before {
    color: #0091da;
}
</style>

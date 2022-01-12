<template>
    <div :class="[
            'typo',
            computedOptions.labelType,
            {'error': errorValue},
        ]">
        <label v-if="label" :data-error="errorValue" :for="id" :data-label="computedOptions.labelType === 'overlay' ? label : null" class="typo__label">
            {{ (computedOptions.labelType === 'standard'? label : '')}}
        </label>
        <input :id="id" v-model="inputValue" :name="name" :type="type" class="typo__input">
    </div>
</template>

<script>
import {computed} from "vue";

export default {
    name: 'TypoInput',
    props: {
        label: {
            type: [String, Boolean],
            default: false
        },
        ///
        id: {
            type: String
        },
        type: {
            type: String,
            default: 'text',
            validator(value) {
                return ['text', 'password', 'number'].includes(value)
            }
        },
        modelValue: null,
        wrapperClass: {
            type: String,
            default: null
        },
        placeholder: {
            required: true,
            type: String,
        },
        name: {
            required: true,
            type: String
        },
        error: {
            type: [String, Boolean],
            default: false
        },
        options: {
            type: [Object],
            default: {}
        }
    },
    setup(props, {emit}) {
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
    mounted(){
        console.log(this.computedOptions)
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

<template>
    <div :class="['typo', $typo.globalOptions.wrapperClass, wrapperClass, {'error': errorProxy}]">
        <input :id="id" v-model="valueProxy" :name="name" :type="type" class="typo__input" @input="handleInput">
        <label :alt="errorProxy" :for="id" :placeholder="placeholder" class="typo__label"/>
    </div>
</template>

<script>
export default {
    name: 'TypoInput',
    props: {
        id: {
            type: String
        },
        type: {
            type: String,
            default: 'text',
        },
        modelValue: '',
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
            type: [String, Boolean]
        }
    },
    data() {
        return {
            valueProxy: this.modelValue,
            errorProxy: this.error
        }
    },
    methods: {
        handleInput(event){
            if(this.errorProxy){
                this.$emit('clear:errorValue')
                this.errorProxy = false
            }
            this.$emit('update:modelValue', event.target.value)
        }
    },
    watch: {
        modelValue(val) {
            this.valueProxy = val
        },
        error(val) {
            this.errorProxy = val
        }
    }
}
</script>

<style lang="scss">
.typo{
    .typo__input{
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
    &.error{
        .typo__input{
            color: #f00;
        }
    }
}
.typo:not(.error) .typo__input:focus, .typo .typo__input:active{
    transition-duration: 0.2s;
    outline: none !important;
    border-color: #0091da;
}
.typo:not(.error) .typo__input:focus + .typo__label[placeholder]:before, .typo .typo__input:active + .typo__label[placeholder]:before{
    color:#0091da;
}
</style>

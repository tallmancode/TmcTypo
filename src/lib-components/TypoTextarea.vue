<template>
    <div :class="['typo', wrapperClass, {'error': errorProxy}]" >
        <textarea :id="id" v-model="valueProxy" :name="name" class="typo__textarea" @input="handleInput" :style="'min-height:'+height"></textarea>
        <label :alt="errorProxy" :for="id" :placeholder="placeholder" class="typo__label"/>
    </div>
</template>

<script>
export default {
    name: "TypoTextarea",
    props: {
        id: {
            type: String
        },
        height: {
            type: String,
            default: '250px'
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
    &__textarea{
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
<template>
    <div :class="['typo', $typo.globalOptions.wrapperClass, wrapperClass, {'error': errorProxy}]">
        <input :id="id" v-model="valueProxy" :name="name" :type="type" class="typo__input" @focusout="deactivate"
               @input="$emit('update:modelValue', $event.target.value)">
        <label :alt="errorProxy" :for="id" :placeholder="placeholder" class="typo__label adaptive__label"></label>
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
        deactivate() {
            if (this.errorProxy) {
                this.errorProxy = ''
            }
        },
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
.typo {
    position: relative;
}
.typo .typo__input{
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
.typo .typo__input:focus, .typo .typo__input:active{
    transition-duration: 0.2s;
    outline: none !important;
    border-color: #0091da;
}
.typo .typo__input:focus + .typo__label[placeholder]:before, .typo .typo__input:active + .typo__label[placeholder]:before{
    color:#0091da;
}
.typo .typo__label.adaptive__label:before, .typo .typo__label.adaptive__label:after{
    position: absolute;
    line-height: 1.25em;
    display: inline-block;
    margin: 0 calc(0.5em + 2px);
    padding: 0 2px;
    white-space: nowrap;
    color: #7d7d7d;
    background-image: linear-gradient(to bottom, #ffffff, #ffffff);
    background-size: 100% 5px;
    background-repeat: no-repeat;
    background-position: center;
    left: 15px;
    font-size: 14px;
    transition: color 0.3s;
}
.typo .typo__label.adaptive__label:before{
    content: attr(placeholder);
    top: 8px;
}
.typo .typo__label.adaptive__label:after{
    content: attr(alt);
    bottom: 8px;
    transition: transform 0.3s;
    transform: translateY(calc(100% + 6px));
}
.typo.error .typo__input{
    border-color: #f00;
}
.typo.error .typo__label.adaptive__label:before, .typo.error .typo__label.adaptive__label:after{
    color: #f00;
}
.typo.error .typo__label.adaptive__label:after{
    transform: translateY(0);
}
</style>

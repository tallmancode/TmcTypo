<template>
    <div :class="['typo typo-select', $typo.globalOptions.wrapperClass , {'error': errorProxy, 'disabled' : disabled || loading}]"
         @focus="activate"
         @focusin="activate"
         @focusout="deactivate">
        <label :alt="errorProxy" :placeholder="placeholder" class="typo__label adaptive__label"></label>
        <div class="typo-select__toggle">
            <input ref="input" :placeholder="inputPlaceholder" readonly type="text">
        </div>
        <transition
            name="expand"
            @enter="enter"
            @after-enter="afterEnter"
            @leave="leave">
        <div ref="dropdown" class="typo-select__dropdown" v-if="showOptions" @mouseover="hovered = true" @mouseout="hovered = false">
            <ul class="typo-select__dropdown-list" >
                <li v-for="option in optionsProxy" @mousedown="selectValue(option)">
                   {{ option.name }}
                </li>
            </ul>
        </div>
        </transition>
    </div>
</template>

<script>
// import Uuid from "../utility/Uuid";

export default {
    name: "TypoSelect",
    props: {
        modelValue: {
            type: [String, Object, Array]
        },
        valueBy: {
            type: [String, Boolean],
            default: false
        },
        mode: {
            type: String,
            default: 'data',
            validator(value) {
                return ['data', 'api'].includes(value)
            }
        },
        searchable: {
            type: Boolean,
            default: false
        },
        placeholder: {
            required: true,
            type: String,
        },
        inputPlaceholder: {
            type: String,
            default: 'Select a option'
        },
        apiUrl: {
            type: String,
            default: '',
        },
        responseDataLabel: {
            type: String,
            default: 'hydra:member',
        },
        error: {
            type: [String, Boolean]
        },
        options: {
            type: Array,
            default: []
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            valueProxy : this.modelValue,
            errorProxy: this.error,
            optionsProxy : this.options,
            showOptions: false,
            loading: false,
            hovered: false
        }
    },
    mounted() {
        this.setValuePlaceholder();
        if (this.mode === 'api') {
            this.loadData()
        }

    },
    methods: {
        enter(element) {
            element.style.width = getComputedStyle(element).width;
            element.style.position = 'absolute';
            element.style.visibility = 'hidden';
            element.style.height = 'auto';
            element.style.overflow = 'hidden'
            const height = getComputedStyle(element).height;

            element.style.width = null;
            element.style.position = null;
            element.style.visibility = null;
            element.style.height = 0;
            getComputedStyle(element).height;
            requestAnimationFrame(() => {
                element.style.height = height;
            });
        },
        afterEnter(element) {
            element.style.height = 'auto';
            element.style.overflow = 'auto'
        },
        leave(element) {
            element.style.height = getComputedStyle(element).height;
            element.style.overflow = 'hidden'
            getComputedStyle(element).height;

            requestAnimationFrame(() => {
                element.style.height = 0;
            });
        },
        setValuePlaceholder(){
            if(this.valueProxy !== null && this.optionsProxy !== null){
                let selectedOption = this.optionsProxy.find(op => op[this.valueBy] === this.valueProxy)
                this.$refs.input.setAttribute('placeholder', selectedOption.name)
            }
        },
        selectValue(value){
            if(this.valueBy ? value[this.valueBy] : value === this.modelValue){
                this.errorProxy = this.error
            }else{
                this.errorProxy = ''
            }
            this.$emit('update:modelValue', this.valueBy ? value[this.valueBy] : value)
            this.$refs.input.setAttribute('placeholder', value.name)
        },
        handleFocus() {
            // console.log('sue')
        },
        activate(event) {
            if(this.disabled) return;
            const input = event.target;
            if (this.searchable) {
                input.removeAttribute('readonly')
                input.setAttribute('placeholder', 'Type to search')
            }else{
                if(this.valueProxy === null) {
                    input.removeAttribute('placeholder')
                }
            }
            if(this.error) {
                this.errorProxy = null
            }
            this.showOptions = true
        },
        deactivate(event) {
            const input = event.target;
            if (this.searchable) {
                input.setAttribute('readonly', true)
                if(this.valueProxy !== null){
                    this.setValuePlaceholder()
                }else{
                    input.setAttribute('placeholder', this.placeholder)
                }
            }else{
                if(this.valueProxy === null){
                    input.setAttribute('placeholder', this.inputPlaceholder)
                }
            }
            if(this.errorProxy === null){
                this.errorProxy = this.error
            }
            this.showOptions = false
        },
        loadData() {
            if (this.mode === 'data') {
                return
            }
            this.loading = true
            axios.get(this.apiUrl)
                .then((resp) => {
                    this.optionsProxy = resp.data[this.responseDataLabel]
                })
                .catch((err) => {
                })
            .finally(() => {
                this.loading = false
            })

        }
    },
    watch: {
        options(val) {
            this.optionsProxy = val
            this.setValuePlaceholder()
        },
        modelValue(val){
            this.valueProxy = val
        },
        error(val){
            this.errorProxy = val
        },
    }
}
</script>

<style lang="scss">
.expand-enter-active,
.expand-leave-active {
    transition: height 1s ease-in-out;
    overflow: hidden;
}

.expand-enter,
.expand-leave-to {
    height: 0;
}
.typo-select{
    box-sizing: border-box;
    position: relative;
    z-index: 9;

}
.typo-select__toggle input{
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
.typo-select__toggle input[readonly]{
    cursor: default;
}
.typo-select__dropdown{
    width: 100%;
    position: absolute;
    background: #fff;
    z-index: 99;
    margin: 0;
    padding: 0;
    top: calc(3em + 23px);
    box-sizing: border-box;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    list-style-type: none;
    transition: height 0.3s ease-in-out;
}
.typo-select__dropdown-list{
    list-style: none;
    padding-left: 0;
    margin-bottom: 0;
    border: 1px solid #bababa;
    border-radius: 3px;
    overflow: visible;
    position: relative;
    z-index: 5;
}
.typo-select__dropdown-list li{
    transition: background-color 0.3s ease-in-out;
    padding: 6px;
    color: #809fb8;
    position: relative;
    z-index: 6;
}
.typo-select__dropdown-list li:hover{
    cursor: pointer;
    background-color: #dbdada;
}
.typo-select.disabled{
    cursor: not-allowed;
}
.typo-select.disabled .typo-select__toggle input{
    cursor: not-allowed;
}
.typo__label.adaptive__label:before, .typo__label.adaptive__label:after{
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
.typo__label.adaptive__label:before{
    visibility: visible;
    content: attr(placeholder);
    top: 8px;
}
.typo__label.adaptive__label:after{
    visibility: hidden;
    content: attr(alt);
    bottom: 8px;
    transition: transform 0.3s;
    transform: translateY(calc(100% + 6px));
}

.typo.error .typo__label .typo__label.adaptive__label:after{
    visibility: visible;
    transform: translateY(0);
}
.typo{
    &.error{
        .typo-select__toggle{
            input{
                border-color: #f00;
            }
        }
        .typo__label{
            &.adaptive__label{
                &:before,&:after{
                    color: #f00;
                }
                &:after{
                    visibility: visible;
                }
            }
        }
    }
}
</style>
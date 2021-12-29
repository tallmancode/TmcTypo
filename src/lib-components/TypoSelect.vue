<template>
    <div :class="[
            'typo typo-select',
            $typo.globalOptions.wrapperClass ,
            {'error': errorProxy, 'disabled' : disabled || loading, 'open' : isActive}
        ]"
         @focus="activate"
         @focusin="activate"
         @focusout="deactivate">
        <label :alt="errorProxy" :placeholder="placeholder" class="typo__label"/>
        <div class="typo-select__toggle">
            <input ref="input" :placeholder="inputPlaceholder" readonly type="text">
            <button class="clear__button" type="button" @mousedown.prevent="clearSelect">
                <i class="clear__button-icon"></i>
            </button>

        </div>
        <height-transition>
            <div ref="dropdown" class="typo-select__dropdown" v-if="showOptions" @mouseover="hovered = true" @mouseout="hovered = false">
                <ul class="typo-select__dropdown-list" >
                    <li v-for="option in optionsProxy" @mousedown="selectValue(option)">
                        {{ option[labelBy] }}
                    </li>
                </ul>
            </div>
        </height-transition>
    </div>
</template>

<script>
import HeightTransition from "../components/tansitions/HeightTransition";

export default {
    name: "TypoSelect",
    props: {
        modelValue: {
            type: [String, Object, Array]
        },
        labelBy: {
            type: String,
            default: 'name'
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
    components: { 'height-transition' : HeightTransition },
    data() {
        return {
            valueProxy : this.modelValue,
            errorProxy: this.error,
            optionsProxy : this.options,
            showOptions: false,
            loading: false,
            hovered: false,
            isActive: false
        }
    },
    mounted() {
        this.setValuePlaceholder();
        if (this.mode === 'api') {
            this.loadData()
        }
    },
    methods: {
        clearSelect() {
            this.setPlaceholder()
            this.errorProxy = false
            this.$emit('update:modelValue', null)
            this.$emit('clear:errorValue')
        },
        setValuePlaceholder(){
            if(this.valueProxy !== null && this.optionsProxy !== null){
                let selectedOption = this.optionsProxy.find(op => op[this.valueBy] === this.valueProxy)
                this.setPlaceholder(selectedOption[this.labelBy])
            }
        },
        selectValue(value){
            if(this.valueBy ? value[this.valueBy] === this.modelValue : value === this.modelValue){
                this.errorProxy = this.error
            }else{
                this.$emit('clear:errorValue')
                this.errorProxy = false
            }
            this.$emit('update:modelValue', this.valueBy ? value[this.valueBy] : value)
            this.setPlaceholder(value[this.labelBy])
        },
        activate(event) {
            if(this.disabled) return;
            this.isActive = true;
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
            this.isActive = false;
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

        },
        setPlaceholder(val){
            if(val){
                this.$refs.input.setAttribute('placeholder', val)
            }else{
                this.$refs.input.setAttribute('placeholder', this.inputPlaceholder)
            }
        }
    },
    watch: {
        options(val) {
            this.optionsProxy = val
            this.setValuePlaceholder()
        },
        modelValue(val){
            this.valueProxy = val
            if(val === null){
                this.setPlaceholder(this.placeholder)
            }
        },
        error(val){
            this.errorProxy = val
        },
    }
}
</script>

<style lang="scss">
.typo-select{
    box-sizing: border-box;
    position: relative;
    z-index: 9;
    .typo-select{
        &__toggle{
            cursor: pointer;
            position: relative;
            input{
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
                &[readonly]{
                    cursor: pointer;
                }

            }
        }
        &__dropdown{
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
            &-list{
                list-style: none;
                padding-left: 0;
                margin-bottom: 0;
                border: 1px solid #bababa;
                border-radius: 3px;
                overflow: visible;
                position: relative;
                z-index: 5;
                li{
                    transition: background-color 0.3s ease-in-out;
                    padding: 6px;
                    color: #809fb8;
                    position: relative;
                    z-index: 6;
                    &:hover{
                        cursor: pointer;
                        background-color: #dbdada;
                    }
                }
            }
        }
    }
    &:not(.open){
        .typo-select__toggle{
            input{
                &:hover + .clear__button{
                    visibility: visible;
                }
            }
        }
    }
}
.typo-select.disabled{
    cursor: not-allowed;
}
.typo-select.disabled .typo-select__toggle input{
    cursor: not-allowed;
}
.typo{
    &.error{
        .typo-select__toggle{
            input{
                border-color: #f00;
            }
        }
    }
}
</style>
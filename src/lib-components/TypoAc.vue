<template>
    <div :class="['typo typo-ac', {'error': errorProxy}]"
         @focusout="deactivate"
    >
        <label :alt="errorProxy" :placeholder="placeholder" class="typo__label"/>
        <div class="typo-ac__input">
            <input ref="input" :placeholder="valueProxy ? valueProxy['labelBy'] : inputPlaceholder" v-model="inputVal" type="text" @keydown="updateSearchInput">
            <button class="clear__button" type="button" @mousedown.prevent="clearSelection">
                <i class="clear__button-icon"></i>
            </button>
        </div>
        <height-transition>
            <div v-if="options && options.length" ref="dropdown" class="typo-ac__dropdown" @mouseout="hovered = false"
                 @mouseover="hovered = true">
                <ul class="typo-ac__dropdown-list">
                    <li v-for="option in optionsProxy" @mousedown="selectValue(option)">
                        {{ labelBy ? option[labelBy] : option }}
                    </li>
                </ul>
            </div>
        </height-transition>
    </div>
</template>

<script>
import HeightTransition from "../components/tansitions/HeightTransition";
export default {
    name: "TypoAc",
    components: {HeightTransition},
    props: {
        placeholder: {
            required: true,
            type: String,
        },
        inputPlaceholder: {
            type: String,
            default: 'Type to search'
        },
        modelValue: {
            type: [String, Object, Array]
        },
        labelBy: {
            type: [String, Boolean],
            default: false
        },
        valueBy: {
            type: [String, Boolean],
            default: false
        },
        error: {
            type: [String, Boolean]
        },
        options: {
            type: Array,
            default: []
        },
        acDelay: {
            type: Number,
            default: 800
        }
    },
    data(){
        return{
            inputVal: null,
            valueProxy: this.modelValue,
            errorProxy: this.error,
            optionsProxy: this.options,
            loading: false,
            hovered: false,
            isActive: false,
            timer: false
        }
    },
    mounted(){
        if(this.modelValue){
            this.$refs.input.setAttribute('placeholder', this.labelBy ? this.modelValue[this.labelBy] : this.modelValue)
        }
    },
    methods: {
        updateSearchInput(event){
            if (this.inputVal !== '') {
                this.loading = true;
                if (this.timer) {
                    clearTimeout(this.timer);
                    this.timer = null;
                }

                this.timer = setTimeout(() => {
                    this.$emit('update:searchInput', event.target.value)
                }, this.acDelay);
            }
        },
        selectValue(value) {
            this.$emit('update:modelValue', this.valueBy ? value[this.valueBy] : value)
            this.inputVal = null
        },
        deactivate(event) {
            const input = event.target;
            this.inputVal = null
            if(this.valueProxy === null){
                input.setAttribute('placeholder', this.inputPlaceholder)
            }else{
                input.setAttribute('placeholder', this.labelBy ? this.modelValue[this.labelBy] : this.modelValue)
            }
            this.$emit('click:out')
        },
        clearSelection(){
            this.$emit('update:modelValue', null)
        }
    },
    watch: {
        options(val) {
            this.optionsProxy = val
        },
        modelValue(val){
            this.valueProxy = val
            this.$refs.input.setAttribute('placeholder', this.labelBy ? val[this.labelBy] : val)
        },
        error(val){
            this.errorProxy = val
        },
    }
}
</script>

<style scoped lang="scss">
@import "../scss/typo";
.typo {
    &.typo-ac{
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
            &:hover + .clear__button{
                visibility: visible;
            }
        }
        .typo-ac{
            &__dropdown{
                width: 100%;
                position: absolute;
                background: #fff;
                z-index: 9999;
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
    }
    &.error{
        .typo-ac{
            input{
                border-color: #f00;
            }

        }
        .typo__label{
            &:before, &:after{
                color: #f00;
            }
            &:after{
                transform: translateY(0);
                visibility: visible;
            }
        }
    }
}
</style>
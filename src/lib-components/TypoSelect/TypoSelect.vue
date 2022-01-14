<template>
    <div :class="[
            'typo typo-select',
            {
                'error': errorValue,
                'disabled' : disabled || loading,
                'open' : isActive
            }
        ]"
         @focus="activate"
         @focusin="activate"
         @focusout="deactivate">
        <label v-if="label"
               :for="id"
               :data-error="errorValue"
               :data-label="computedOptions.labelType === 'overlay' ? label : null"
               class="typo__label">
            {{ (computedOptions.labelType === 'standard'? label : '')}}
        </label>
        <div :class="['typo-select__toggle', {loading: loading}]">
            <input ref="input"
                   :id="id"
                   :placeholder="loading ? '...loading options' : placeholder"
                   :value="labelBy && inputValue ? inputValue[labelBy] : inputValue"
                   readonly type="text" >
            <button class="clear__button" type="button" @mousedown.prevent="clearSelect">
                <i class="clear__button-icon"></i>
            </button>
            <span class="typo-select__loading-indy"></span>
        </div>
        <height-transition>
            <div ref="dropdown" class="typo-select__dropdown" v-if="showOptions" @mouseover="hovered = true" @mouseout="hovered = false">
                <ul class="typo-select__dropdown-list" >
                    <li v-for="item in itemsValue" @mousedown="selectItem(valueBy ? item[valueBy] : item)">
                        {{ labelBy ? item[labelBy] : item }}
                    </li>
                </ul>
            </div>
        </height-transition>
    </div>
</template>

<script>
import HeightTransition from "../../components/tansitions/HeightTransition";
import propsApi from "@/lib-components/TypoSelect/propsApi";
import {computed, ref} from "vue";
const axios = require('axios').default;
export default {
    name: "TypoSelect",
    props: propsApi,
    setup(props, {emit}) {
        const inputValue = computed({
            get: () => props.modelValue,
            set: (value) => emit('update:modelValue', value),
        });

        let itemsValue =  ref([])

        if(!props.method){
           itemsValue =  computed({
                get: () => props.items,
                set: (value) => emit('update:items', value),
            });
        }

        const errorValue = computed({
            get: () => props.error,
            set: (value) => emit('update:error', value),
        });

        return {
            inputValue,
            itemsValue,
            errorValue,
        };
    },
    components: { 'height-transition' : HeightTransition },
    data() {
        return {
            showOptions: false,
            loading: false,
            hovered: false,
            isActive: false
        }
    },
    async mounted() {
        if (this.method) {
            this.toggleLoading()
            await this.method().then((resp) => {
                this.itemsValue = resp
            })
            .finally(() => {
                this.toggleLoading()
            })
        }
    },
    methods: {
        selectItem(selection){
            this.inputValue = selection
        },
        clearSelect() {
            this.inputValue = null
            this.errorValue = false
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
                this.errorValue = null
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
            if(this.errorValue === null){
                this.errorValue = this.error
            }
            this.showOptions = false
        },

        toggleLoading(){
            this.loading = !this.loading
        },
    },
    computed: {
        computedOptions(){
            return {...this.$typo.options, ...this.options};
        }
    }
}
</script>

<style lang="scss">
@import "../../scss/typo";
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
            &.loading{
                .typo-select__loading-indy{
                    position: absolute;
                    width: 30px;
                    height: 30px;
                    top: 50%;
                    transform: translateY(-50%);
                    right: 10px;
                    &:after{
                        content: "";
                        display: block;
                        width: 30px;
                        height: 30px;
                        border-radius: 50%;
                        border-width: 2px;
                        border-style: solid;
                        border-color: #0091da transparent #0091da transparent;
                        animation: loading-ring 1.4s linear infinite;
                        filter: none;
                        background: none;
                    }
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
            top: calc(100% - 10px);
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
            &:not(.loading){
                input{
                    &:hover + .clear__button{
                        visibility: visible;
                    }
                }
            }
        }
    }
}

@keyframes loading-ring {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
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
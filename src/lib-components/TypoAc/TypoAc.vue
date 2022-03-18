<template>
    <div :class="['typo typo-ac', {'error': errorValue}]"
         @focusout="deactivate"
         @focus="activate"
         @focusin="activate"
    >
        <label v-if="label"
               :for="id"
               :data-error="errorValue"
               :data-label="computedOptions.labelType === 'overlay' ? label : null"
               class="typo__label">
            {{ (computedOptions.labelType === 'standard'? label : '')}}
        </label>
        <div :class="['typo-ac__input-wrapper', {active : isActive || !selectedValue}]">
            <div class="selection" @click="activate" v-html="labelValue"></div>
            <input ref="input"
                   :placeholder="placeholder"
                   v-model="searchTerm"
                   type="text">
            <button class="clear__button" type="button" @mousedown.prevent="clearSelection">
                <i class="clear__button-icon"></i>
            </button>
        </div>
        <height-transition>
            <div v-if="itemsValue && itemsValue.length" ref="dropdown" class="typo-ac__dropdown"
                 @mouseout="hovered = false"
                 @mouseover="hovered = true">
                <ul class="typo-ac__dropdown-list">
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
import propsApi from "@/lib-components/TypoAc/propsApi";
import {computed, ref } from "vue";
export default {
    name: "TypoAc",
    components: {HeightTransition},
    props: propsApi,
    setup(props, {emit}) {
        const selectedValue = computed({
            get: () => props.modelValue,
            set: (value) => emit('update:modelValue', value),
        });

        let itemsValue =  ref([])

        if(!props.searchMethod){
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
            selectedValue,
            itemsValue,
            errorValue,
        };
    },
    data(){
        return{
            items: [],
            searchTerm: null,
            loading: false,
            hovered: false,
            isActive: false,
            timer: false,
            selectedObject: null
        }
    },
    methods: {
        initSearch(term){
            if (this.searchTerm !== '') {
                this.loading = true;
                if (this.timer) {
                    clearTimeout(this.timer);
                    this.timer = null;
                }
                this.timer = setTimeout(() => {
                    if(this.searchMethod){
                        this.searchMethod(term).then(resp => {
                            this.itemsValue = resp
                        })
                    }else{
                        this.$emit('update:searchTerm', term)
                    }
                }, this.acDelay);
            }
        },
        selectItem(selection){
            this.searchTerm = null
            this.selectedObject = selection
            this.selectedValue = this.valueBy ? selection[this.valueBy] : selection
        },
        activate(){
            this.isActive = true
            this.$refs.input.focus()
            this.$refs.input.select()
        },
        deactivate(event) {
            this.itemsValue = []
            this.searchTerm = null
            this.isActive = false
            this.$emit('click:out')
        },
        clearSelection(){
            this.selectedValue = null
        }
    },
    watch: {
        searchTerm(newValue){
           if(null !== newValue && '' !== newValue){
               this.initSearch(newValue);
           }
        },
    },
    computed: {
        computedOptions(){
            return {...this.$typo.options, ...this.options};
        },
        labelValue(){
            if(this.selectedValue){
                return this.labelBy ? this.selectedValue[this.labelBy] : this.selectedValue
            }
            return null
        }
    }
}
</script>

<style scoped lang="scss">
@import "../../scss/typo";
.typo {
    &.typo-ac{
        input{
            box-sizing: border-box;
            width: 100%;
            padding: 6px;
            border: none;
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
.typo-ac{
    &__input{
        &-wrapper{
            position: relative;
            margin: 1em 0 1em;
            border: 1px solid #bababa;
            display: inline-block;
            width: 100%;
            &:hover .clear__button{
                visibility: visible;
            }
            input{
                width: 0;
            }
            &.active{
                input{
                    width: 100%
                }
                .selection{
                    width: 0;
                    padding: 0;

                }
            }
            .selection{
                position: absolute;
                box-sizing: border-box;
                overflow: hidden;
                width: 100%;
                padding: 6px;
                border: none;
                border-radius: 3px;
                background: #fff;
                font-size: 16px;
                resize: none;
                outline: none;
                height: calc(3em + 2px);
                display: flex;
                align-items: center;

            }
        }
    }
}
</style>
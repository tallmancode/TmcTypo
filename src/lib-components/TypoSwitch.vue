

<template>
    <div :class="['typo-switch', $typo.globalOptions.wrapperClass, wrapperClass, {'error': error}]">
        <input class="typo-switch__input"
               type="checkbox"
               v-model="checked"
               :id="id"
               :value="value"
               @change="$emit('update:modelValue', valueProxy)" />
        <label class="typo-switch__label" :for="id"
        >{{label}}</label>
    </div>
</template>

<script>
export default {
    name: "TypoSwitch",
    props: {
        id: {
            type: String
        },
        value: {
            type : Boolean,
            default: true
        },
        wrapperClass: {
            type: String,
            default: null
        },
        label: {
            required: true,
            type: String,
        },
        error: {
            type: String
        }
    },
    data() {
        return {
            valueProxy: this.value
        }
    },
    computed: {
        checked: {
            get () {
                return this.value
            },
            set (val) {
                this.valueProxy = val
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../scss/typo-varibales";
@import "assets/scss/vue-helper";

$typo-switch-height: 30px;
$typo-switch-width: 50px;
$typo-switch-radius: 15px;
.typo-switch {
    min-height: $form-check-min-height;
    margin-bottom: $form-check-margin-bottom;
    padding-left: $form-switch-padding-start;
    display: flex;
    align-items: center;
    .typo-switch__label {
        margin-left: 1rem;
        color: $form-check-label-color;
        cursor: $form-check-label-cursor;
    }
    .typo-switch__input {
        float: left;
        width: $typo-switch-width;
        height: $typo-switch-height;
        margin-top: 0;
        vertical-align: top;
        background-color: $form-check-input-bg;
        background-repeat: no-repeat;
        background-size: contain;
        border: $form-check-input-border;
        appearance: none;
        color-adjust: exact; // Keep themed appearance for print
        margin-left: $form-switch-padding-start * -1;
        background-image: escape-svg($form-switch-bg-image);
        background-position: left center;
        border-radius: $typo-switch-radius;
        @include transition($form-switch-transition);

        &:active {
            filter: $form-check-input-active-filter;
        }

        &:focus {
            border-color: $form-check-input-focus-border;
            outline: 0;
            box-shadow: $form-check-input-focus-box-shadow;
            background-image: escape-svg($form-switch-bg-image);
        }

        &:checked {
            background-color: $form-check-input-checked-bg-color;
            border-color: $form-check-input-checked-border-color;
            background-position: $form-switch-checked-bg-position;
            background-image: escape-svg($form-switch-checked-bg-image);
        }

        &:disabled {
            pointer-events: none;
            filter: none;
            opacity: $form-check-input-disabled-opacity;
        }

        &[disabled],
        &:disabled {
            ~ .form-check-label {
                opacity: $form-check-label-disabled-opacity;
            }
        }
    }
}

</style>

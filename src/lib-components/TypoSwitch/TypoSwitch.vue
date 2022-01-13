<template>
    <div :class="['typo-switch', {'error': errorValue}]">
        <input :id="id"
               v-model="inputValue"
               class="typo-switch__input"
               type="checkbox"
        />
        <label v-if="label" :for="id" class="typo-switch__label">
            {{ label }}
        </label>
    </div>
</template>

<script>
import propsApi from "@/lib-components/TypoSwitch/propsApi";
import {computed} from "vue";

export default {
    name: "TypoSwitch",
    props: propsApi,
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
}
</script>

<style lang="scss" scoped>
@import "../../scss/typo";

.typo-switch {
    min-height: 1rem * 1.5;
    margin-bottom: 1rem;
    padding-left: 1em + .5em;
    display: flex;
    align-items: center;

    .typo-switch__label {
        margin-left: 1rem;
    }

    .typo-switch__input {
        float: left;
        width: 30px;
        height: 17px;
        margin-top: 0;
        vertical-align: top;
        background-color: #fff;
        background-repeat: no-repeat;
        background-size: contain;
        border: 1px solid #757575;
        appearance: none;
        color-adjust: exact;
        margin-left: 1.5em * -1;
        background-image: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'><circle r='3' fill='rgba(0, 0, 0, .25)'/></svg>");
        background-position: left center;
        border-radius: 15px;
        transition: background-position .15s ease-in-out;

        &.typo-switch__lg {
            width: 50px;
            height: 25px;
        }

        &:active {
            filter: brightness(90%);
        }

        &:focus {
            border-color: #757575;
            outline: 0;
            box-shadow: none;
            background-image: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'><circle r='3' fill='rgba(0, 0, 0, .25)'/></svg>");
        }

        &:checked {
            background-color: #0091da;
            border-color: #0091da;
            background-position: right;
            background-image: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'><circle r='3' fill='rgba(255, 255, 255, 1)'/></svg>");
        }

        &:disabled {
            pointer-events: none;
            filter: none;
            opacity: .5;
        }

        &[disabled],
        &:disabled {
            ~ .form-check-label {
                opacity: .5;
            }
        }
    }
}

</style>

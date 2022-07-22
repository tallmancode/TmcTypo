<template>
    <div class="row"
         style="justify-content: center; align-items: center; border-bottom: 1px solid #ebebeb; padding-bottom: 16px">
        <div class="col-12">
            <h3>Typo Input</h3>
        </div>
        <div class="col-6">
            <typo-input v-model="value"
                        v-model:error="error"
                        :name="'text_input'"
                        :label="'Text Input'"/>
        </div>
        <div class="col-6">
            <button class="btn btn__accent" @click="toggleInputClear">Clear Input</button>
            <button class="btn btn__primary" @click="toggleInputError">Toggle Error</button>
        </div>
    </div>
</template>

<script>
export default {
    name: "TypoInputExample",
    data() {
        return {
            error: false,
            value: null
        }
    },
    methods: {
        toggleInputError() {
            if (this.error) {
                this.error = false
            } else {
                this.error = "Input Error"
            }
        },
        toggleInputClear() {
            this.value = null
        },
    },
    watch: {
        value(newValue, oldValue) {
            console.log('%c Typo input value changed', 'color: #049513', {oldValue: oldValue, newValue: newValue})
        },
        error(newValue, oldValue) {
            if (!newValue) {
                console.log('%c Typo input error cleared', 'color: #0a6fbf')
            }
        }
    }
}
</script>

<style scoped>

</style>

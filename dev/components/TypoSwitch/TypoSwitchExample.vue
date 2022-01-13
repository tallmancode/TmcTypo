<template>
    <div class="row" style="justify-content: center; align-items: center; border-bottom: 1px solid #ebebeb; padding-bottom: 16px">
        <div class="col-12">
            <h3>Typo Switch</h3>
        </div>
        <div class="col-6">
            <typo-switch :label="'Typo Switch'" v-model="value" v-model:error="error"/>
        </div>
        <div class="col-6">
            <button class="btn btn__primary" @click="toggleSwitchError">Toggle Error</button>
        </div>
    </div>
</template>

<script>
export default {
    name: "TypoSwitchExample",
    data() {
        return{
            error: false,
            value:  null
        }
    },
    methods: {
        toggleSwitchError(){
            if (this.error) {
                this.error = false
            } else {
                this.error = "Input Error"
            }
        }
    },
    watch: {
        value(newValue, oldValue) {
            console.log('%c Typo switch value changed', 'color: #049513', {oldValue: oldValue, newValue: newValue})
        },
        error(newValue, oldValue) {
            if (!newValue) {
                console.log('%c Typo switch error cleared', 'color: #0a6fbf')
            }
        }
    }
}
</script>

<style scoped>

</style>
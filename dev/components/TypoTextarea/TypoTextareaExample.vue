<template>
    <div class="row" style="justify-content: center; align-items: center; border-bottom: 1px solid #ebebeb; padding-bottom: 16px">
        <div class="col-12">
            <h3>Typo Textarea</h3>
        </div>
        <div class="col-6">
            <typo-textarea :name="'typo-textarea'"
                           :label="'Textarea input'"
                           v-model:error="error"
                           v-model="value"
                           />
        </div>
        <div class="col-6">
            <button class="btn btn__accent" @click="toggleTextareaClear">Clear Select</button>
            <button class="btn btn__primary" @click="toggleTextareaError">Toggle Error</button>
        </div>
    </div>
</template>

<script>
export default {
    name: "TypoTextareaExample",
    data(){
        return{
            error: false,
            value:  null
        }
    },
    methods: {
        toggleTextareaError(){
            if(this.error){
                this.error = false
            }else{
                this.error = "Textarea Error"
            }
        },
        toggleTextareaClear(){
            this.value = null
        },
    },
    watch: {
        value(newValue, oldValue) {
            console.log('%c Typo textarea value changed', 'color: #049513', {oldValue: oldValue, newValue: newValue})
        },
        error(newValue, oldValue) {
            if (!newValue) {
                console.log('%c Typo textarea error cleared', 'color: #0a6fbf')
            }
        }
    }
}
</script>

<style scoped>

</style>
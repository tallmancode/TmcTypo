<template>
    <div class="row" style="justify-content: center; align-items: center; border-bottom: 1px solid #ebebeb; padding-bottom: 16px">
        <div class="col-12">
            <h3>Typo AC</h3>
        </div>
        <div class="col-6">
            <typo-ac :label="'Typo Auto Complete'"
                     v-model="value"
                     @update:searchTerm="initAcSearch"
                     @click:out="clearAcSearch"
                     v-model:error="error"
                     :labelBy="'label'"
                    :searchMethod="test"/>
        </div>
        <div class="col-6">
            <button class="btn btn__accent" @click="toggleTextareaClear">Clear Auto Complete</button>
            <button class="btn btn__primary" @click="toggleTextareaError">Toggle Error</button>
        </div>
    </div>
</template>

<script>
export default {
    name: "TypoAcExample",
    data() {
        return {
            error: false,
            value: null,
            options: null
        }
    },
    methods: {
        test(val){
            return new Promise(function(myResolve, myReject) {
                myResolve([
                    {label : 'Ac method return Option 1', value: 1},
                    {label : 'Ac method return Option 2', value: 2},
                    {label : 'Ac method return Option 3', value: 3},
                    {label : 'Ac method return Option 4', value: 4},
                ]); // when successful
               // myReject();  // when error
            });
        },
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
        initAcSearch(val){
            this.options = [
                'Ac Option 1',
                'Ac Option 2',
                'Ac Option 3',
                'Ac Option 4',
            ]
        },
        clearAcSearch(){
            this.options = null
        }
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
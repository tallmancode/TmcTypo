<template>
    <div class="row" style="justify-content: center; align-items: center; border-bottom: 1px solid #ebebeb; padding-bottom: 16px">
        <div class="col-12">
            <h3>Typo Select</h3>
        </div>
        <div class="col-6">
            <typo-select v-model="value"
                         v-model:error="error"
                         :labelBy="'strDrink'"
                         :valueBy="'idDrink'"
                         :placeholder="'-- options --'"
                         :label="'Select Input'"
                         :method="getOptionsMethod"
            />
        </div>
        <div class="col-6">
            <button class="btn btn__accent" @click="toggleSelectClear">Clear Select</button>
            <button class="btn btn__primary" @click="toggleSelectError">Toggle Error</button>
        </div>
    </div>

</template>

<script>
export default {
    name: "TypoSelectExample",
    data() {
        return {
            error: false,
            value: null,
            objectOptions: [
                {id : 1, name: 'Test Option 1', description : 'test object option' },
                {id : 2, name: 'Test Option 2', description : 'test object option' },
                {id : 3, name: 'Test Option 3', description : 'test object option' },
                {id : 4, name: 'Test Option 4', description : 'test object option' },
                {id : 5, name: 'Test Option 5', description : 'test object option' }
            ],
            stringOptions: [ 'Test Option 1', 'Test Option 2', 'Test Option 3', 'Test Option 4', 'Test Option 5' ],
            apiOptions: [],
        }
    },
    methods: {
        getOptionsMethod(){
            return new Promise((resolve, reject) => {
                axios.get('https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail')
                    .then((resp) => {
                        resolve(resp.data.drinks)
                    })
            })
        },
        toggleSelectError(){
            if(this.error){
                this.error = false
            }else{
                this.error = "Select Error"
            }
        },
        toggleSelectClear(){
            this.value = null
            this.error = false
        },
    },
    watch: {
        value(newValue, oldValue) {
            console.log('%c Typo select value changed', 'color: #049513', {oldValue: oldValue, newValue: newValue})
        },
        error(newValue, oldValue) {
            if (!newValue) {
                console.log('%c Typo select error cleared', 'color: #0a6fbf')
            }
        }
    }
}
</script>

<style scoped>

</style>
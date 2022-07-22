<template>
    <typo-select v-model="value"
                 v-model:error="error"
                 :placeholder="'-- options --'"
                 :label="'Select Input'"
                 :method="getItemsMethod"
    />
</template>

<script>
export default {
    name: "TypoSelectExample",
    data() {
        return {
            error: false,
            value: null,
            stringOptions: ['Test Option 1', 'Test Option 2', 'Test Option 3', 'Test Option 4', 'Test Option 5'],
        }
    },
    methods: {
        getItemsMethod(){
            return new Promise((resolve) => {
                axios.get('https://someurl.com/api/call')
                    .then((resp) => {
                        resolve(resp.data)
                    })
            })
        },
    }
}
</script>

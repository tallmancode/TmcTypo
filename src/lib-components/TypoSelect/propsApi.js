export default {
    modelValue: {
        type: [String, Object, Array]
    },
    label: {
        type: [String, Boolean],
        default: false
    },
    placeholder: {
        type: String,
        default: '- select a option -'
    },
    items: {
        type: [Array],
        default: []
    },
    labelBy: {
        type: [String, Boolean],
        default: false
    },
    valueBy: {
        type: [String, Boolean],
        default: false
    },
    mode: {
        type: String,
        default: 'data',
        validator(value) {
            return ['data', 'api'].includes(value)
        }
    },
    apiUrl: {
        type: String,
        default: null,
    },
    responseDataKey: {
        type: String,
        default: 'hydra:member',
    },
    error: {
        type: [String, Boolean]
    },
    disabled: {
        type: Boolean,
        default: false
    },

    searchable: {
        type: Boolean,
        default: false
    },


    options: {
        type: [Object],
        default: {}
    },

}
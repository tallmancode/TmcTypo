export default {
    id: {
        type: String,
        default: 'typo_input_'+Math.random().toString(36).slice(2)
    },
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
    error: {
        type: [String, Boolean]
    },
    disabled: {
        type: Boolean,
        default: false
    },
    method: {
        type: Function
    },
    options: {
        type: [Object],
        default: {}
    },

}
export default  {
    modelValue: null,
    id: {
        type: String,
        default: 'typo_switch_'+Math.random().toString(36).slice(2)
    },
    label: {
        type: [String, Boolean],
        default: false
    },
    name: {
        type: String
    },
    error: {
        type: [String, Boolean],
        default: false
    },
    options: {
        type: [Object],
        default: {}
    }
}
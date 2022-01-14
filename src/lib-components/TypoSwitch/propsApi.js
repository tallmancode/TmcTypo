export default  {
    label: {
        type: [String, Boolean],
        default: false
    },
    id: {
        type: String,
        default: 'typo_switch_'+Math.random().toString(36).slice(2)
    },
    modelValue: null,
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
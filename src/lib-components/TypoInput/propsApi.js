export default  {
    modelValue: null,
    id: {
        type: String,
        default: 'typo_input_'+Math.random().toString(36).slice(2)
    },
    type: {
        type: String,
        default: 'text',
        validator(value) {
            return ['text', 'password', 'number'].includes(value)
        }
    },
    label: {
        type: [String, Boolean],
        default: false
    },
    name: {
        required: true,
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

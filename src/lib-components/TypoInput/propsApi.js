export default  {
    label: {
        type: [String, Boolean],
        default: false
    },
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
    modelValue: null,
    wrapperClass: {
        type: String,
        default: null
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
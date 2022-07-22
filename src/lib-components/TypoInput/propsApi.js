export default  {
    modelValue: null,
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
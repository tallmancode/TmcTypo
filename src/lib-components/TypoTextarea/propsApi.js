export default {
    modelValue: '',
    id: {
        type: String,
        default: 'typo_textarea_'+Math.random().toString(36).slice(2)
    },
    height: {
        type: String,
        default: '250px'
    },
    label: {
        required: true,
        type: String,
    },
    name: {
        required: true,
        type: String
    },
    error: {
        type: [String, Boolean]
    },
    options: {
        type: [Object],
        default: {}
    }
}
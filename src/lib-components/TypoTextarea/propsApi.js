export default {
    id: {
        type: String
    },
    height: {
        type: String,
        default: '250px'
    },
    modelValue: '',
    wrapperClass: {
        type: String,
        default: null
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
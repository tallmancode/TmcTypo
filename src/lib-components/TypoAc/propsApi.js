export default {
    id: {
        type: String,
        default: 'typo_ac_'+Math.random().toString(36).slice(2)
    },
    label: {
        type: [String, Boolean],
        default: false
    },
    placeholder: {
        type: String,
        default: 'Type to search'
    },
    searchMethod: {
        type: Function
    },
    modelValue: {
        type: [String, Object, Array]
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
    options: {
        type: Array,
        default: []
    },
    acDelay: {
        type: Number,
        default: 800
    }
}
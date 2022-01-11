# TmcTypo
**A HTML form components libary fro Vue3.**
## Install
First install TMC Typo as a dependency

    npm install tmc-typo
Next import TMC Typo to use it's components

    import { createApp } from 'vue'  
	const app = createApp({})
    import TmcTypo from 'tmc-typo'
    app.use(TmcTypo)

## Usage & Components

**Input**
Add the Typo Input component to a vue template

    <typo-input :placeholder="'Enter Text'" :name="'name'"></typo-input>

Props:

- id - type: string
- type - type: string, default: text
- wrapperClass - type: string, default: null
- placeHolder - type: string, required: true
- name - type: string, required: true
- error - type: string

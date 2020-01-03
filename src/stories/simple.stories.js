import Vue from 'vue';
import { withKnobs, text } from '@storybook/addon-knobs';


import InputString from '../../src/components/InputString.vue';
Vue.component('input-string', InputString)
import InputPassword from '../../src/components/InputPassword.vue';
Vue.component('input-password', InputPassword)
import Login from '../../src/components/Login.vue';
Vue.component('login', Login)

export default { title: 'Input', decorators: [withKnobs] };

//string input with knobs (useless, I know)
export const string = () => ({
    template: '<input-string v-model="value" label="This is the label" :placeholder="placeholder" help="This is the help text">',
    props: {
        placeholder: {
            default: text('placeholder', 'Some placeholder')
        }
    }
})

export const password = () => '<input-password v-model="value" label="blaat" placeholder="blaat">'


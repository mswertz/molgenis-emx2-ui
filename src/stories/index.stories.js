/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue'
import { action } from '@storybook/addon-actions'
//import { linkTo } from '@storybook/addon-links'

import ButtonPrimary from './../components/ButtonPrimary.vue';


storiesOf('ButtonPrimary', module)
  .add('with link', () => ({
    components: { ButtonPrimary },
    template: '<button-primary title="Go to google" href="http://google.com"/>'
  }))
  .add('with action', () => ({
    components: { ButtonPrimary },
    template: '<button-primary title="Click me!" @click="this.action"/>',
    methods: { action: action('clicked') }
  }))

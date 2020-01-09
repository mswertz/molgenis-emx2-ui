/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue'
import { action } from '@storybook/addon-actions'
//import { linkTo } from '@storybook/addon-links'

import ButtonAction from './../components/ButtonAction.vue';


storiesOf('ButtonAction', module)
  .add('with link', () => ({
    components: { ButtonAction },
    template: '<ButtonAction title="Go to google" href="http://google.com"/>'
  }))
  .add('with action', () => ({
    components: { ButtonAction },
    template: '<ButtonAction title="Click me!" @click="this.action"/>',
    methods: { action: action('clicked') }
  }))

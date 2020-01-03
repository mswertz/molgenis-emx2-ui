/* eslint-disable import/no-extraneous-dependencies */
import { configure } from '@storybook/vue'
import { addParameters } from '@storybook/vue';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';

const newViewports = {
  HD: {
    name: 'HD',
    styles: {
      width: '1280px',
      height: '720px',
    },
  },
  FullHD: {
    name: 'Full HD',
    styles: {
      width: '1920px',
      height: '1080px',
    },
  },
};


addParameters({
  viewport: {
    viewports: {
      ...INITIAL_VIEWPORTS,
      ...newViewports
    }
  },
});

configure(require.context('../../src/stories', true, /.stories.js$/), module)

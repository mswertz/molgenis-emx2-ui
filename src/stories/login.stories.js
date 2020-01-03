import Login from '../components/Login'
import { action } from '@storybook/addon-actions'

export default { title: 'Sign in' };

export const simple = () => ({
    template: '<login :username="username" @login="loginTest" @logout="logoutTest"/>',
    components: { Login },
    data: function () {
        return {
            username: null
        };
    },
    methods: {
        loginTest(username, password) {
            action('login with username ' + username + ' and password ' + password);
            this.username = username;
        },
        logoutTest() {
            action('logout');
            this.username = null;
        }
    }
})

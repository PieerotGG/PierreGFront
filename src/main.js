import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from './Home.vue';
import Contact from './Contact.vue';
import Projects from './Projects.vue';
import Career from './Career.vue';
import Blog from './Blog.vue';

import Loading from './Loading.vue'

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'main',
        component: Loading
    },
    {
        path: '/home',
        name: 'home',
        component: Home
    },
    {
        path: '/contact',
        name: 'contact',
        component: Contact
    },
    {
        path: '/projects',
        name: 'projects',
        component: Projects
    },
    {
        path: '/career',
        name: 'career',
        component: Career
    },
    {
        path: '/blog',
        name: 'blog',
        component: Blog
    }
];


const router = new VueRouter({routes});

const app = new Vue({router}).$mount("#app");
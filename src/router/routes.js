import Layout from '@/components/Layout'
import Welcome from '@/components/Welcome'
import Login from '@/components/auth/Login'
import Profile from '@/components/auth/UpdateProfile'
import NotFound from '@/components/errors/404'
import Room from '@/components/Room'

import Vue from 'vue'

const routes = [{
    path: '/',
    component: Layout,
    children: [{
            path: '/',
            component: Welcome,
            name: 'Welcome'
        },
        {
            path: '/login',
            component: Login,
            name: 'login'
        },
        {
            path: '/room',
            component: Room,
            name: 'Cloud Firestore',
            meta: {
                auth: true
            }
        },
        {
            path: '/profile',
            component: Profile,
            name: 'Update Profile',
            meta : {
                auth: true
            }
        },
        {
            path: '*',
            component: NotFound
        }
    ]
}]

export default routes;

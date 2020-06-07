import Vue from 'vue';
import VueRouter from 'vue-router';
import Signup from '../components/auth/Signup';
import Login from '../components/auth/Login';
import Cases from '../components/content/Cases';
import Add from '../components/content/Add';
import AddCase from '../components/forms/AddCase';
import AddPleading from '../components/forms/AddPleading';
import AddNote from '../components/forms/AddNote';
import AddTerm from '../components/forms/AddTerm';
import AddProceeding from '../components/forms/AddProceeding';
import Delete from '../components/content/Delete';
import DeleteCase from '../components/delete-forms/DeleteCase';
import DeleteCaseElement from '../components/delete-forms/DeleteCaseElement';
import Warning from '../components/layout/Warning';
import Edit from '../components/content/Edit';
import firebase from 'firebase';

Vue.use(VueRouter);

const routes = [
    {
        path: '/signup',
        name: 'Signup',
        component: Signup
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/cases',
        name: 'Cases',
        component: Cases,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/add',
        name: 'Add',
        component: Add,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/add-case',
        name: 'AddCase',
        component: AddCase,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/add-pleading',
        name: 'AddPleading',
        component: AddPleading,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/add-note',
        name: 'AddNote',
        component: AddNote,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/add-term',
        name: 'AddTerm',
        component: AddTerm,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/add-proceeding',
        name: 'AddProceeding',
        component: AddProceeding,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/delete-case',
        name: 'DeleteCase',
        component: DeleteCase,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/delete',
        name: 'Delete',
        component: Delete,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/delete-case-element',
        name: 'DeleteCaseElement',
        component: DeleteCaseElement,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/warning',
        name: 'Warning',
        component: Warning,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/edit',
        name: 'Edit',
        component: Edit,
        meta: {
            requiresAuth: true
        }
    }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

router.beforeEach((to, from, next) => {
    // check to see if route requires auth
    if (to.matched.some(rec => rec.meta.requiresAuth)) {
        //check auth state
        let user = firebase.auth().currentUser;
        if (user) {
            //user signed in proceed to route
            next();
        } else {
            //not signed in redirect to login
            next({ name: 'Login' });
        }
    } else {
        next();
    }
});

export default router;

<template>
    <div class="navbar">
        <nav class="deep-purple darken-1">
            <div class="container">
                <router-link :to="{ name: 'Cases' }" class="brand-logo left"
                    >Juriste.pro</router-link
                >
                <ul class="right">
                    <li v-if="!user">
                        <router-link :to="{ name: 'Signup' }"
                            >Utwórz konto</router-link
                        >
                    </li>
                    <li v-if="!user">
                        <router-link :to="{ name: 'Login' }"
                            >Zaloguj</router-link
                        >
                    </li>
                    <li v-if="user">
                        <router-link :to="{ name: 'Cases' }"
                            >Sprawy</router-link
                        >
                    </li>
                    <li v-if="user">
                        <router-link :to="{ name: 'Add' }">Dodaj</router-link>
                    </li>
                    <li v-if="user">
                        <router-link :to="{ name: 'Edit' }">Edytuj</router-link>
                    </li>
                    <li v-if="user">
                        <router-link :to="{ name: 'Delete' }">Usuń</router-link>
                    </li>
                    <li v-if="user">
                        <a>{{ user.email }}</a>
                    </li>
                    <li v-if="user"><a v-on:click="logout">Wyloguj</a></li>
                </ul>
            </div>
        </nav>
    </div>
</template>

<script>
import firebase from 'firebase';
export default {
    name: 'Navbar',
    data() {
        return {
            user: null
        };
    },
    created: function() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.user = user;
            } else {
                this.user = null;
            }
        });
    },
    methods: {
        logout: function() {
            firebase
                .auth()
                .signOut()
                .then(() => {
                    this.$router.push({ name: 'Login' });
                });
        }
    }
};
</script>

<style></style>

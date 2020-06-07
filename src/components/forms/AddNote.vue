<template>
    <div v-on:submit.prevent="addNote" class="AddCase container">
        <form class="card-panel">
            <h2 class="center deep-purple-text">Dodaj Notatkę</h2>
            <div class="field">
                <label>Wybierz sprawę</label>
                <select class="browser-default" v-model="toCase">
                    <option value="" disabled selected
                        >Choose your option</option
                    >
                    <option
                        v-for="item in caseList"
                        :value="item"
                        v-bind:key="item"
                        >{{ item }}</option
                    >
                </select>
            </div>
            <div class="field">
                <label for="noteName">Nazwa Notatki</label>
                <input
                    id="noteName"
                    type="text"
                    name="noteName"
                    v-model="noteName"
                />
            </div>
            <div class="field">
                <label for="date">Date</label>
                <input id="date" type="date" name="date" v-model="date" />
            </div>
            <div class="field">
                <label for="note">Notatka</label>
                <input id="note" type="text" name="note" v-model="note" />
            </div>
            <p class="red-text center" v-if="feedback">{{ feedback }}</p>
            <div class="field center">
                <button class="btn deep-purple">Dodaj notatkę</button>
            </div>
        </form>
    </div>
</template>

<script>
import firebase from 'firebase';
import db from '@/firebase/init';
export default {
    name: 'AddNote',
    data() {
        return {
            caseList: [],
            noteName: null,
            toCase: null,
            date: null,
            note: null,
            feedback: null
        };
    },
    created: function() {
        let caseList = this.caseList;
        let user = firebase.auth().currentUser;
        let userID = user.uid;
        db.collection('cases')
            .doc(userID)
            .collection('userCases')
            .get()
            .then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    caseList.push(doc.id);
                });
            })
            .catch(function(error) {
                console.log('Error getting documents: ', error);
            });
    },
    methods: {
        addNote: function() {
            if (this.noteName && this.toCase && this.date && this.note) {
                let user = firebase.auth().currentUser;
                let userID = user.uid;
                db.collection('cases')
                    .doc(userID)
                    .collection('userCases')
                    .doc(this.toCase)
                    .collection('Notes')
                    .doc(this.noteName)
                    .set({
                        name: this.noteName,
                        date: this.date,
                        note: this.note
                    })
                    .then(() => {
                        this.feedback = 'Note successfully added';
                    });
            } else {
                this.feedback = 'Please fill in all fields';
            }
        }
    }
};
</script>

<style scoped>
.AddCase {
    max-width: 600px;
    margin-top: 60px;
}
</style>

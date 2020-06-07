<template>
    <div v-on:submit.prevent="addTerm" class="AddCase container">
        <form class="card-panel">
            <h2 class="center deep-purple-text">Dodaj Termin</h2>
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
                <label for="termName">Nazwa Terminu</label>
                <input
                    id="termName"
                    type="text"
                    name="termName"
                    v-model="termName"
                />
            </div>
            <div class="field">
                <label for="date">Date</label>
                <input id="date" type="date" name="date" v-model="date" />
            </div>
            <div class="field">
                <label for="startTime">Od godziny:</label>
                <input
                    id="startTime"
                    type="time"
                    name="startTime"
                    v-model="startTime"
                />
            </div>
            <div class="field">
                <label for="endTime">Do godziny:</label>
                <input
                    id="endTime"
                    type="time"
                    name="endTime"
                    v-model="endTime"
                />
            </div>
            <div class="field">
                <label for="city">Miasto</label>
                <input id="city" type="text" name="city" v-model="city" />
            </div>
            <div class="field">
                <label for="note">Notatka</label>
                <input id="note" type="text" name="note" v-model="note" />
            </div>
            <p class="red-text center" v-if="feedback">{{ feedback }}</p>
            <div class="field center">
                <button class="btn deep-purple">Dodaj termin</button>
            </div>
        </form>
    </div>
</template>

<script>
import firebase from 'firebase';
import db from '@/firebase/init';
export default {
    name: 'AddTerm',
    data() {
        return {
            caseList: [],
            termName: null,
            toCase: null,
            date: null,
            startTime: null,
            endTime: null,
            city: null,
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
        addTerm: function() {
            if (
                this.termName &&
                this.toCase &&
                this.date &&
                this.note &&
                this.startTime &&
                this.endTime &&
                this.city
            ) {
                let user = firebase.auth().currentUser;
                let userID = user.uid;
                db.collection('cases')
                    .doc(userID)
                    .collection('userCases')
                    .doc(this.toCase)
                    .collection('Terms')
                    .doc(this.termName)
                    .set({
                        name: this.termName,
                        date: this.date,
                        startTime: this.startTime,
                        endTime: this.endTime,
                        city: this.city,
                        note: this.note
                    })
                    .then(() => {
                        this.feedback = 'Term successfully added';
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

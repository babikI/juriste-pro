<template>
    <div v-on:submit.prevent="editCase" class="EditCase container">
        <form class="card-panel">
            <h2 class="center deep-purple-text">Edytuj termin</h2>
            <div class="field">
                <label>Wybierz sprawę </label>
                <select
                    class="browser-default"
                    v-model="caseEd"
                    v-on:change="createElementList"
                >
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
                <label>Wybierz element </label>
                <select class="browser-default" v-model="elementName">
                    <option value="elementName" disabled selected
                        >Choose your option</option
                    >
                    <option
                        v-for="item in elementList"
                        :value="item"
                        v-bind:key="item"
                        >{{ item }}</option
                    >
                </select>
            </div>
            <div class="field">
                <label for="termName">Nazwa terminu</label>
                <input
                    id="termName"
                    type="text"
                    name="termName"
                    v-model="newName"
                />
            </div>
            <div class="field">
                <label for="date">Data</label>
                <input id="date" type="date" name="date" v-model="newDate" />
            </div>
            <div class="field">
                <label for="startTime">Od</label>
                <input
                    id="startTime"
                    type="time"
                    name="startTime"
                    v-model="newStartTime"
                />
            </div>
            <div class="field">
                <label for="endTime">Do</label>
                <input
                    id="endTime"
                    type="time"
                    name="endTime"
                    v-model="newEndTime"
                />
            </div>
            <div class="field">
                <label for="city">Miasto</label>
                <input id="city" type="text" name="city" v-model="newCity" />
            </div>
            <div class="field">
                <label for="note">Notatka</label>
                <input id="note" type="text" name="note" v-model="newNote" />
            </div>
            <p class="red-text center" v-if="feedback">{{ feedback }}</p>
            <div class="field center">
                <button class="btn deep-purple">Edytuj termin</button>
            </div>
        </form>
    </div>
</template>

<script>
import firebase from 'firebase';
import db from '@/firebase/init';

export default {
    name: 'EditTerms',
    data() {
        return {
            caseEd: null,
            caseList: [],
            elementList: [],
            chosenElement: 'Terms',
            elementName: null,
            feedback: null,
            newName: null,
            newDate: null,
            newNote: null,
            newCity: null,
            newStartTime: null,
            newEndTime: null
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
        editCase: function() {
            let user = firebase.auth().currentUser;
            let userID = user.uid;
            if (this.newName) {
                db.collection('cases')
                    .doc(userID)
                    .collection('userCases')
                    .doc(this.caseEd)
                    .collection(this.chosenElement)
                    .doc(this.elementName)
                    .update({
                        name: this.newName
                    })
                    .then(() => {
                        this.feedback = 'Element successfully edited';
                    });
            }
            if (this.newDate) {
                db.collection('cases')
                    .doc(userID)
                    .collection('userCases')
                    .doc(this.caseEd)
                    .collection(this.chosenElement)
                    .doc(this.elementName)
                    .update({
                        date: this.newDate
                    })
                    .then(() => {
                        this.feedback = 'Element successfully edited';
                    });
            }
            if (this.newNote) {
                db.collection('cases')
                    .doc(userID)
                    .collection('userCases')
                    .doc(this.caseEd)
                    .collection(this.chosenElement)
                    .doc(this.elementName)
                    .update({
                        note: this.newNote
                    })
                    .then(() => {
                        this.feedback = 'Element successfully edited';
                    });
            }
            if (this.newCity) {
                db.collection('cases')
                    .doc(userID)
                    .collection('userCases')
                    .doc(this.caseEd)
                    .collection(this.chosenElement)
                    .doc(this.elementName)
                    .update({
                        city: this.newCity
                    })
                    .then(() => {
                        this.feedback = 'Element successfully edited';
                    });
            }
            if (this.newStartTime) {
                db.collection('cases')
                    .doc(userID)
                    .collection('userCases')
                    .doc(this.caseEd)
                    .collection(this.chosenElement)
                    .doc(this.elementName)
                    .update({
                        startTime: this.newStartTime
                    })
                    .then(() => {
                        this.feedback = 'Element successfully edited';
                    });
            }
            if (this.newEndTime) {
                db.collection('cases')
                    .doc(userID)
                    .collection('userCases')
                    .doc(this.caseEd)
                    .collection(this.chosenElement)
                    .doc(this.elementName)
                    .update({
                        endTime: this.newEndTime
                    })
                    .then(() => {
                        this.feedback = 'Element successfully edited';
                    });
            }
        },
        createElementList: function() {
            this.clearElementList();
            let elementList = this.elementList;
            let user = firebase.auth().currentUser;
            let userID = user.uid;
            db.collection('cases')
                .doc(userID)
                .collection('userCases')
                .doc(this.caseEd)
                .collection(this.chosenElement)
                .get()
                .then(function(querySnapshot) {
                    querySnapshot.forEach(function(doc) {
                        elementList.push(doc.id);
                    });
                })
                .catch(function(error) {
                    console.log('Error getting documents: ', error);
                });
        },
        clearElementList: function() {
            this.elementList = [];
        }
    }
};
</script>

<style scoped>
.EditCase {
    max-width: 600px;
    margin-top: 60px;
}
</style>

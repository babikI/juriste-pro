<template>
    <div v-on:submit.prevent="createCase" class="AddCase container">
        <form class="card-panel">
            <h2 class="center deep-purple-text">Dodaj sprawę</h2>
            <div class="field">
                <label for="name">Nazwa sprawy</label>
                <input id="name" type="text" name="name" v-model="name" />
            </div>
            <div class="field">
                <label for="client">Klient</label>
                <input id="client" type="text" name="client" v-model="client" />
            </div>
            <div class="field">
                <label for="clientAddress">Adres klienta</label>
                <input
                    id="clientAddress"
                    type="text"
                    name="clientAddress"
                    v-model="clientAddress"
                />
            </div>
            <div class="field">
                <label for="party">Strona przeciwna</label>
                <input id="party" type="text" name="party" v-model="party" />
            </div>
            <div class="field">
                <label for="partyAddress">Strona przeciwna adres</label>
                <input
                    id="partyAddress"
                    type="text"
                    name="partyAddress"
                    v-model="partyAddress"
                />
            </div>
            <div class="field">
                <label for="court">Sąd</label>
                <input id="court" type="text" name="court" v-model="court" />
            </div>
            <div class="field">
                <label for="wps">Wartość przedmiotu sporu</label>
                <input id="wps" type="text" name="wps" v-model="wps" />
            </div>
            <div class="field">
                <label for="attorney">Pełnomocnik strony przeciwnej</label>
                <input
                    id="attorney"
                    type="text"
                    name="attorney"
                    v-model="attorney"
                />
            </div>
            <div class="field">
                <label for="caseID">Sygnatura sprawy</label>
                <input id="caseID" type="text" name="caseID" v-model="caseID" />
            </div>
            <p class="red-text center" v-if="feedback">{{ feedback }}</p>
            <div class="field center">
                <button class="btn deep-purple">Stwórz sprawę</button>
            </div>
        </form>
    </div>
</template>

<script>
import firebase from 'firebase';
import db from '@/firebase/init';
export default {
    name: 'AddCase',
    data() {
        return {
            name: null,
            client: null,
            clientAddress: null,
            party: null,
            partyAddress: null,
            court: null,
            wps: null,
            attorney: null,
            caseID: null,
            feedback: null
        };
    },
    methods: {
        createCase: function() {
            if (
                this.name &&
                this.client &&
                this.clientAddress &&
                this.party &&
                this.partyAddress &&
                this.court &&
                this.wps &&
                this.attorney
            ) {
                let user = firebase.auth().currentUser;
                let userID = user.uid;
                db.collection('cases')
                    .doc(userID)
                    .collection('userCases')
                    .doc(this.name)
                    .set({
                        name: this.name,
                        client: this.client,
                        clientAddress: this.clientAddress,
                        party: this.party,
                        partyAddress: this.partyAddress,
                        court: this.court,
                        wps: this.wps,
                        attorney: this.attorney,
                        caseID: this.caseID
                    })
                    .then(() => {
                        this.feedback = 'Case successfully added';
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

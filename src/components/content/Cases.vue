<template>
    <div>
        <div class="container" v-if="caseList.length > 0">
            <label>Wybierz sprawę</label>
            <select class="browser-default" v-model="selectedCase">
                <option value="" disabled selected>Choose your option</option>
                <option
                    v-for="item in caseList"
                    :value="item"
                    v-bind:key="item"
                    >{{ item }}</option
                >
            </select>
            <div class="center">
                <button
                    v-on:click="displayCaseInfo"
                    class="btn deep-purple"
                    v-if="caseList.length > 0"
                >
                    Wybierz
                </button>
            </div>
        </div>
        <Warning />
        <Information v-if="caseList.length === 0" />
        <div class="container">
            <h3 v-if="showElements">Informacje ogólne:</h3>
            <p v-if="showElements"><b>Nazwa sprawy:</b> {{ caseInfo.name }}</p>
            <p v-if="showElements"><b>Sąd: </b>{{ caseInfo.court }}</p>
            <p v-if="showElements">
                <b>Wartość przedmiotu sporu: </b>{{ caseInfo.wps }}
            </p>
            <p v-if="showElements">
                <b>Sygnatura sprawy: </b>{{ caseInfo.caseID }}
            </p>
        </div>
        <div class="container">
            <h3 v-if="showElements">Dane klienta:</h3>
            <p v-if="showElements"><b>Klient: </b>{{ caseInfo.client }}</p>
            <p v-if="showElements">
                <b>Adres: </b>{{ caseInfo.clientAddress }}
            </p>
        </div>
        <div class="container">
            <h3 v-if="showElements">Dane strony przeciwnej:</h3>
            <p v-if="showElements"><b>Nazwa: </b>{{ caseInfo.party }}</p>
            <p v-if="showElements"><b>Adres: </b>{{ caseInfo.partyAddress }}</p>
            <p v-if="showElements">
                <b>Pełnomocnik: </b>{{ caseInfo.attorney }}
            </p>
        </div>
        <div class="table container">
            <h3 v-if="showElements" v-on:click="showHideTermTable">Terminy↓</h3>
            <table
                class="centered highlight responsive-table"
                v-if="showElements"
                id="termTable"
                hidden
            >
                <thead>
                    <tr>
                        <th
                            v-for="col in termsColumns"
                            v-bind:key="col"
                            v-on:click="sortTable(col, termsRows)"
                        >
                            {{ col }}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="row in termsRows" v-bind:key="row">
                        <td v-for="column in termsColumns" v-bind:key="column">
                            {{ row[column] }}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="table container">
            <h3 v-if="showElements" v-on:click="showHideProceedingTable">
                Wydarzenia↓
            </h3>
            <table
                class="centered highlight responsive-table"
                v-if="showElements"
                id="proceedingTable"
                hidden
            >
                <thead>
                    <tr>
                        <th
                            v-for="col in proceedingsColumns"
                            v-bind:key="col"
                            v-on:click="sortTable(col, proceedingsRows)"
                        >
                            {{ col }}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="row in proceedingsRows" v-bind:key="row">
                        <td
                            v-for="column in proceedingsColumns"
                            v-bind:key="column"
                        >
                            {{ row[column] }}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="table container">
            <h3 v-if="showElements" v-on:click="showHidePleadingTable">
                Pisma procesowe↓
            </h3>
            <table
                class="centered highlight responsive-table"
                v-if="showElements"
                id="pleadingTable"
                hidden
            >
                <thead>
                    <tr>
                        <th
                            v-for="col in pleadingsColumns"
                            v-bind:key="col"
                            v-on:click="sortTable(col, pleadingsRows)"
                        >
                            {{ col }}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="row in pleadingsRows" v-bind:key="row">
                        <td
                            v-for="column in pleadingsColumns"
                            v-bind:key="column"
                        >
                            {{ row[column] }}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="table container">
            <h3 v-if="showElements" v-on:click="showHideNoteTable">Notatki↓</h3>
            <table
                class="centered highlight responsive-table"
                v-if="showElements"
                id="noteTable"
                hidden
            >
                <thead>
                    <tr>
                        <th
                            v-for="col in notesColumns"
                            v-bind:key="col"
                            v-on:click="sortTable(col, notesRows)"
                        >
                            {{ col }}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="row in notesRows" v-bind:key="row">
                        <td v-for="column in notesColumns" v-bind:key="column">
                            {{ row[column] }}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import firebase from 'firebase';
import db from '@/firebase/init';
import Warning from '../layout/Warning';
import Information from '../infos/Information';
export default {
    name: 'Cases',
    components: {
        Warning,
        Information
    },
    data() {
        return {
            caseList: [],
            selectedCase: null,
            caseInfo: {
                name: '',
                client: '',
                clientAddress: '',
                party: '',
                partyAddress: '',
                court: '',
                wps: '',
                attorney: '',
                caseID: ''
            },
            termsRows: [],
            proceedingsRows: [],
            pleadingsRows: [],
            notesRows: [],
            showElements: false,
            tableSorted: false,
            termTableHidden: true,
            proceedingTableHidden: true,
            pleadingTableHidden: true,
            noteTableHidden: true
        };
    },
    computed: {
        termsColumns: function columns() {
            if (this.termsRows.length === 0) {
                return [];
            }
            return Object.keys(this.termsRows[0]);
        },
        proceedingsColumns: function columns() {
            if (this.proceedingsRows.length === 0) {
                return [];
            }
            return Object.keys(this.proceedingsRows[0]);
        },
        pleadingsColumns: function columns() {
            if (this.pleadingsRows.length === 0) {
                return [];
            }
            return Object.keys(this.pleadingsRows[0]);
        },
        notesColumns: function columns() {
            if (this.notesRows.length === 0) {
                return [];
            }
            return Object.keys(this.notesRows[0]);
        }
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
        displayCaseInfo: function() {
            this.resetCaseInfo();
            this.resetLists();
            this.getCaseInfo();
            this.getProceedings();
            this.getNotes();
            this.getPleadings();
            this.getTerms();
            this.showElements = true;
        },
        getProceedings: function() {
            let user = firebase.auth().currentUser;
            let userID = user.uid;
            let selectedCase = this.selectedCase;
            let proceedingsRows = this.proceedingsRows;
            db.collection('cases')
                .doc(userID)
                .collection('userCases')
                .doc(selectedCase)
                .collection('Proceedings')
                .get()
                .then(function(querySnapshot) {
                    querySnapshot.forEach(function(doc) {
                        let data = doc.data();
                        proceedingsRows.push({
                            Data: data.date,
                            Nazwa: data.name,
                            Miasto: data.city,
                            Notatka: data.note
                        });
                    });
                });
        },
        getCaseInfo: function() {
            let user = firebase.auth().currentUser;
            let userID = user.uid;
            let selectedCase = this.selectedCase;
            let caseInfo = this.caseInfo;
            db.collection('cases')
                .doc(userID)
                .collection('userCases')
                .get()
                .then(function(querySnapshot) {
                    querySnapshot.forEach(function(doc) {
                        if (doc.id == selectedCase) {
                            let data = doc.data();
                            caseInfo.name = data.name;
                            caseInfo.attorney = data.attorney;
                            caseInfo.client = data.client;
                            caseInfo.party = data.party;
                            caseInfo.wps = data.wps;
                            caseInfo.partyAddress = data.partyAddress;
                            caseInfo.court = data.court;
                            caseInfo.clientAddress = data.clientAddress;
                            caseInfo.caseID = data.caseID;
                        }
                    });
                });
        },
        getNotes: function() {
            let user = firebase.auth().currentUser;
            let userID = user.uid;
            let selectedCase = this.selectedCase;
            let notesRows = this.notesRows;
            db.collection('cases')
                .doc(userID)
                .collection('userCases')
                .doc(selectedCase)
                .collection('Notes')
                .get()
                .then(function(querySnapshot) {
                    querySnapshot.forEach(function(doc) {
                        let data = doc.data();
                        notesRows.push({
                            Data: data.date,
                            Nazwa: data.name,
                            Notatka: data.note
                        });
                    });
                });
        },
        getPleadings: function() {
            let user = firebase.auth().currentUser;
            let userID = user.uid;
            let selectedCase = this.selectedCase;
            let pleadingsRows = this.pleadingsRows;
            db.collection('cases')
                .doc(userID)
                .collection('userCases')
                .doc(selectedCase)
                .collection('Pleadings')
                .get()
                .then(function(querySnapshot) {
                    querySnapshot.forEach(function(doc) {
                        let data = doc.data();
                        pleadingsRows.push({
                            Data: data.date,
                            Nazwa: data.name,
                            Notatka: data.note
                        });
                    });
                });
        },
        getTerms: function() {
            let user = firebase.auth().currentUser;
            let userID = user.uid;
            let selectedCase = this.selectedCase;
            let termsRows = this.termsRows;
            db.collection('cases')
                .doc(userID)
                .collection('userCases')
                .doc(selectedCase)
                .collection('Terms')
                .get()
                .then(function(querySnapshot) {
                    querySnapshot.forEach(function(doc) {
                        let data = doc.data();
                        termsRows.push({
                            Data: data.date,
                            Od: data.startTime,
                            Do: data.endTime,
                            Nazwa: data.name,
                            Miasto: data.city,
                            Notatka: data.note
                        });
                    });
                });
        },
        resetLists: function() {
            this.proceedingsRows = [];
            this.pleadingsRows = [];
            this.notesRows = [];
            this.termsRows = [];
        },
        resetCaseInfo: function() {
            for (const property in this.caseInfo) {
                this.caseInfo[property] = '';
            }
        },
        sortTable: function(col, rows) {
            if (this.tableSorted) {
                rows.sort(function(a, b) {
                    if (a[col] > b[col]) {
                        return 1;
                    } else if (a[col] < b[col]) {
                        return -1;
                    }
                    return 0;
                });
                this.tableSorted = false;
            } else {
                rows.sort(function(a, b) {
                    if (a[col] < b[col]) {
                        return 1;
                    } else if (a[col] > b[col]) {
                        return -1;
                    }
                    return 0;
                });
                this.tableSorted = true;
            }
        },
        showHideTermTable: function() {
            if (this.termTableHidden) {
                document.getElementById('termTable').hidden = false;
                this.termTableHidden = false;
            } else {
                document.getElementById('termTable').hidden = true;
                this.termTableHidden = true;
            }
        },
        showHideProceedingTable: function() {
            if (this.proceedingTableHidden) {
                document.getElementById('proceedingTable').hidden = false;
                this.proceedingTableHidden = false;
            } else {
                document.getElementById('proceedingTable').hidden = true;
                this.proceedingTableHidden = true;
            }
        },
        showHidePleadingTable: function() {
            if (this.pleadingTableHidden) {
                document.getElementById('pleadingTable').hidden = false;
                this.pleadingTableHidden = false;
            } else {
                document.getElementById('pleadingTable').hidden = true;
                this.pleadingTableHidden = true;
            }
        },
        showHideNoteTable: function() {
            if (this.noteTableHidden) {
                document.getElementById('noteTable').hidden = false;
                this.noteTableHidden = false;
            } else {
                document.getElementById('noteTable').hidden = true;
                this.noteTableHidden = true;
            }
        }
    }
};
</script>

<style></style>

<template>
    <div>
        <p
            v-if="colTime.length > 0"
            id="warning1"
            class="center"
            v-on:click="showHideColTerms"
        >
            Masz {{ colTime.length }} terminów w tym samym czasie (kliknij)
        </p>
        <div class="table container">
            <h3 hidden>Kolidujące terminy:</h3>
            <table
                class="centered highlight responsive-table"
                id="warningTable"
                hidden
            >
                <thead>
                    <tr>
                        <th v-for="col in columnList" v-bind:key="col">
                            {{ col }}
                        </th>
                    </tr>
                </thead>
                <tbody class="warning-table-body">
                    <tr v-for="row in colTime" v-bind:key="row">
                        <td v-for="column in timeColumns" v-bind:key="column">
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

export default {
    name: 'Warning',
    data() {
        return {
            caseList: [],
            termsList: [],
            colTerms: [],
            currentDate: null,
            columnList: [
                'Nazwa',
                'Data',
                'Od',
                'Do',
                'Notatka',
                'Miasto',
                'Sprawa'
            ],
            colTime: [],
            tableHidden: true
        };
    },
    computed: {
        termsColumns: function columns() {
            return Object.keys(this.colTerms[0]);
        },
        timeColumns: function columns() {
            return Object.keys(this.colTime[0]);
        }
    },
    created: function() {
        let colTime = this.colTime;
        let colTerms = this.colTerms;
        let caseList = this.caseList;
        let termsList = this.termsList;
        let user = firebase.auth().currentUser;
        let userID = user.uid;
        db.collection('cases')
            .doc(userID)
            .collection('userCases')
            .get()
            .then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    // doc.data() is never undefined for query doc snapshots
                    caseList.push(doc.id);
                    console.log(doc.id, ' => ', doc.data(), caseList);
                });
            })
            .catch(function(error) {
                console.log('Error getting documents: ', error);
            })
            .then(function() {
                let user = firebase.auth().currentUser;
                let userID = user.uid;
                for (let i in caseList) {
                    db.collection('cases')
                        .doc(userID)
                        .collection('userCases')
                        .doc(caseList[i])
                        .collection('Terms')
                        .get()
                        .then(function(querySnapshot) {
                            querySnapshot.forEach(function(doc) {
                                let data = doc.data();
                                termsList.push({
                                    name: data.name,
                                    date: data.date,
                                    startTime: data.startTime,
                                    endTime: data.endTime,
                                    note: data.note,
                                    city: data.city,
                                    caseID: caseList[i]
                                });
                            });
                        })
                        .catch(function(error) {
                            console.log('Error getting documents: ', error);
                        })
                        .then(function() {
                            for (let j in termsList) {
                                for (let k in termsList) {
                                    if (
                                        termsList[j].date ==
                                            termsList[k].date &&
                                        termsList[j].name !=
                                            termsList[k].name &&
                                        !colTerms.includes(termsList[j])
                                    ) {
                                        colTerms.push(termsList[j]);
                                    }
                                }
                            }
                        })
                        .then(function() {
                            for (let i in colTerms) {
                                for (let j in colTerms) {
                                    let a = colTerms[i].startTime.split(':');
                                    let b = a[0] + a[1];
                                    let c = colTerms[i].endTime.split(':');
                                    let d = c[0] + c[1];
                                    let e = colTerms[j].startTime.split(':');
                                    let f = e[0] + e[1];
                                    let g = colTerms[j].endTime.split(':');
                                    let h = g[0] + g[1];
                                    if (colTerms[i].date == colTerms[j].date) {
                                        if (
                                            ((parseInt(b) >= parseInt(f) &&
                                                parseInt(b) <= parseInt(h)) ||
                                                (parseInt(d) >= parseInt(f) &&
                                                    parseInt(d) <=
                                                        parseInt(h))) &&
                                            !colTime.includes(colTerms[i]) &&
                                            colTerms[i].name != colTerms[j].name
                                        ) {
                                            colTime.push(colTerms[i]);
                                        }
                                    }
                                }
                            }
                        });
                }
            });
    },
    methods: {
        showHideColTerms: function() {
            if (this.tableHidden) {
                document.getElementById('warningTable').hidden = false;
                this.tableHidden = false;
            } else {
                document.getElementById('warningTable').hidden = true;
                this.tableHidden = true;
            }
        }
    }
};
</script>

<style>
#warningTable {
    max-height: 50px;
    background-color: #ff0000;
}
#warning1 {
    background-color: red;
}

.warning-table-body {
    margin-bottom: 48px;
}
</style>

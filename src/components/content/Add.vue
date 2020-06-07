<template>
    <div>
        <div class="container">
            <label>Wybierz akcję</label>
            <select
                class="browser-default"
                @change="displayForm"
                v-model="action"
            >
                <option value="" disabled selected>Choose your option</option>
                <option :value="'AddCase'">Dodaj sprawę</option>
                <option :value="'AddTerm'">Dodaj termin</option>
                <option :value="'AddProceeding'">Dodaj wydarzenie</option>
                <option :value="'AddPleading'">Dodaj pismo</option>
                <option :value="'AddNote'">Dodaj notatkę</option>
            </select>
        </div>
        <AddTerm id="AddTerm" v-if="showAddTerm" />
        <AddProceeding id="AddProceeding" v-if="showAddProceeding" />
        <AddPleading id="AddPleading" v-if="showAddPleading" />
        <AddCase id="AddCase" v-if="showAddCase" />
        <AddNote id="AddNote" v-if="showAddNote" />
    </div>
</template>

<script>
import AddTerm from '../forms/AddTerm';
import AddProceeding from '../forms/AddProceeding';
import AddPleading from '../forms/AddPleading';
import AddCase from '../forms/AddCase';
import AddNote from '../forms/AddNote';
export default {
    name: 'Add',
    components: {
        AddNote,
        AddCase,
        AddPleading,
        AddProceeding,
        AddTerm
    },
    data() {
        return {
            action: null,
            showAddTerm: false,
            showAddProceeding: false,
            showAddPleading: false,
            showAddNote: false,
            showAddCase: false
        };
    },
    methods: {
        displayForm: function() {
            this.hideAllForms();
            if (this.action == 'AddCase') {
                this.showAddCase = true;
            } else if (this.action == 'AddTerm') {
                this.showAddTerm = true;
            } else if (this.action == 'AddProceeding') {
                this.showAddProceeding = true;
            } else if (this.action == 'AddPleading') {
                this.showAddPleading = true;
            } else if (this.action == 'AddNote') {
                this.showAddNote = true;
            }
        },
        hideAllForms: function() {
            this.showAddTerm = false;
            this.showAddProceeding = false;
            this.showAddPleading = false;
            this.showAddNote = false;
            this.showAddCase = false;
        }
    }
};
</script>

<style></style>

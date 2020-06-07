<template>
    <div>
        <div class="container">
            <label>Wybierz akcję</label>
            <select
                class="browser-default"
                v-on:change="displayForm"
                v-model="action"
            >
                <option value="" disabled selected>Choose your option</option>
                <option :value="'EditCaseInfo'">Edytuj sprawę</option>
                <option :value="'EditTerm'">Edytuj termin</option>
                <option :value="'EditProceeding'">Edytuj wydarzenie</option>
                <option :value="'EditPleading'">Edytuj pismo</option>
                <option :value="'EditNote'">Edytuj notatkę</option>
            </select>
        </div>
        <EditNote v-if="showEditNote" />
        <EditPleading v-if="showEditPleading" />
        <EditProceeding v-if="showEditProceeding" />
        <EditTerm v-if="showEditTerm" />
        <EditCaseInfo v-if="showEditCaseInfo" />
    </div>
</template>

<script>
import EditNote from '../edit-forms/EditNote';
import EditPleading from '../edit-forms/EditPleading';
import EditProceeding from '../edit-forms/EditProceeding';
import EditTerm from '../edit-forms/EditTerm';
import EditCaseInfo from '../edit-forms/EditCaseInfo';
export default {
    name: 'Edit',
    components: {
        EditNote,
        EditPleading,
        EditProceeding,
        EditTerm,
        EditCaseInfo
    },
    data() {
        return {
            action: null,
            showEditCaseInfo: false,
            showEditNote: false,
            showEditPleading: false,
            showEditProceeding: false,
            showEditTerm: false
        };
    },
    methods: {
        displayForm: function() {
            this.hideAllForms();
            if (this.action == 'EditNote') {
                this.showEditNote = true;
            } else if (this.action == 'EditPleading') {
                this.showEditPleading = true;
            } else if (this.action == 'EditProceeding') {
                this.showEditProceeding = true;
            } else if (this.action == 'EditTerm') {
                this.showEditTerm = true;
            } else if (this.action == 'EditCaseInfo') {
                this.showEditCaseInfo = true;
            }
        },
        hideAllForms: function() {
            this.showEditCaseInfo = false;
            this.showEditNote = false;
            this.showEditPleading = false;
            this.showEditProceeding = false;
            this.showEditTerm = false;
        }
    }
};
</script>

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
                <option :value="'DeleteCase'">Usuń sprawę</option>
                <option :value="'DeleteCaseElement'"
                    >Usuń element sprawy</option
                >
            </select>
        </div>
        <DeleteCase v-if="showDeleteCase" />
        <DeleteCaseElement v-if="showDeleteCaseElement" />
    </div>
</template>

<script>
import DeleteCase from '../delete-forms/DeleteCase';
import DeleteCaseElement from '../delete-forms/DeleteCaseElement';
export default {
    name: 'Delete',
    components: {
        DeleteCase,
        DeleteCaseElement
    },
    data() {
        return {
            action: null,
            showDeleteCase: false,
            showDeleteCaseElement: false
        };
    },
    methods: {
        displayForm: function() {
            this.hideAllForms();
            if (this.action == 'DeleteCase') {
                this.showDeleteCase = true;
            } else if (this.action == 'DeleteCaseElement') {
                this.showDeleteCaseElement = true;
            }
        },
        hideAllForms: function() {
            this.showDeleteCase = false;
            this.showDeleteCaseElement = false;
        }
    }
};
</script>

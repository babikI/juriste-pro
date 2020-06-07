<template>
    <div>
        <h3 class="center">Aktualnie nie masz żadnych spraw.</h3>
        <p class="center">
            Kliknij na poniższy przycisk, aby założyć sprawę i następnie dodać
            do niej terminy, wydarzenia, pisma oraz notatki.
        </p>
        <div class="container center">
            <button
                id="link-button"
                class="btn deep-purple"
                v-on:click="redirectToAdd"
            >
                Dodaj
            </button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Information',
    methods: {
        redirectToAdd: function() {
            this.$router.push({ name: 'Add' });
        }
    }
};
</script>

<style scoped></style>

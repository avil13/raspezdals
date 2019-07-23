<template>
    <v-snackbar v-model="snackbar" multi-line right top vertical>
        {{ text }}
        <v-btn color="pink" flat @click="snackbar = false">Close</v-btn>
    </v-snackbar>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator';
import { State, Mutation } from 'vuex-class';
import { IMainStore } from '~/store';

@Component
export default class SnackBarComponent extends Vue {
    @State
    msg;

    @Mutation showMsg;

    get text() {
        if (this.msg) {
            setTimeout(() => {
                this.showMsg('');
            }, 3000);
        }
        return this.msg;
    }

    get snackbar() {
        return !!this.msg;
    }
}
</script>

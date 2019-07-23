<template>
    <v-app id="inspire" dark>
        <!-- nav -->
        <nav-bar></nav-bar>
        <!-- /nav -->
        <!-- content -->
        <v-content app>
            <v-container grid-list-md>
                <nuxt></nuxt>
            </v-container>
        </v-content>
        <!-- /content -->
        <snack-bar></snack-bar>
        <!-- footer -->
        <!-- /footer -->
    </v-app>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator';
import { State } from 'vuex-class';

import navBar from '~/components/nav-bar/nav-bar.vue';
import snackBar from '~/components/snackbar/snack-bar.vue';

@Component({
    components: {
        'nav-bar': navBar,
        'snack-bar': snackBar
    }
})
export default class DefaultLayout extends Vue {}
</script>

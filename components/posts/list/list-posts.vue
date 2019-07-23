<template>
    <v-flex xs12>
        {{ postText }}
        <v-flex>
            <v-textarea
                v-model="postText"
                label="What would you like to share?"
                auto-grow
                outline
                counter="128"
                append-icon="mdi-send"
            ></v-textarea>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn flat class="mt--10">Send</v-btn>
            </v-card-actions>
        </v-flex>

        <!--  -->
        <v-list subheader three-line>
            <v-subheader>User Posts</v-subheader>

            <v-list-tile v-for="(li, i) in list" :key="`${i}_${li.date}`">
                <v-list-tile-content>
                    <v-list-tile-title>{{ li.text }}</v-list-tile-title>
                    <v-list-tile-sub-title>{{ li.text }}</v-list-tile-sub-title>
                </v-list-tile-content>
            </v-list-tile>
        </v-list>
    </v-flex>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator';
import { State } from 'vuex-class';

import Api from '~/api';

@Component
export default class ListPostsComponent extends Vue {
    postText = 'sd';

    list: any[] = [];

    sendPost() {
        debugger;
    }

    getPosts() {
        Api.posts.get().then(data => {
            if (data.docs) {
                this.list = data.docs as any[];
            }
        });
    }

    mounted() {
        this.getPosts();
    }
}
</script>


<style>
.mt--10 {
    margin-top: -10px !important;
}
</style>

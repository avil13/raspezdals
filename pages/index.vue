<template>
    <div>
        <v-layout row wrap>
            <list-posts></list-posts>
        </v-layout>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator';
import { State } from 'vuex-class';

import listPosts from '~/components/posts/list/list-posts.vue';

@Component({
    components: {
        'list-posts': listPosts
    }
})
export default class IndexPage extends Vue {
    //
}
</script>


<style>
.mt--5 {
  margin-top: -48px !important;
}
</style>

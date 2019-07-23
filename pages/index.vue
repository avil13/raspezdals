<template>
<div>
    <v-list three-line>
        <list-animated>
            <div v-for="(item, index) in items" :key="index">
                <v-subheader
                    v-if="item.header"
                >
                    {{ item.header }}
                </v-subheader>

                <v-divider
                    v-else-if="item.divider"
                    :inset="item.inset"
                ></v-divider>

                <v-list-tile
                    v-else
                    avatar
                    @click="() => {}"
                >
                    <v-list-tile-avatar>
                    <img :src="item.avatar">
                    </v-list-tile-avatar>

                    <v-list-tile-content>
                        <v-list-tile-title v-text="item.title"></v-list-tile-title>
                        <v-list-tile-sub-title v-text="item.subtitle"></v-list-tile-sub-title>
                    </v-list-tile-content>
                </v-list-tile>
            </div>
        </list-animated>
    </v-list>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator';

import listAnimated from '~/components/list-animated/list-animated.vue';

@Component({
    components: {
        'list-animated': listAnimated
    }
})
export default class IndexPage extends Vue {
    items: any = [];

    tmpItems = [
        { header: 'Team list:' },
        {
            avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
            title: 'Brunch this weekend?',
            subtitle: "Ali Connors &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?"
        },
        { divider: true, inset: true },
        {
            avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
            title: 'Oui oui',
            subtitle: 'Sandra Adams &mdash; Do you have Paris recommendations? Have you ever been?'
        },
        { divider: true, inset: true },
        {
            avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
            title: 'Oui oui',
            subtitle: 'Sandra Adams &mdash; Do you have Paris recommendations? Have you ever been?'
        },
        { divider: true, inset: true },
        {
            avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
            title: 'Oui oui',
            subtitle: 'Sandra Adams &mdash; Do you have Paris recommendations? Have you ever been?'
        }
    ];

    moveItems() {
        if (this.tmpItems.length) {
            this.items.push(this.tmpItems.shift());
            setTimeout(() => this.moveItems(), 250);
        }
    }

    mounted() {
        setTimeout(() => this.moveItems(), 300);
    }
}
</script>


<template>
    <div>
        <v-toolbar app fixed color="deep-orange deep-orange darken-4">
            <nuxt-link to="/">
                <v-toolbar-title class="white--text">Ra$pezdal$$</v-toolbar-title>
            </nuxt-link>

            <v-spacer></v-spacer>

            <v-toolbar-side-icon
                @click.stop="drawer=!drawer"
                class="hidden-md-and-up"
            ></v-toolbar-side-icon>

            <v-toolbar-items class="hidden-sm-and-down">
                <v-btn
                    ripple
                    flat
                    v-for="(item, i) in menuItems"
                    :key="i"
                    :to="item.to"
                >
                    <v-icon v-html="item.icon"></v-icon>
                </v-btn>
            </v-toolbar-items>
        </v-toolbar>
        <!-- navigation-drawer -->
        <v-navigation-drawer
            v-model="drawer"
            fixed
            temporary
            right
            class="hidden-md-and-up"
        >
            <v-list>
                <v-list-tile @click.stop="drawer=false">
                    <v-list-tile-action>
                        <v-icon color="#dd2c00" right v-html="`close`"></v-icon>
                    </v-list-tile-action>
                </v-list-tile>
                <!--  -->
                <v-list-tile
                    v-for="(item, i) in menuItems"
                    :key="i"
                    :to="item.to"
                    avatar
                >
                    <v-list-tile-action>
                        <v-icon left v-html="item.icon"></v-icon>
                    </v-list-tile-action>
                    <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>
        <!--  -->
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator';
import { namespace } from 'vuex-class';

const User = namespace('user');

interface IMenuItems {
    icon?: string;
    title: string;
    to: any;
}

@Component
export default class NavBarComponent extends Vue {
    @User.Getter loaded;
    @User.Getter is_auth;
    @User.Getter user;
    @User.Action GET_USER;

    drawer = false;

    get menuItems(): IMenuItems[] {
        if (this.loaded) {
            if (!this.is_auth) {
                return [
                    {
                        icon: 'input',
                        title: 'Login',
                        to: { name: 'auth-login' }
                    }
                ];
            } else {
                return [
                    {
                        icon: 'account_circle',
                        title: '',
                        to: '/'
                    },
                    {
                        icon: 'exit_to_app',
                        title: 'Выйти',
                        to: '/logout'
                    }
                ];
            }
        }
        return [];
    }

    mounted() {
        this.GET_USER();
    }
}
</script>

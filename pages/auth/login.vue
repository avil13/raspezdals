<template>
    <div>
        <v-container fluid fill-height>
            <v-layout flex align-center justify-center>
                <v-flex xs12 sm4>
                    <v-toolbar class="pt-5 primary">
                        <v-toolbar-title class="white--text">
                            <h4>Welcome Back</h4>
                        </v-toolbar-title>
                    </v-toolbar>
                    <v-card>
                        <v-card-text class="pt-4">
                            <div>
                                <v-form
                                    @submit.prevent="submit"
                                    v-model="valid"
                                    ref="form"
                                >
                                    <v-text-field
                                        label="Enter your e-mail address"
                                        v-model="email"
                                        :rules="emailRules"
                                        required
                                    ></v-text-field>
                                    <v-text-field
                                        label="Enter your password"
                                        v-model="password"
                                        min="8"
                                        @click:append="() => (e1 = !e1)"
                                        :append-icon="e1 ? 'visibility' : 'visibility_off'"
                                        :type="e1 ? 'password' : 'text'"
                                        :rules="passwordRules"
                                        counter
                                        required
                                    ></v-text-field>
                                    <v-layout justify-space-between>
                                        <v-btn
                                            type="submit"
                                            :class=" {
                                                'primary white--text' : valid,
                                                disabled: !valid
                                            }"
                                        >Login</v-btn>
                                        <!-- <a href>Forgot Password</a> -->
                                        <nuxt-link
                                            :to="{name: 'auth-registration'}"
                                        >Registation</nuxt-link>
                                    </v-layout>
                                </v-form>
                            </div>
                        </v-card-text>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator';
import { Mutation, namespace } from 'vuex-class';
import Api from '~/api';

const User = namespace('user');

@Component
export default class LoginPage extends Vue {
    @Mutation showMsg;
    @User.Mutation setPerson;

    valid = false;
    e1 = false;
    password = '';
    passwordRules = [v => !!v || 'Password is required'];
    email = '';
    emailRules = [
        v => !!v || 'E-mail is required',
        v =>
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
            'E-mail must be valid'
    ];

    submit() {
        if (!(this.$refs.form as HTMLFormElement).validate()) {
            return;
        }

        Api.login({
            email: this.email,
            password: this.password
        })
            .then(data => {
                if (!data.success) {
                    if (data.msg) {
                        this.showMsg(data.msg);
                    }
                } else if (data.user) {
                    this.setPerson(data.user);
                }
            })
            .catch(e => {
                // TODO: добавить проверку
                this.showMsg(e.response.data.msg);
            });
    }
    clear() {
        (this.$refs.form as HTMLFormElement).reset();
    }
}
</script>

<template>
    <dashboard columns="8" rows="8">
        <value-tile position="c2:f2" color="yellow">
            <span slot="value">Dashboard</span>
        </value-tile>
        <value-tile position="c6:d7" color="yellow" heading="Data/Hora Curitiba">
            <date-time slot="before" format="ddd DD/MM" time-zone="America/Sao_Paulo"></date-time>
            <date-time slot="value" format="HH:mm" time-zone="America/Sao_Paulo"></date-time>
        </value-tile>
        
        <value-tile position="e6:f7" heading="Clima Curitiba" color="yellow">
            <weather slot="value" city="Curitiba"></weather>
        </value-tile>

        <value-tile position="c3:f5" color="blue" heading="Login">
            <md-field slot="value">
                <label>Username</label>
                <md-input  v-on:keyup.enter="checkLogin(username.text, password.text)" v-model="username"></md-input>
            </md-field>
            <md-field slot="value">
                <label>Password</label>
                <md-input v-on:keyup.enter="checkLogin(username.text, password.text)" v-model="password" type="password"></md-input>
            </md-field>
            <md-button slot="value" v-on:click="checkLogin(username.text, password.text)" class="md-raised md-primary">Login</md-button>
        </value-tile>

        <md-dialog-alert
            :md-active.sync="active"
            md-title="Falha na Autenticação"
            md-content="Houve alguma falha ao realizar o login! Tente novamnte !" 
            v-on:keyup.enter="onConfirm()"
            />

        <router-view/>
    </dashboard>
</template>

<script>
    import Vue from 'vue'
    import VueMaterial from 'vue-material'
    import 'vue-material/dist/vue-material.min.css'

    import Dashboard from '../components/Dashboard'
    import ValueTile from '../components/ValueTile'
    import DateTime from '../components/atoms/DateTime';
    import Weather from '../components/atoms/Weather';
    
    import axios from 'axios'
    import VueAxios from 'vue-axios'

    const crypto_extra = require('crypto-extra');

    Vue.use(VueAxios, axios, VueMaterial)

    export default {
        components: {
            Dashboard,
            ValueTile,
            DateTime,
            Weather
        },
        data() {
            return {
                password: "",
                username: "",
                active: false
            }
        },
        created()
        {
            console.log("> On Create Login!")
            sessionStorage.setItem('session-token', false);
            console.log("> Session: token - "+sessionStorage.getItem('session-token'));
        },
        methods: {
            onConfirm: function(){
                this.active = false;
            },
            onCancel: function(){
                this.active = false;
            },
            checkLogin: function(username, password){
                // console.log("> Post: "+JSON.stringify({ "username": this.username,  "password": this.password }));
                this.axios.post('/api/auth/', {
                    username: this.username,  
                    password: crypto_extra.createHash('sha256').update(this.password).digest("hex")
                })
                .then(response => {
                    if( response.data.auth === true )
                    {
                        console.log("> Login realizado com Sucesso! ");
                        // var sess = sessionStorage.getItem('session-token');
                        // if(sess && sess !== 'null') { // Sometimes empty values are a string "null"
                        sessionStorage.setItem('session-token', true);
                        console.log("> Session: token - "+sessionStorage.getItem('session-token'));
                        // }
                        this.$router.push('/home');
                    }
                    else
                    {
                        this.active = true;
                    }
                })
                .catch(e => {
                    this.errors.push(e)
                })
            }
        }
    }
</script>


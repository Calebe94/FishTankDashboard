<template>
    <dashboard columns="8" rows="8">
        <value-tile position="c1:f2" color="yellow">
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
                <md-input v-model="initial"></md-input>
            </md-field>
            <md-field slot="value">
                <label>Password toggle</label>
                <md-input v-model="password" type="password"></md-input>
            </md-field>
        </value-tile>
        <router-view/>
    </dashboard>
</template>

<script>
    import Vue from 'vue'
    import VueMaterial from 'vue-material'
    import 'vue-material/dist/vue-material.min.css'

    Vue.use(VueMaterial)
    import Dashboard from '../components/Dashboard'
    import ValueTile from '../components/ValueTile'
    import DateTime from '../components/atoms/DateTime';
    import Weather from '../components/atoms/Weather';

    export default {
        components: {
            Dashboard,
            ValueTile,
            DateTime,
            Weather
        }
    }
</script>


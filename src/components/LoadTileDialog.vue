<template>
        <load-tile :position="position" :color="color" :heading="heading">
            <div slot="before">
                <span>{{ type }}</span>
            </div>
            <div slot="before">
                <span>{{ value }}</span>
            </div>
            <div slot="after">
                <md-dialog class="md-accent" :md-active.sync="showDialog">
                    <md-dialog-title>Preferences</md-dialog-title>

                    <md-tabs md-dynamic-height>
                        <md-tab md-label="Horário">
                            <p>Configure o Horário para ligar a Carga</p>
                            <div class="viewport">
                                <md-toolbar :md-elevation="1">
                                    <pick-hour label="Hora" @selected="selectInitialHour"></pick-hour>
                                    <pick-minute label="Minuto" @selected="selectInitialMinute"></pick-minute>
                                </md-toolbar>
                            </div>
                            <p>Configure o Horário para desligar a Carga</p>
                            <div class="viewport">
                                <md-toolbar :md-elevation="1">
                                    <pick-hour label="Hora" @selected="selectEndHour"></pick-hour>
                                    <pick-minute label="Minuto" @selected="selectEndMinute"></pick-minute>
                                </md-toolbar>
                            </div>

                            <md-dialog-actions>
                                <md-button class="md-primary" @click="showDialog = false">Fechar</md-button>
                                <md-button class="md-primary" @click="setHour();showDialog = false">Salvar</md-button>
                            </md-dialog-actions>
                        </md-tab>

                        <md-tab md-label="Sensor">
                            <p>Insira os valores para ativacão e desativacão da Carga</p>
                            <md-field>
                                <label class="md-helper-text">Ativa</label>
                                <md-input v-on:keyup.enter="setInitialValue" v-model="initialValue"></md-input>
                            </md-field>
                            <md-field>
                                <label class="md-helper-text">Desativa</label>
                                <md-input v-on:keyup.enter="setEndValue" v-model="endValue"></md-input>
                            </md-field>

                            <md-dialog-actions>
                                <md-button class="md-primary" @click="showDialog = false">Fechar</md-button>
                                <md-button class="md-primary" @click="setValue(); showDialog = false">Salvar</md-button>
                            </md-dialog-actions>
                        </md-tab>

                        <md-tab md-label="Desativar">
                            <p>Deseja desativar a Carga?</p>

                            <md-dialog-actions>
                                <md-button class="md-primary" @click="showDialog = false">Não</md-button>
                                <md-button class="md-primary" @click="loadDeactivate(); showDialog = false">Sim</md-button>
                            </md-dialog-actions>

                        </md-tab>
                    </md-tabs>
                </md-dialog>
                <md-button class="md-primary md-raised" @click="showDialog = true">Alterar</md-button>
            </div>
        </load-tile>
    
</template>

<style lang="scss" scoped>
    .md-accent {
        // margin: 40px;
        background: #21243f;
        // background: rgba(0, 0, 0, 0.9);
        color: #fff;
        text-shadow: 0 1px 0 rgba(0, 0, 0, 0.4);
    }
</style>
<script>
    import Vue from 'vue'
    import VueMaterial from 'vue-material'
    import 'vue-material/dist/vue-material.min.css'
    
    Vue.use(VueMaterial)

    import axios from 'axios'
    // import VueAxios from 'vue-axios'

    Vue.use(axios);

    import Dashboard from '../components/Dashboard';

    import DateTime from '../components/atoms/DateTime';
    import PercentileChange from '../components/atoms/PercentileChange';
    import MinValue from '../components/atoms/MinValue';
    import MaxValue from '../components/atoms/MaxValue';
    import AvgValue from '../components/atoms/AvgValue';
    import EmaValue from '../components/atoms/EmaValue';
    import Weather from '../components/atoms/Weather';
    import Tile from "../components/atoms/Tile";

    import ValueTile from '../components/ValueTile';
    import ListTile from '../components/ListTile';
    import SparklineTile from '../components/SparklineTile';
    import GaugeTile from '../components/GaugeTile';
    import ChartTile from '../components/ChartTile';
    import IndicatorTile from '../components/IndicatorTile';
    import BatteryTile from '../components/BatteryTile';
    import LevelTile from '../components/LevelTile';
    import TextTile from '../components/TextTile';

    import LoadTile from '../components/LoadTile';

    import TimePicker from '../components/atoms/TimePicker'
    import PickHour from '../components/atoms/PickHour'
    import PickMinute from '../components/atoms/PickMinute'

    export default {

        components: {
            Dashboard,
            DateTime,
            PercentileChange,
            MinValue,
            MaxValue,
            AvgValue,
            EmaValue,
            Weather,
            ValueTile,
            ListTile,
            SparklineTile,
            GaugeTile,
            ChartTile,
            IndicatorTile,
            BatteryTile,
            LevelTile,
            TextTile,
            Tile,
            TimePicker,
            LoadTile,
            PickHour,
            PickMinute
        },
        extends: LoadTile,
        
        props:{
            position: String,
            type: String,
            value: String,
            typeLoad: String,
            whichLoad: String
        },
        methods: {
            selectInitialHour: function(hour){
                if(hour != "function String() { [native code] }")
                {
                    console.log("Carga: "+this.whichLoad+" - Tipo: "+this.typeLoad+" - "+"Hora Inicial: "+hour);
                    this.initialHour = hour;
                }
            },
            selectInitialMinute: function(minute){
                if(minute != "function String() { [native code] }")
                {
                    console.log("Carga: "+this.whichLoad+" - Tipo: "+this.typeLoad+" - "+"Minuto Inicial: "+minute);
                    this.initalMinute = minute;
                }
            },
            selectEndHour: function(hour){
                if(hour != "function String() { [native code] }")
                {
                    console.log("Carga: "+this.whichLoad+" - Tipo: "+this.typeLoad+" - "+"Hora Final: "+hour);
                    this.endHour = hour;
                }
            },
            selectEndMinute: function(minute){
                if(minute != "function String() { [native code] }")
                {
                    console.log("Carga: "+this.whichLoad+" - Tipo: "+this.typeLoad+" - "+"Minute Final: "+minute);
                    this.endMinute = minute;
                }
            },
            setInitialValue: function(){
                console.log("Initial Value: "+initialValue);
            },
            setEndValue: function(){
                console.log("End Value: "+endValue);
            },
            setHour: function(){
                // Desativa o tipo sensor do banco
                // Ativa o tipo hora do banco
                // Seta Hora
                var initialTime = this.initialHour+":"+this.initalMinute;
                var endTime = this.endHour+":"+this.endMinute;
                this.axios.post('/api/master/set/'+this.typeLoad+"/"+this.whichLoad+"/time", { initial: initialTime, end: endTime})
                .then(function(response){

                });
                console.log("Carga: "+this.whichLoad+" - Tipo: "+this.typeLoad+" - "+"Hora Inicial: "+this.initialHour+":"+this.initalMinute+" - Hora Final: "+this.endHour+":"+this.endMinute);
            },
            setValue: function(){
                // Desativa o tipo hora do banco
                // Ativa o tipo sensor do banco
                // Seta valor
                this.axios.post('/api/master/set/'+this.typeLoad+"/"+this.whichLoad+"/value", { initial: this.initialValue, end: this.endValue})
                .then(function(response){

                });
                console.log("Carga: "+this.whichLoad+" - Tipo: "+this.typeLoad+" - "+"Valor Inicial: "+this.initialValue+" - Valor Final: "+this.endValue);
            },
            loadDeactivate: function(){
                // Desativa a carga
                this.axios.post('/api/master/set/'+this.typeLoad+"/"+this.whichLoad+"/disable", {})
                .then(function(response){

                });
                console.log(this.whichLoad+"-"+this.typeLoad+" Deactivated!");
            }
        },
        data(){
            return{
                showDialog: false,
                initialValue: null,
                endValue: null,
                initialHour: null,
                endHour: null,
                initalMinute: null,
                endMinute: null
            }
        }
    }
</script>

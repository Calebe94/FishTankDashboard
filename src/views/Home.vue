<template>
    <dashboard columns="8" rows="8">
        <value-tile position="a1:a2" color="yellow">
            <date-time slot="before" format="ddd DD/MM" time-zone="America/Sao_Paulo"></date-time>
            <date-time slot="value" format="HH:mm" time-zone="America/Sao_Paulo"></date-time>
        </value-tile>
        
        <value-tile position="h1:h2" heading="Curitiba" color="yellow">
            <weather slot="value" city="Curitiba"></weather>
        </value-tile>
        
        <value-tile position="b1:g2" color="yellow">
            <span slot="value">Dashboard</span>
        </value-tile>
        <chart-tile position="b3:g5" heading="Temperatura" color="blue" :data="temperatureChart" type="line"></chart-tile>
        <chart-tile position="b6:g8" heading="Humidity" color="red" :data="humidityChart" type="line"></chart-tile>

        <level-tile position="h3:h5" color="blue" label="Temperature" :max="30" :value="temperature" unit="°C"></level-tile>
        <level-tile position="h6:h8" color="red" label="Humidity" :max="100" :value="humidity" unit="%"></level-tile>

        <value-tile position="a3:a4" color="blue" heading="SetPoint">
            <md-field slot="value">
                <label>Initial Value</label>
                <md-input v-on:keyup.enter="setInitialTemp" v-model="initialTemp"></md-input>
            </md-field>
            <md-field slot="value">
                <label>Final Value</label>
                <md-input v-on:keyup.enter="setFinalTemp" v-model="finalTemp"></md-input>
            </md-field>
        </value-tile>
        <indicator-tile position="a5:a5" :value="tempAtuador" color="blue" label="Atuador"></indicator-tile>

        <value-tile position="a6:a7" color="red" heading="SetPoint">
            <md-field slot="value">
                <label>Initial Value</label>
                <md-input v-on:keyup.enter="setinitialHumidity" v-model="initialHumidity"></md-input>
            </md-field>
            <md-field slot="value">
                <label>Final Value</label>
                <md-input v-on:keyup.enter="setfinalHumidity" v-model="finalHumidity"></md-input>
            </md-field>
        </value-tile>
        <indicator-tile position="a8:a8" :value="humidityAtuador" color="red" label="Atuador"></indicator-tile>
    </dashboard>
</template>

<script>
    import Vue from 'vue'
    import VueMaterial from 'vue-material'
    import 'vue-material/dist/vue-material.min.css'
    
    Vue.use(VueMaterial)

    import axios from 'axios'
    // import VueAxios from 'vue-axios'

    Vue.use(axios);

    /* SWIPER */
    import 'swiper/dist/css/swiper.css'
    import { swiper, swiperSlide } from 'vue-awesome-swiper'

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
            swiper,
            swiperSlide
        },

        methods: {
            setfinalHumidity: function() {
                console.log("> Temperatura Inicial:"+this.finalHumidity);
                this.axios.post('/api/setpoints/set/temperature', { minimal_value: ""+this.initialHumidity, maximum_value: ""+this.finalHumidity })
                .then(function(response){
                    console.log('> saved successfully');
                });  
            },
            setinitialHumidity: function() {
                console.log("> Temperatura Inicial:"+this.initialHumidity);
                this.axios.post('/api/setpoints/set/temperature', { minimal_value: ""+this.initialHumidity, maximum_value: ""+this.finalHumidity })
                .then(function(response){
                    console.log('> saved successfully');
                });  
            },
            setFinalTemp: function() {
                console.log("> Temperatura Inicial:"+this.finalTemp);
                this.axios.post('/api/setpoints/set/temperature', { minimal_value: ""+this.initialTemp, maximum_value: ""+this.finalTemp })
                .then(function(response){
                    console.log('> saved successfully');
                });  
            },
            setInitialTemp: function() {
                console.log("> Temperatura Inicial:"+this.initialTemp);
                this.axios.post('/api/setpoints/set/temperature', { minimal_value: ""+this.initialTemp, maximum_value: ""+this.finalTemp })
                .then(function(response){
                    console.log('> saved successfully');
                });  
            },
            fillTempSetpoints: function(response){
                this.initialTemp = response.data.minimal_value;
                this.finalTemp = response.data.maximum_value;
            },
            fillHumiditySetpoints: function(response){
                this.initialHumidity = response.data.minimal_value;
                this.finalHumidity = response.data.maximum_value;
            },
            getSetpoints: function() {
                this.axios.get("/api/setpoints/get/temperature")
                .then(this.fillTempSetpoints);
                this.axios.get("/api/setpoints/get/humidity")
                .then(this.fillHumiditySetpoints);
            },
            verifyActuators: function(){
                if(parseInt(this.temperature) < parseInt(this.initialTemp) || parseInt(this.temperature) > parseInt(this.finalTemp))
                {
                    this.tempAtuador = true;
                }
                else
                {
                    this.tempAtuador = false;
                }

                if(parseInt(this.humidity) < parseInt(this.initialHumidity) || parseInt(this.humidity) > parseInt(this.finalHumidity))
                {
                    this.humidityAtuador = true;
                }
                else
                {
                    this.humidityAtuador = false;
                }
            }
        },

        data(){
            return {
                temperature: 0,
                humidity: 0,
                hour: 0, 
                temperatureChart: {},
                humidityChart: {},
                initialTemp:0,
                finalTemp: 0,
                initialHumidity: 0,
                finalHumidity:0,
                tempAtuador: false,
                humidityAtuador: false,
            }
        },

        created() {

            var self = this;

            var sess = sessionStorage.getItem('session-token');
            console.log( "> Session: token "+sess );
            if( ""+sess === "false" )
            {
                console.log("> Session: Login Não realizado!");
                this.$router.push('/');
            }
            this.getSetpoints();
            // Temperature
            setInterval(function(){
                self.hour+=1;
                if(self.hour == 24)
                {
                    self.hour = 0;
                    // Temperatura
                    self.temperatureChart.datasets[0].data = [] ;
                    self.temperatureChart.labels = [] ; 
                    // humidity
                    self.humidityChart.datasets[0].data = [] ;
                    self.humidityChart.labels = [] ; 
                }
                // Temperatura
                self.temperature = Math.random() * 30;
                self.humidity = Math.floor(Math.random() * 100)
                self.temperatureChart.datasets[0].data.push(self.temperature) ;
                // self.temperatureChart.datasets[0].data[self.hour] = self.temperature ;
                var data = new Date();
                // self.temperatureChart.labels.push(self.hour); 

                // self.temperatureChart.labels.push(data.toLocaleDateString("en-US")); 
                self.temperatureChart.labels.push(data.getDate()+"/"+(data.getMonth()+1)+" "+self.hour+":00");
                // humidity
                self.humidityChart.datasets[0].data.push(self.humidity) ;
                self.humidityChart.labels.push(self.hour);
                
                self.verifyActuators();
                
            }, 1000);
            
            self.temperatureChart = {
                labels: [],
                datasets: [
                    {
                        label: 'Temperatura',
                        color: '#2ecc71',
                        data: []
                    }
                ]
            }

            self.humidityChart = {
                labels: [],
                datasets: [
                    {
                        label: 'Humidity',
                        color: '#3498db',
                        data: []
                    }
                ]
            }
        },
    };

</script>

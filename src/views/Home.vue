<template>
    <dashboard columns="8" rows="8">
        <value-tile position="a1:a2" heading="Data/Hora" color="yellow">
            <date-time slot="before" format="ddd DD/MM" time-zone="America/Sao_Paulo"></date-time>
            <date-time slot="value" format="HH:mm" time-zone="America/Sao_Paulo"></date-time>
        </value-tile>
        
        <value-tile position="h1:h2" heading="Curitiba" color="yellow">
            <weather slot="value" city="Curitiba"></weather>
        </value-tile>
        
        <value-tile position="b1:g2" color="yellow">
            <span slot="value">Controlador do Aquário</span>
        </value-tile>

        <load-tile-dialog position="a3:b4" color="green" heading="Relê 1 - (AC)" type="Horario" value="10:00 - 20:00" typeLoad="AC" whichLoad="1"></load-tile-dialog>
        <indicator-tile position="a5:b5" :value="humidityAtuador" color="red" label="Status"></indicator-tile> 

        <load-tile-dialog position="c3:d4" color="green" heading="Relê 2 - (AC)" type="Horario" value="10:00 - 20:00" typeLoad="AC" whichLoad="2"></load-tile-dialog>
        <indicator-tile position="c5:d5" :value="humidityAtuador" color="red" label="Status"></indicator-tile> 

        <load-tile-dialog position="e3:f4" color="green" heading="Relê 3 - (AC)" type="Horario" value="10:00 - 20:00" typeLoad="AC" whichLoad="3"></load-tile-dialog>
        <indicator-tile position="e5:f5" :value="humidityAtuador" color="red" label="Status"></indicator-tile> 

        <load-tile-dialog position="g3:h4" color="green" heading="Relê 4 - (AC)" type="Horario" value="10:00 - 20:00" typeLoad="AC" whichLoad="4"></load-tile-dialog>
        <indicator-tile position="g5:h5" :value="humidityAtuador" color="red" label="Status"></indicator-tile> 

        <load-tile-dialog position="b6:c7" color="green" heading="Relê 1 - (DC)" type="Horario" value="10:00 - 20:00" typeLoad="DC" whichLoad="1"></load-tile-dialog>
        <indicator-tile position="b8:c8" :value="humidityAtuador" color="green" label="Status"></indicator-tile> 
                
        <load-tile-dialog position="d6:e7" color="green" heading="Relê 2 - (DC)" type="Horario" value="10:00 - 20:00" typeLoad="DC" whichLoad="2"></load-tile-dialog>
        <indicator-tile position="d8:e8" :value="humidityAtuador" color="green" label="Status"></indicator-tile>
                
        <load-tile-dialog position="f6:g7" color="green" heading="Relê 3 - (DC)" type="Horario" value="10:00 - 20:00" typeLoad="DC" whichLoad="3"></load-tile-dialog>
        <indicator-tile position="f8:g8" :value="true" color="green" label="Status"></indicator-tile>
    
        <level-tile position="a6:a8" color="blue" label="Sensor 1" :max="50" :value="temperature" unit="°C"></level-tile>
        <level-tile position="h6:h8" color="blue" label="Sensor 2" :max="50" :value="temperature" unit="°C"></level-tile> 
    </dashboard>
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

    import 'swiper/dist/css/swiper.css'
    import { swiper, swiperSlide } from 'vue-awesome-swiper'
    
    Vue.use(VueMaterial)

    import axios from 'axios'

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
    import LoadTileDialog from '../components/LoadTileDialog';

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
            swiper,
            swiperSlide,
            TimePicker,
            LoadTile,
            PickHour,
            PickMinute,
            LoadTileDialog
        },

        methods: {
            showSelectedHour: function(data){
                console.log("Hora Selecionada: "+data);
            },
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
            fillTemperature: function(response){
                var temperature = JSON.stringify(response.data.measure);
                this.temperature = parseFloat(JSON.parse(temperature).value);
            },
            fillHumidity: function(response){
                var humidity = JSON.stringify(response.data.measure);
                this.humidity = parseFloat(JSON.parse(humidity).value);
            },
            getSetpoints: function() {
                this.axios.get("/api/setpoints/get/temperature")
                .then(this.fillTempSetpoints);
                this.axios.get("/api/setpoints/get/humidity")
                .then(this.fillHumiditySetpoints);
            },
            getTemperature: function(){
                this.axios.get('/api/measure/last/temperature')
                .then(this.fillTemperature);
            },
            getHumidity: function(){
                this.axios.get('/api/measure/last/humidity')
                .then(this.fillHumidity);
            },
            clearCharts: function(){
                this.temperatureChart.datasets[0].data = [] ;
                this.temperatureChart.labels = [] ; 

                this.humidityChart.datasets[0].data = [] ; 
                this.humidityChart.labels = [] ; 
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
                initialTemp: null,
                finalTemp: null,
                initialHumidity: 0,
                finalHumidity:0,
                tempAtuador: false,
                humidityAtuador: false,
                showDialog: false
            }
        },
        mounted(){
            console.log("MOUNTED!");
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

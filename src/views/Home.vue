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
        <chart-tile position="b3:g5" heading="Temperatura" color="blue" :data="chartData1" type="line"></chart-tile>
        <chart-tile position="b6:g8" heading="Umidade" color="red" :data="chartData2" type="line"></chart-tile>

        <level-tile position="h3:h5" color="blue" label="Temperature" :max="30" :value="temperature" unit="°C"></level-tile>
        <level-tile position="h6:h8" color="red" label="Umidade" :max="100" :value="umidade" unit="%"></level-tile>

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
                <md-input v-on:keyup.enter="setInitialUmidade" v-model="initialUmidade"></md-input>
            </md-field>
            <md-field slot="value">
                <label>Final Value</label>
                <md-input v-on:keyup.enter="setFinalUmidade" v-model="finalUmidade"></md-input>
            </md-field>
        </value-tile>
        <indicator-tile position="a8:a8" :value="umidadeAtuador" color="red" label="Atuador"></indicator-tile>
    </dashboard>
</template>

<script>
    import Vue from 'vue'
    import VueMaterial from 'vue-material'
    import 'vue-material/dist/vue-material.min.css'

    Vue.use(VueMaterial)

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
            setFinalUmidade: function() {
                console.log("> Temperatura Inicial:"+this.finalUmidade);
            },
            setInitialUmidade: function() {
                console.log("> Temperatura Inicial:"+this.initialUmidade);
            },
            setFinalTemp: function() {
                console.log("> Temperatura Inicial:"+this.finalTemp);
            },
            setInitialTemp: function() {
                console.log("> Temperatura Inicial:"+this.initialTemp);
            }
        },

        data(){
            return {
                temperature: 0,
                umidade: 0,
                snr: 0,
                rssi: -100,
                hora: 0, 
                labelsList: [],
                chartData1: {},
                chartData2: {},
                chartData3: {},
                listData: [
                    { label: "Something 1", value: 123 },
                    { label: "Something 2", value: 90 },
                    { label: "Something 3", value: 87 },
                    { label: "Something 4", value: 30 },
                    { label: "Something 5", value: 10 }
                ],
                initialTemp:0,
                finalTemp: 0,
                initialUmidade: 0,
                finalUmidade:0,
                tempAtuador: false,
                umidadeAtuador: false,
            }
        },

        created() {

            var self = this;

            // Temperature
            // setInterval(function(){
            //     self.temperature = Math.random() * 30;
            // }, 5000);

            // Battery
            // setInterval(function(){
            //     self.battery = Math.round(Math.random() * 100);
            // }, 4500);

            // Temperatura
            setInterval(function(){
                // self.rssi = (Math.round(Math.random() * 20) + 100) * -1;
                // self.snr = Math.round(Math.random() * 20);
                self.hora+=1;
                if(self.hora == 24)
                {
                    self.hora = 0;
                    // Temperatura
                    self.chartData1.datasets[0].data = [] ;
                    self.chartData1.labels = [] ; 
                    // Umidade
                    self.chartData2.datasets[0].data = [] ;
                    self.chartData2.labels = [] ; 
                }
                // Temperatura
                self.temperature = Math.random() * 30;
                self.umidade = Math.floor(Math.random() * 100)
                self.chartData1.datasets[0].data.push(self.temperature) ;
                self.chartData1.labels.push(self.hora); 
                // Umidade
                self.chartData2.datasets[0].data.push(self.umidade) ;
                self.chartData2.labels.push(self.hora); 
            }, 1000);

            self.chartData1 = {
                labels: [],
                // labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
                datasets: [
                    {
                        label: 'Temperatura',
                        color: '#2ecc71',
                        // data: [10,15,20,20,10,15,5,7,30,10,12,15]
                        data: []
                    },
                    // {
                    //     label: 'Test2',
                    //     color: '#3498db',
                    //     data: [10,15,5,7,30,10,12,15,10,15,20,20]
                    // }
                ]
            }

            self.chartData2 = {
                labels: [],
                // labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
                datasets: [
                    {
                        label: 'Umidade',
                        color: '#3498db',
                        // data: [10,15,20,20,10,15,5,7,30,10,12,15]
                        data: []
                    },
                    // {
                    //     label: 'Test2',
                    //     color: '#3498db',
                    //     data: [10,15,5,7,30,10,12,15,10,15,20,20]
                    // }
                ]
            }

            self.chartData3 = {
                labels: ['Jan','Feb','Mar'],
                datasets: [
                    {
                        label: 'Test',
                        color: ['#e74c3c', '#3498db', '#2ecc71'],
                        data: [10,15,20]
                    }
                ]
            }
        },
    };

</script>

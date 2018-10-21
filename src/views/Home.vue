<template>
    <dashboard columns="8" rows="8">
        <chart-tile position="b2:g4" heading="Temperatura" color="blue" :data="chartData1" type="bar"></chart-tile>
        <chart-tile position="b5:g7" heading="Umidade" color="red" :data="chartData1" type="bar"></chart-tile>

        <level-tile position="h2:h4" color="blue" label="Temperature" :max="30" :value="temperature" unit="°C"></level-tile>
        <level-tile position="h5:h7" color="red" label="Umidade" :max="30" :value="temperature" unit="%"></level-tile>

        <value-tile position="a2:a3" color="blue" heading="SetPoint">
            <md-field slot="value">
                <label>Initial Value</label>
                <md-input v-model="initial"></md-input>
            </md-field>
            <md-field slot="value">
                <label>Final Value</label>
                <md-input v-model="initial"></md-input>
            </md-field>
        </value-tile>
        <indicator-tile position="a4:a4" :value="true" color="blue" label="Atuador"></indicator-tile>

        <value-tile position="a5:a6" color="red" heading="SetPoint">
            <md-field slot="value">
                <label>Initial Value</label>
                <md-input v-model="initial"></md-input>
            </md-field>
            <md-field slot="value">
                <label>Final Value</label>
                <md-input v-model="initial"></md-input>
            </md-field>
        </value-tile>
        <indicator-tile position="a7:a7" :value="true" color="red" label="Atuador"></indicator-tile>

        <value-tile position="a1:a1" color="yellow">
            <date-time slot="before" format="ddd DD/MM" time-zone="America/Sao_Paulo"></date-time>
            <date-time slot="value" format="HH:mm" time-zone="America/Sao_Paulo"></date-time>
        </value-tile>
        
        <value-tile position="h1:h1" heading="Curitiba" color="yellow">
            <weather slot="value" city="Curitiba"></weather>
        </value-tile>
        
        <value-tile position="b1:g1" color="yellow">
            <span slot="value">Dashboard</span>
        </value-tile>
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

        data(){
            return {
                temperature: 0,
                battery: 100,
                snr: 0,
                rssi: -100,
                chartData1: {},
                chartData2: {},
                chartData3: {},
                listData: [
                    { label: "Something 1", value: 123 },
                    { label: "Something 2", value: 90 },
                    { label: "Something 3", value: 87 },
                    { label: "Something 4", value: 30 },
                    { label: "Something 5", value: 10 }
                ]
            }
        },

        created() {

            var self = this;

            // Temperature
            setInterval(function(){
                self.temperature = Math.random() * 30;
            }, 5000);

            // Battery
            setInterval(function(){
                self.battery = Math.round(Math.random() * 100);
            }, 4500);

            // Snr / Rssi
            setInterval(function(){
                self.rssi = (Math.round(Math.random() * 20) + 100) * -1;
                self.snr = Math.round(Math.random() * 20);
            }, 4000);

            self.chartData1 = {
                labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
                datasets: [
                    {
                        label: 'Test',
                        color: '#2ecc71',
                        data: [10,15,20,20,10,15,5,7,30,10,12,15]
                    },
                    {
                        label: 'Test2',
                        color: '#3498db',
                        data: [10,15,5,7,30,10,12,15,10,15,20,20]
                    }
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

<template>
    <dashboard columns="8" rows="8">
        <!-- <value-tile position="a1:a2" heading="Data/Hora" color="yellow">
            <date-time slot="before" format="ddd DD/MM" time-zone="America/Sao_Paulo"></date-time>
            <date-time slot="value" format="HH:mm" time-zone="America/Sao_Paulo"></date-time>
        </value-tile> -->
        
        <!-- <value-tile position="h1:h2" heading="Curitiba" color="yellow">
            <weather slot="value" city="Curitiba"></weather>
        </value-tile> -->
        
        <value-tile position="a1:h2" color="yellow">
            <span slot="value">Controlador do Aquário</span>
        </value-tile>

        <load-tile-dialog position="a3:b4" color="green" heading="Relê 1 - (AC)" :type="type_load_ac_1" :value="setpoints_load_ac_1" typeLoad="AC" whichLoad="1"></load-tile-dialog>
        <indicator-tile position="a5:b5" :value="status_load_ac_1" color="green" label="Status"></indicator-tile> 

        <load-tile-dialog position="c3:d4" color="green" heading="Relê 2 - (AC)" :type="type_load_ac_2" :value="setpoints_load_ac_2" typeLoad="AC" whichLoad="2"></load-tile-dialog>
        <indicator-tile position="c5:d5" :value="status_load_ac_2" color="green" label="Status"></indicator-tile> 

        <load-tile-dialog position="e3:f4" color="green" heading="Relê 3 - (AC)" :type="type_load_ac_3" :value="setpoints_load_ac_3" typeLoad="AC" whichLoad="3"></load-tile-dialog>
        <indicator-tile position="e5:f5" :value="status_load_ac_3" color="green" label="Status"></indicator-tile> 

        <load-tile-dialog position="g3:h4" color="green" heading="Relê 4 - (AC)" :type="type_load_ac_4" :value="setpoints_load_ac_4" typeLoad="AC" whichLoad="4"></load-tile-dialog>
        <indicator-tile position="g5:h5" :value="status_load_ac_4" color="green" label="Status"></indicator-tile> 

        <load-tile-dialog position="b6:c7" color="blue" heading="Relê 1 - (DC)" :type="type_load_dc_1" :value="setpoints_load_dc_1" typeLoad="DC" whichLoad="1"></load-tile-dialog>
        <indicator-tile position="b8:c8" :value="status_load_dc_1" color="blue" label="Status"></indicator-tile> 
                
        <load-tile-dialog position="d6:e7" color="blue" heading="Relê 2 - (DC)" :type="type_load_dc_2" :value="setpoints_load_dc_2" typeLoad="DC" whichLoad="2"></load-tile-dialog>
        <indicator-tile position="d8:e8" :value="status_load_dc_2" color="blue" label="Status"></indicator-tile>
                
        <load-tile-dialog position="f6:g7" color="blue" heading="Relê 3 - (DC)" :type="type_load_dc_3" :value="setpoints_load_dc_3" typeLoad="DC" whichLoad="3"></load-tile-dialog>
        <indicator-tile position="f8:g8" :value="status_load_dc_3" color="blue" label="Status"></indicator-tile>
    
        <level-tile position="a6:a8" color="red" label="Sensor 1" :max="50" :value="10" unit="°C"></level-tile>
        <level-tile position="h6:h8" color="red" label="Sensor 2" :max="50" :value="30" unit="°C"></level-tile> 
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
import { setInterval } from 'timers';

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
            splitLoadsData: function(arrayData){
                try 
                {
                    arrayData.forEach(element => {
                        if(element.type === 'DC')
                        {
                            this.DCLoadsArray.push(JSON.stringify(element));
                        }
                        else
                        {
                            this.ACLoadsArray.push(JSON.stringify(element));
                        }
                    });
                }
                catch (error)
                {
                    console.log(error);
                }
            },
            fillLoadTiles: function(){
                // console.log("FillLoadTiles!");
                this.ACLoadsArray.forEach(element => {
                    var aux_element = JSON.parse(element);
                    if ( aux_element.number === '1' ) 
                    {
                        if(aux_element.initial !== "" && aux_element.end !== "")
                        {
                            this.setpoints_load_ac_1 = aux_element.initial+" - "+aux_element.end;
                            if(aux_element.parameter === 'time')
                            {
                                this.type_load_ac_1 = "Tempo";
                            }
                            else if(aux_element.parameter === 'value')
                            {
                                this.type_load_ac_1 = "Sensor";
                            }
                        }
                        else
                        {
                            this.setpoints_load_ac_1 = "";
                            this.type_load_ac_1 = "Desativado"; 
                        }
                    }
                    else if( aux_element.number === '2' )
                    {
                        if(aux_element.initial !== "" && aux_element.end !== "")
                        {
                            this.setpoints_load_ac_2 = aux_element.initial+" - "+aux_element.end;
                            if(aux_element.parameter === 'time')
                            {
                                this.type_load_ac_2 = "Tempo";
                            }
                            else if(aux_element.parameter === 'value')
                            {
                                this.type_load_ac_2 = "Sensor";
                            }
                        }
                        else
                        {
                            this.setpoints_load_ac_2 = "";
                            this.type_load_ac_2 = "Desativado"; 
                        }
                    }
                    else if( aux_element.number === '3' )
                    {
                        if(aux_element.initial !== "" && aux_element.end !== "")
                        {
                            this.setpoints_load_ac_3 = aux_element.initial+" - "+aux_element.end;
                            if(aux_element.parameter === 'time')
                            {
                                this.type_load_ac_3 = "Tempo";
                            }
                            else if(aux_element.parameter === 'value')
                            {
                                this.type_load_ac_3 = "Sensor";
                            }
                        }
                        else
                        {
                            this.setpoints_load_ac_3 = ""
                            this.type_load_ac_3 = "Desativado"; 
                        }
                    }
                    else if( aux_element.number === '4' )
                    {
                        if(aux_element.initial !== "" && aux_element.end !== "")
                        {
                            this.setpoints_load_ac_4 = aux_element.initial+" - "+aux_element.end;
                            if(aux_element.parameter === 'time')
                            {
                                this.type_load_ac_4 = "Tempo";
                            }
                            else if(aux_element.parameter === 'value')
                            {
                                this.type_load_ac_4 = "Sensor";
                            }
                        }
                        else
                        {
                            this.setpoints_load_ac_4 = "";
                            this.type_load_ac_4 = "Desativado"; 
                        }
                    }
                });

                this.DCLoadsArray.forEach(element => {
                    var aux_element = JSON.parse(element);
                    if ( aux_element.number === '1' ) 
                    {
                        if(aux_element.initial !== "" && aux_element.end !== "")
                        {
                            this.setpoints_load_dc_1 = aux_element.initial+" - "+aux_element.end;
                            if(aux_element.parameter === 'time')
                            {
                                this.type_load_dc_1 = "Tempo";
                            }
                            else if(aux_element.parameter === 'value')
                            {
                                this.type_load_dc_1 = "Sensor";
                            }
                        }
                        else
                        {
                            this.setpoints_load_dc_1 = "";
                            this.type_load_dc_1 = "Desativado"; 
                        }
                    }
                    else if( aux_element.number === '2' )
                    {
                        if(aux_element.initial !== "" && aux_element.end !== "")
                        {
                            this.setpoints_load_dc_2 = aux_element.initial+" - "+aux_element.end;
                            if(aux_element.parameter === 'time')
                            {
                                this.type_load_dc_2 = "Tempo";
                            }
                            else if(aux_element.parameter === 'value')
                            {
                                this.type_load_dc_2 = "Sensor";
                            }
                        }
                        else
                        {
                            this.setpoints_load_dc_1 = "";
                            this.type_load_dc_2 = "Desativado"; 
                        }
                    }
                    else if( aux_element.number === '3' )
                    {
                        if(aux_element.initial !== "" && aux_element.end !== "")
                        {
                            this.setpoints_load_dc_3 = aux_element.initial+" - "+aux_element.end;
                            if(aux_element.parameter === 'time')
                            {
                                this.type_load_dc_3 = "Tempo";
                            }
                            else if(aux_element.parameter === 'value')
                            {
                                this.type_load_dc_3 = "Sensor";
                            }
                        }
                        else
                        {
                            this.setpoints_load_dc_3 = "";
                            this.type_load_dc_3 = "Desativado"; 
                        }
                    }
                });
            },
            sortData: function(){
                this.ACLoadsArray.sort(function(a, b) {
                    // console.log("Numero: "+JSON.parse(a));
                    return parseInt(a.number) - parseInt(b.number);
                });

                this.DCLoadsArray.sort(function(a, b) {
                    return parseInt(a.number) - parseInt(b.number);
                });
            }
        },

        data(){
            return {
                temperature: 0,
                humidity: 0,
                type_load_dc_1: "",
                setpoints_load_dc_1: "",
                status_load_dc_1: false,
                type_load_dc_2: "",
                setpoints_load_dc_2: "",
                status_load_dc_2: false,
                type_load_dc_3: "",
                setpoints_load_dc_3: "",
                status_load_dc_3: false,
                type_load_ac_1: "",
                setpoints_load_ac_1: "",
                status_load_ac_1: false,
                type_load_ac_2: "",
                setpoints_load_ac_2: "",
                status_load_ac_2: false,
                type_load_ac_3: "",
                setpoints_load_ac_3: "",
                status_load_ac_3: false,
                type_load_ac_4: "",
                setpoints_load_ac_4: "",
                status_load_ac_4: false,
                sensor1: 0,
                sensor2: 0,
                ACLoadsArray: [],
                DCLoadsArray: [],
            }
        },
        mounted()
        {

        },

        created() {
            var self = this;
            this.axios.get("/api/master/get/loads").then(function(response)
            {
                self.splitLoadsData(response.data);
                // self.sortData();
                self.fillLoadTiles();
            });
            setInterval(function()
            { 
                self.axios.get("/api/master/get/loads").then(function(response)
                {
                    self.splitLoadsData(response.data);
                    self.fillLoadTiles();
                });
                // console.log("TESTE DE INTERVALO!");
                // alert("Hello"); 
            }, 1000/2);
        },
    };

</script>

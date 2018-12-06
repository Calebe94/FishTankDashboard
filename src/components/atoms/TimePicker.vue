<template>
    <div class="md-layout-item">
        <md-field>
            <label class=" md-helper-text" for="hour">{{label}}</label>
            <md-select v-model="hour" name="hour" id="hour" @md-selected="select(hour)">
            <!-- <md-select class="md-elevation-24" v-model="hour" name="hour" id="hour" v-bind="getData(hour)"> -->
                <md-option class="md-accent" value="00">00</md-option>
                <md-option class="md-accent" value="01">01</md-option>
                <md-option class="md-accent" value="02">02</md-option>
                <md-option class="md-accent" value="03">03</md-option>
                <md-option class="md-accent" value="04">04</md-option>
                <md-option class="md-accent" value="05">05</md-option>
                <md-option class="md-accent" value="06">06</md-option>
                <md-option class="md-accent" value="07">08</md-option>
            </md-select>
        </md-field>
    </div>    
</template>

<script>
    import Vue from 'vue'
    import VueMaterial from 'vue-material'
    import 'vue-material/dist/vue-material.min.css'

    Vue.use(VueMaterial)

    export default {
        onClick: Function, 
        name: "TimePicker",
        data(){
            return {
                hour: String,    
            } 
        },
        props: {
            label:{
                type: String
            },
            select: String
        },
        methods: {
            select(item) {
                this.$emit('selected', item);
            }
        }
    }
</script>

<style lang="scss" scoped>
    .md-accent {
        // margin: 40px;
        background: #21243f;
        // background: rgba(0, 0, 0, 0.9);
        color: #fff;
        text-shadow: 0 1px 0 rgba(0, 0, 0, 0.4);
    }
</style>


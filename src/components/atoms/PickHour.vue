<template>
    <div class="md-layout-item">
        <md-field>
            <label class=" md-helper-text" for="time">{{label}}</label>
            <md-select v-model="time" name="time" id="time" @md-selected="select(time)">
                <md-option class="md-accent" value="00">00</md-option>
                <md-option class="md-accent" value="01">01</md-option>
                <md-option class="md-accent" value="02">02</md-option>
                <md-option class="md-accent" value="03">03</md-option>
                <md-option class="md-accent" value="04">04</md-option>
                <md-option class="md-accent" value="05">05</md-option>
                <md-option class="md-accent" value="06">06</md-option>
                <md-option class="md-accent" value="07">07</md-option>
                <md-option class="md-accent" value="08">08</md-option>
                <md-option class="md-accent" value="09">09</md-option>
                <md-option class="md-accent" value="10">10</md-option>
                <md-option class="md-accent" value="11">11</md-option>
                <md-option class="md-accent" value="12">12</md-option>
                <md-option class="md-accent" value="13">13</md-option>
                <md-option class="md-accent" value="14">14</md-option>
                <md-option class="md-accent" value="15">15</md-option>
                <md-option class="md-accent" value="16">16</md-option>
                <md-option class="md-accent" value="17">17</md-option>
                <md-option class="md-accent" value="18">18</md-option>
                <md-option class="md-accent" value="19">19</md-option>
                <md-option class="md-accent" value="20">20</md-option>
                <md-option class="md-accent" value="21">21</md-option>
                <md-option class="md-accent" value="22">22</md-option>
                <md-option class="md-accent" value="23">23</md-option>
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
        name: "pick-hour",
        data(){
            return {
                time: String,
            } 
        },
        props: {
            label:{
                type: String
            },
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


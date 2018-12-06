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
                <md-option class="md-accent" value="24">24</md-option>
                <md-option class="md-accent" value="25">25</md-option>
                <md-option class="md-accent" value="26">26</md-option>
                <md-option class="md-accent" value="27">27</md-option>
                <md-option class="md-accent" value="28">28</md-option>
                <md-option class="md-accent" value="29">29</md-option>

                <md-option class="md-accent" value="30">30</md-option>
                <md-option class="md-accent" value="31">31</md-option>
                <md-option class="md-accent" value="32">32</md-option>
                <md-option class="md-accent" value="33">33</md-option>
                <md-option class="md-accent" value="34">34</md-option>
                <md-option class="md-accent" value="35">35</md-option>
                <md-option class="md-accent" value="36">36</md-option>
                <md-option class="md-accent" value="37">37</md-option>
                <md-option class="md-accent" value="38">38</md-option>
                <md-option class="md-accent" value="39">39</md-option>

                <md-option class="md-accent" value="40">40</md-option>
                <md-option class="md-accent" value="41">41</md-option>
                <md-option class="md-accent" value="42">42</md-option>
                <md-option class="md-accent" value="43">43</md-option>
                <md-option class="md-accent" value="44">44</md-option>
                <md-option class="md-accent" value="45">45</md-option>
                <md-option class="md-accent" value="46">46</md-option>
                <md-option class="md-accent" value="47">47</md-option>
                <md-option class="md-accent" value="48">48</md-option>
                <md-option class="md-accent" value="49">49</md-option>
                
                <md-option class="md-accent" value="50">50</md-option>
                <md-option class="md-accent" value="51">51</md-option>
                <md-option class="md-accent" value="52">52</md-option>
                <md-option class="md-accent" value="53">53</md-option>
                <md-option class="md-accent" value="54">54</md-option>
                <md-option class="md-accent" value="55">55</md-option>
                <md-option class="md-accent" value="56">56</md-option>
                <md-option class="md-accent" value="57">57</md-option>
                <md-option class="md-accent" value="58">58</md-option>
                <md-option class="md-accent" value="59">59</md-option>
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
        name: "pick-minute",
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


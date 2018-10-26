<script>
    import { Line, mixins } from 'vue-chartjs'
    import deepAssign from 'deep-assign'
    
    const { reactiveProp } = mixins

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,

        layout: {
            padding: {
                top: -5,
                right: 5,
                bottom: 5,
                left: 5
            }
        },
        animation: {
            duration: 0
        },
        legend: {
            labels: {
                boxWidth: 12,
                fontColor: 'white'
            }
        },
        scales: {
            xAxes: [{
                scaleLabel: {
                    fontColor: 'white'
                },
                gridLines: {
                    /*display: true,
                    zeroLineWidth: 1,
                    zeroLineColor: "rgba(255,255,255,.25)" ,*/
                    color: "rgba(255,255,255,.1)"
                },
                ticks: { fontColor: "white" }
            }],
            yAxes: [{
                scaleLabel: {
                    fontColor: 'white'
                },
                gridLines: {
                    /*display: true,
                    zeroLineWidth: 1,
                    zeroLineColor: "rgba(255,255,255,.25)" ,*/
                    color: "rgba(255,255,255,.1)"
                },
                ticks: { fontColor: "white" }
            }]
        },
        elements: {
            line: {
                borderWidth: 2,
                backgroundColor: 'transparent'
            },
            point: {
                hitRadius: 0
            }
        },
        tooltips: {
            enabled: false
        },
        events: []

    }

    export default {

        extends: Line,
        
        mixins: [reactiveProp],

        props: ['data', 'options'],

        computed: {
            chartData() {

                var newData = deepAssign({}, this.data);

                if (newData.datasets){
                    newData.datasets.forEach(function(ds){
                        ds.borderColor = ds.color;
                        ds.backgroundColor = ds.color;
                        ds.pointBackgroundColor = ds.color;
                        ds.fill = false;
                    });
                }

                return newData;

            }
        },

        created() {

            var self = this;
            var opts = deepAssign({}, chartOptions, this.options || {});
            console.log("> CHART DATA: (CREATED)");
            console.log(this.data);
            self.drawChart = function(){
                self.renderChart(self.chartData, opts);
            }

            self.handleResize = function(){
                setTimeout(function(){
                    self.drawChart();
                }, 1);
            }
        },

        mounted () {
            this.drawChart();
            console.log("> CHART DATA: (MOUNTED)");
            console.log(this.data);
            window.addEventListener('resize', this.handleResize);
        },

        watch: {
            values(){
                console.log("> CHART DATA: (VALUES)");
                console.log(this.data);
                this.drawChart();
            },
                data: function () {
                    console.log(this.data);
                    self.drawChart();
                    this._chart.destroy()
                    this.renderChart(this.data, this.options)
                }
        },
        data(){
            console.log("> CHART DATA: (DATA)");
            console.log(this.data);
        },

        beforeDestroy: function () {
            window.removeEventListener('resize', this.handleResize);
        }

    };
</script>

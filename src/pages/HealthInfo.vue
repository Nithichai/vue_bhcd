<template>
  <div>
    <div class="row">
      <div class="col-12">
        <card type="chart">
          <template slot="header">
            <div class="row">
              <div class="col-sm-6" :class="isRTL ? 'text-right' : ''">
                <h5 class="card-category">{{$t('dashboard.totalShipments')}}</h5>
                <h2 class="card-title">{{$t('dashboard.performance')}}</h2>
              </div>
              <div class="col-sm-6">
                <div class="btn-group btn-group-toggle"
                     :class="isRTL ? 'float-left' : 'float-right'"
                     data-toggle="buttons">
                  <label v-for="(option, index) in bigLineChartCategories"
                         :key="option"
                         class="btn btn-sm btn-primary btn-simple"
                         :class="{active: bigLineChart.activeIndex === index}"
                         :id="index">
                    <input type="radio"
                           @click="initBigChart(index)"
                           name="options" autocomplete="off"
                           :checked="bigLineChart.activeIndex === index">
                    {{option}}
                  </label>
                </div>
              </div>
            </div>
          </template>
          <div class="chart-area">
            <line-chart style="height: 100%"
                        ref="bigChart"
                        chart-id="big-line-chart"
                        :chart-data="bigLineChart.chartData"
                        :gradient-colors="bigLineChart.gradientColors"
                        :gradient-stops="bigLineChart.gradientStops"
                        :extra-options="bigLineChart.extraOptions">
            </line-chart>
          </div>
          <div class="row">
            <div class="col-md-12 pl-md-3 pr-md-1">
              <a href="/#/health-info" class="btn">ย้อนกลับ</a>
            </div>
          </div>
        </card>
      </div>
    </div>
    </div>
</template>
<script>
  import LineChart from '@/components/Charts/LineChart';
  import BarChart from '@/components/Charts/BarChart';
  import * as chartConfigs from '@/components/Charts/config';
  import config from '@/config';

  export default {
    components: {
      LineChart,
      BarChart,
    },
    data() {
      return {
        bigLineChart: {
          allData:[{}],
          activeIndex: 0,
          chartData: null,
          extraOptions: chartConfigs.purpleChartOptions,
          gradientColors: config.colors.primaryGradient,
          gradientStops: [1, 0.4, 0],
          categories: []
        }
      }
    },
    computed: {
      enableRTL() {
        return this.$route.query.enableRTL;
      },
      isRTL() {
        return this.$rtl.isRTL;
      },
      bigLineChartCategories() {
        return this.$t('dashboard.chartCategories');
      }
    },
    methods: {
      initBigChart(index) {
        let chartData = {
          datasets: [{
            fill: true,
            borderColor: config.colors.primary,
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            pointBackgroundColor: config.colors.primary,
            pointBorderColor: 'rgba(255,255,255,0)',
            pointHoverBackgroundColor: config.colors.primary,
            pointBorderWidth: 20,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 15,
            pointRadius: 4,
            data: this.bigLineChart.allData[index].value
          }],
          labels: this.bigLineChart.allData[index].label,
        }
        this.$refs.bigChart.updateGradients(chartData);
        this.bigLineChart.chartData = chartData;
        this.bigLineChart.activeIndex = index;
      },
      getData(index) {
        const axios = require('axios');
        axios({
          method: 'post',
          url: 'https://bhcd-api.herokuapp.com/health-info/check/esp',
          headers: {
            'Content-Type' : 'application/json'
          },
          data: {
              "data" : {
                "esp" : this.$route.params.esp,
              }
          }
        }).then((response) => {
          var data = response.data.data
          var label = []
          var hbp = []
          var lbp = []
          var hr = []
          data.forEach(function(element) {
            var date = new Date(element['created_at'])
            date.setTime( date.getTime() - date.getTimezoneOffset()*60*1000 )
            var nowDate = new Date(Date.now())
            var ytdDate = new Date(nowDate.getTime() - 24*60*60*1000)
            if (ytdDate < date) {
              var thisDate = date.getDate();
              var hour = date.getHours()
              var minute = date.getMinutes()
              var second = date.getSeconds()
              var formatDateTime = ((hour >= 10) ? hour.toString() : "0" + hour.toString())
                + ":" + ((minute >= 10) ? minute.toString() : "0" + minute.toString())
                + ":" + ((second >= 10) ? second.toString() : "0" + second.toString())
              label.push(formatDateTime)
              hbp.push(element['hbp'])
              lbp.push(element['lbp'])
              hr.push(element['hr'])
            }
          })
          label = label.reverse()
          hbp = hbp.reverse()
          lbp = lbp.reverse()
          hr = hr.reverse()
          this.bigLineChart.allData = [
            {
              "label" : label,
              "value" : hbp
            },
            {
              "label" : label,
              "value" : lbp
            },
            {
              "label" : label,
              "value" : hr
            },
          ]
          this.initBigChart(index)
        }).catch((error) => {
          console.log(error.response)
        })
      }
    },
    mounted() {
      this.i18n = this.$i18n;
      if (this.enableRTL) {
        this.i18n.locale = 'ar';
        this.$rtl.enableRTL();
      }
      this.getData(0)
    },
    beforeDestroy() {
      if (this.$rtl.isRTL) {
        this.i18n.locale = 'en';
        this.$rtl.disableRTL();
      }
    }
  };
</script>
<style>
</style>

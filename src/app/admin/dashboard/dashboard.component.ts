import { Component, OnInit } from '@angular/core';
import { DashBoardService } from 'service/dashboard.service';
import { ApiResponse } from 'model/apiResponse';
import { TokenHelper } from 'authorization/token.helper';
import { UserModel } from 'model/user';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    user: UserModel;
    isLoading = true;
    info:any;
    latest:any;
    hasLatest = false;
  graph_data = {
    'chart' : {
        'label' : ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        'value' : [120, 132, 101, 134, 90, 230, 210, 220, 230, 260, 300, 450]
    }
}

  chartOption = {
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            label: {
                backgroundColor: '#6a7985'
            }
        }
    },

    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: [
        {
            type: 'category',
            boundaryGap: false,
            data: this.graph_data.chart.label
        }
    ],
    yAxis: [
        {
            type: 'value'
        }
    ],
    series: [
        {
            name: 'Marketing',
            type: 'line',
            stack: 'overview',
            areaStyle: {},
            smooth: true,
            data: this.graph_data.chart.value
        },
        {
            name: 'IT',
            type: 'line',
            stack: 'overview',
            areaStyle: {},
            smooth: true,
            data: [220, 182, 191, 234, 290, 330, 310, 330, 390, 340, 330, 400]
        },
        {
            name: 'Hr',
            type: 'line',
            stack: 'overview',
            areaStyle: {},
            smooth: true,
            data: [150, 232, 201, 154, 190, 330, 410, 410, 440, 470, 500, 300]
        },
        {
            name: 'Sale',
            type: 'line',
            stack: 'overview',
            areaStyle: {},
            smooth: true,
            data: [320, 332, 301, 334, 390, 330, 320, 330, 330, 340, 200, 230]
        }
    ]
};

concurrentOption = {
  tooltip: {
      trigger: 'item',
      formatter: "{a} <br/>{b}: {c} ({d}%)"
  },
  series: [
      {
          name:'访问来源',
          type:'pie',
          radius: ['50%', '70%'],
          avoidLabelOverlap: false,
          label: {
              normal: {
                  show: false,
                  position: 'center'
              },
              emphasis: {
                  show: true,
                  textStyle: {
                      fontSize: '30',
                      fontWeight: 'bold'
                  }
              }
          },
          labelLine: {
              normal: {
                  show: false
              }
          },
          data:[
              {value:335, name:'直接访问'},
              {value:310, name:'邮件营销'},
              {value:234, name:'联盟广告'},
              {value:135, name:'视频广告'},
              {value:1548, name:'搜索引擎'}
          ]
      }
  ]
};

lastMinLogoutOption = {
  tooltip: {
      trigger: 'item',
      formatter: "{a} <br/>{b}: {c} ({d}%)"
  },
  series: [
      {
          name:'访问来源',
          type:'pie',
          radius: ['50%', '70%'],
          avoidLabelOverlap: false,
          label: {
              normal: {
                  show: false,
                  position: 'center'
              },
              emphasis: {
                  show: true,
                  textStyle: {
                      fontSize: '30',
                      fontWeight: 'bold'
                  }
              }
          },
          labelLine: {
              normal: {
                  show: false
              }
          },
          data:[
              {value:335, name:'直接访问'},
              {value:310, name:'邮件营销'},
              {value:234, name:'联盟广告'},
              {value:135, name:'视频广告'},
              {value:1548, name:'搜索引擎'}
          ]
      }
  ]
};


  constructor(
    private dashBoardService: DashBoardService,
    private tHelper: TokenHelper,
  ) { }

  ngOnInit() {
      this.user = this.tHelper.getUser() as UserModel;
      this.get(this.user.id);
  }

  get(id:string){
      this.dashBoardService.get(id).subscribe(res =>{
          let result: ApiResponse;
          result = res as ApiResponse;
          console.log(result)
          this.info = result.data.info;
          if(result.data.latest.Records){
            this.latest = this.barChart(result.data.latest.Records,result.data.latest.test_name);
            if(this.latest.length!=0){
                this.hasLatest = true;
            }
            console.log(this.latest)
          }
          this.isLoading = false;
      })
  }

  barChart(data:any,title:string){
      
      let result = {
          title: "Test: " + title,
          name: [],
          value: [],
      };
    for(let i of data){
        result.name.push(i.lap);
        result.value.push(i.duration/1000);
    }
    return result;
  }

  concurrent(){
    return {
      tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b}: {c} ({d}%)"
      },
      series: [
          {
              name:'访问来源',
              type:'pie',
              radius: ['50%', '70%'],
              avoidLabelOverlap: false,
              label: {
                  normal: {
                      show: false,
                      position: 'center'
                  },
                  emphasis: {
                      show: true,
                      textStyle: {
                          fontSize: '30',
                          fontWeight: 'bold'
                      }
                  }
              },
              labelLine: {
                  normal: {
                      show: false
                  }
              },
              data:[
                  {value:335, name:'直接访问'},
                  {value:310, name:'邮件营销'},
                  {value:234, name:'联盟广告'},
                  {value:135, name:'视频广告'},
                  {value:1548, name:'搜索引擎'}
              ]
          }
      ]
    };
  }

}

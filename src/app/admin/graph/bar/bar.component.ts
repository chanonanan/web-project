import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.css']
})
export class BarComponent implements OnInit, OnChanges {

  @Input() data: any;
  chartOption:any;
  constructor() { }

  ngOnInit() {
    this.chartOption = {
        color: ['#3398DB'],
        tooltip : {
            trigger: 'axis',
            axisPointer : {
                type : 'shadow'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis : [
            {
                type : 'category',
                data : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                axisTick: {
                    alignWithLabel: true
                }
            }
        ],
        yAxis : [
            {
                type : 'value'
            }
        ],
        series : [
            {
                name:'直接访问',
                type:'bar',
                barWidth: '60%',
                data:[10, 52, 200, 334, 390, 330, 220]
            }
        ]
    };
  }

  ngOnChanges(changes: SimpleChanges) {
    // console.log(changes);
    
  }

}

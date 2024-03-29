import React, { Component } from 'react';
import './App.css';

export default class Calendar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDay: '',
            currentMonth: '',
            currentYear: '',
            weekList: [
                {name: '一', className: ''},
                {name: '二', className: ''},
                {name: '三', className: ''},
                {name: '四', className: ''},
                {name: '五', className: ''},
                {name: '六', className: ''},
                {name: '日', className: ''}
            ],
            dayList: [],
        }

        this.initCalendar = this.initCalendar.bind(this);
        this.renderHeader = this.renderHeader.bind(this);
        this.renderBody = this.renderBody.bind(this);
        this.preMonth = this.preMonth.bind(this);
        this.nextMonth = this.nextMonth.bind(this);
        this.preYear = this.preYear.bind(this);
        this.nextYear = this.nextYear.bind(this);
    }

    componentDidMount() {
        this.initCalendar()
    }

    // 获取当前date的当月第一天的字符串形式
    getMonthFirstDate(date) {
        let nowYear = date.getFullYear(); // 获取年份
        let nowMonth = date.getMonth()+1; // 获取月份
        return  `${nowYear}-${nowMonth}-01`
    }
 // 获取当前date的上一年第一天的字符串形式
    getYearFirstDate(date) {
        let nowYear = date.getFullYear()+1; // 获取年份
        let nowMonth = date.getMonth(); // 获取月份
        return  `${nowYear}-${nowMonth}`
    }
    // 获取当前date的字符串形式
    getDateString(date) {
        let nowYear = date.getFullYear(); // 获取年份
        let nowMonth = date.getMonth()+1; // 获取月份
        let day = date.getDate();
        day = day < 10 ? '0' + day : day;
        return  `${nowYear}-${nowMonth}-${day}`
    }

    // 上个月
    preMonth() {
        let date = new Date(`${this.state.currentYear}-${this.state.currentMonth}-${this.state.currentDay}`)
        let preMonthFirstDate = new Date(this.getMonthFirstDate(new Date(date.setDate(0)))); // 0 是上个月最后一天
        this.initCalendar(preMonthFirstDate)
    }

    // 下个月
    nextMonth() {
        let date = new Date(`${this.state.currentYear}-${this.state.currentMonth}-${this.state.currentDay}`)
        let nextMonthFirstDate = new Date(this.getMonthFirstDate(new Date(date.setDate(33))));
        this.initCalendar(nextMonthFirstDate)
    }
   // 上一年
    preYear() {
      console.log('preYear',new Date(`${this.state.currentYear}-${this.state.currentMonth}-${this.state.currentDay}`))
        let date = new Date(`${this.state.currentYear}-${this.state.currentMonth}-${this.state.currentDay}`)
        let preYear = new Date(this.getYearFirstDate(new Date(date.setFullYear(1)))); // 0 是上个月最后一天
        this.initCalendar(preYear)
    }

    // 下一年
    nextYear() {
        // let date = new Date(`${this.state.currentYear}-${this.state.currentMonth}-${this.state.currentDay}`)
        // let nextMonthFirstDate = new Date(this.getYearFirstDate(new Date(date.setDate(33))));
        // this.initCalendar(nextMonthFirstDate)
    }

    // 初始化日历
    initCalendar(currentDate) {
        let nowDate = currentDate ? currentDate : new Date();
        let nowMonthFirstDate = this.getMonthFirstDate(nowDate) // 获取当月1号日期
        let nowWeek = new Date(nowMonthFirstDate).getDay() ? new Date(nowMonthFirstDate).getDay() : 7; // 获取星期
        let newDateList = []; // 创建日期数组
        let startDay =  2 - nowWeek; // 开始日期的下标  以为 setDate(0)是上个月最后一天  所以是2-nowWeek
        let showDayLength = nowWeek < 6 ? 35 : 42;  // 如果5行能显示下一个月 就只显示5行
        // 循环处理 获取日历上应该显示的日期
        for (let i = startDay; i < startDay + showDayLength; i++) {
            let date = new Date(new Date(nowMonthFirstDate).setDate(i)); // 获取时间对象
            let day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate() // 小于9的数字前面加0
            let dayObject = {
                date: this.getDateString(date),
                day,
                className: '',
            }
            // new Date(str).toDateString() === new Date().toDateString()
            if (date.toDateString() === new Date().toDateString()) {
                dayObject.className = 'today'
            }
            newDateList.push(dayObject)
        }

        this.setState((pre) => {
            return {
                dayList: newDateList,
                currentDay: nowDate.getDate(),
                currentMonth: nowDate.getMonth() + 1 >= 10 ? nowDate.getMonth() + 1 : '0' + (nowDate.getMonth() + 1),
                currentYear: nowDate.getFullYear(),
            }
        })

    }
    changeDate(dayObject,index){
        console.log('dayObject',dayObject)
    }
    renderHeader() {
        return(
            <div className = 'calendar-header'>
                <div className = 'calendar-header-left'>
                    <a  onClick = {this.preYear}>上一年</a>
                </div>
                <div className = 'calendar-header-left'>
                    <a  onClick = {this.preMonth}>上个月</a>
                </div>
                <div className = ''>
                    {this.state.currentYear}年{this.state.currentMonth}月
                </div>
                <div className = 'calendar-header-right'>
                    <a  onClick = {this.nextMonth}>下个月</a>
                </div>
                <div className = 'calendar-header-left'>
                    <a  onClick = {this.nextYear}>下一年</a>
                </div> 
            </div>
        )
    }

    renderBody() {
        return(
            <div className = 'calendar-body'>
                <div className = 'week-container'>
                    {this.state.weekList.map(week => {
                        return <div key = {week.name} className = {`week ${week.className}`}>{week.name}</div>
                    })}
                </div>
                <div className = 'day-container'>
                    {this.state.dayList.map( (dayObject, index) => {
                        return <div key = {index} className = {`day ${dayObject.className}`} onClick={()=>{this.changeDate(dayObject,index)}}>{dayObject.day}</div>
                    })}
                </div>
            </div>
        )
    }

    render() {
        return(
            <div className = 'calendar'>
                {this.renderHeader()}
                {this.renderBody()}
            </div>
        )
    }
}
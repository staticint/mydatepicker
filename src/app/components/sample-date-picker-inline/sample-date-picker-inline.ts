import {Component, OnInit} from '@angular/core';
import {MyDatePicker} from '../my-date-picker/index';

declare var require:any;
const template: string = require('./sample-date-picker-inline.html');

@Component({
    selector: 'sample-date-picker-inline',
    directives: [MyDatePicker],
    template
})

export class SampleDatePickerInline implements OnInit {

    private myDatePickerOptions = {
        todayBtnTxt: 'Today',
        dateFormat: 'yyyy-mm-dd',
        firstDayOfWeek: 'mo',
        sunHighlight: true,
        height: '34px',
        width: '260px',
        inline: true,
        disableUntil: {year: 0, month: 0, day: 0}
    };
    selectedDate: string = '';

    selectedText: string = '';
    border: string = 'none';
    locale:string = 'en';

    locales:Array<string> = new Array('en', 'fr', 'ja', 'fi');
    
    constructor() {
        let date = new Date();
        this.selectedDate = date.getFullYear() + '-' + ((date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)) + '-' + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());

        // Disable dates from 5th backward
        date.setDate(date.getDate() - 5);
        this.myDatePickerOptions.disableUntil = {year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate()};
    }

    ngOnInit() {
        console.log('onInit(): SampleDatePickerInline');
    }

    disablePreviousDay() {
        // Change options dynamically - set disabledUntil to previous date and keep other options
        let date = new Date(this.myDatePickerOptions.disableUntil.year, this.myDatePickerOptions.disableUntil.month - 1, this.myDatePickerOptions.disableUntil.day, 0, 0, 0, 0);
        date.setDate(date.getDate() - 1);

        this.myDatePickerOptions = {
            todayBtnTxt: 'Today',
            dateFormat: 'yyyy-mm-dd',
            firstDayOfWeek: 'mo',
            sunHighlight: true,
            height: '34px',
            width: '260px',
            inline: true,
            disableUntil: {year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate()}
        };
    }

    onChangeLocale(locale:string) {
        this.locale = locale;
    }

    onDateChanged(event:any) {
        console.log('onDateChanged(): ', event.date, ' - formatted: ', event.formatted, ' - epoc timestamp: ', event.epoc);
        if(event.formatted !== '') {
            this.selectedText = 'Formatted: ' + event.formatted + ' - epoc timestamp: ' + event.epoc;
            this.border = '1px solid #CCC';
        }
        else {
            this.selectedText = '';
            this.border = 'none';
        }
    }
}
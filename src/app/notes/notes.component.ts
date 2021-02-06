import { Component, OnInit } from '@angular/core';
import {formatDate } from '@angular/common';

export interface Notes {
    id: any,
    title: string;
    created: any;
    text: any;
    last_updated: any;
}
@Component({
    selector: 'app-notes',
    templateUrl: './notes.component.html',
    styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
    today= new Date();
    error: any;
    iseditable : boolean = false;
    isedit :boolean = false;
    icn : any = 'add';
    showAddNoteForm: boolean = false;
    showSummary : boolean = false;
    latest : any;
    ndata: {
        title: ''
        text: ''
        id: '',
        created:''
    }

    note: Notes[] = [
        {
            id: 1,
            title: 'A note to remember',
            created: formatDate(this.today, 'dd/MM/yyyy hh:mm:ss', 'en-US', '+0530'),
            text: 'text 1',
            last_updated: formatDate(this.today, 'dd/MM/yyyy hh:mm:ss', 'en-US', '+0530'),
        },
        {
            id: 2,
            title: 'My new note',
            created: formatDate(this.today, 'dd/MM/yyyy hh:mm:ss', 'en-US', '+0530'),
            text: 'Text 2',
            last_updated: formatDate(this.today, 'dd/MM/yyyy hh:mm:ss', 'en-US', '+0530'),
        },
        {
            id: 3,
            title: 'Holiday network performance',
            created: formatDate(this.today, 'dd/MM/yyyy hh:mm:ss', 'en-US', '+0530'),
            text: 'Text 3',
            last_updated: formatDate(this.today, 'dd/MM/yyyy hh:mm:ss', 'en-US', '+0530'),
        }
    ];
    
    constructor() {
    }

    ngOnInit(): void {
        this.getNotes();
        this.note.sort((a,b) => a.title.localeCompare(b.title));
        this.getLastUpdated();
    }
    // sorttable
    sortTable(){
        this.note.reverse();
    }
    // get last updated data
    getLastUpdated(){
        this.latest = this.note.sort((a, b) => new Date(b.last_updated).getTime() - new Date(a.last_updated).getTime());
        return this.latest[0];
    }

    // save form click
    saveData(){
        if(this.ndata.title == ''){
            this.error = 'Please add your note title';
            return false;
        }
        if(this.ndata.text == ''){
            this.error = 'Text is mandatory';
            return false;
        }

        if(!this.isedit){
            let fdata = {
                id: this.note.length+1,
                title: this.ndata.title,
                text: this.ndata.text,
                last_updated: formatDate(new Date(), 'dd/MM/yyyy hh:mm:ss', 'en-IN', '+0530'),
                created: formatDate(new Date(), 'dd/MM/yyyy hh:mm:ss', 'en-IN', '+0530'),
            }
            if(fdata){
                this.note.push(fdata);
                this.note.sort((a,b) => a.title.localeCompare(b.title));
                this.setNotes(this.note);
                this.iseditable = false;
                this.ndata = {
                    text : '',
                    title: '',
                    id: '',
                    created:''
                };
                this.error = '';
            }
            this.showAddNoteForm = false;
        }else{
            let fdata1 = {
                id: this.ndata.id,
                title: this.ndata.title,
                text: this.ndata.text,
                last_updated: formatDate(new Date(), 'dd/MM/yyyy hh:mm:ss', 'en-IN', '+0530'),
                created: this.ndata.created,
            }
            // Id to look up for.
            var id = this.ndata.id
            var index = this.note.findIndex(item => item.id === id)

            // Replace the item by index.
            this.note.splice(index, 1, fdata1)

            this.setNotes(this.note);
            this.iseditable = false;
            this.ndata = {
                text : '',
                title: '',
                id:'',
                created:''
            };
            this.error = '';
            this.showAddNoteForm = false;
        }
    }

    // setnote
    setNotes(data){
        localStorage.removeItem('nData');
        localStorage.setItem('nData', JSON.stringify(data))
    }
    // getnote
    getNotes(){
        let d = localStorage.getItem('nData');
        if(d){
            this.note = JSON.parse(d);
            return this.note;
        }else{
            return this.note;
        }
    }

    // FORM
    showForm(){
        this.ndata = {
            text : '',
            title: '',
            id:'',
            created:''
        };
        this.isedit = false;
        this.iseditable = false;
        this.error = '';
        this.showAddNoteForm = this.showAddNoteForm ? false : true;
    }
    editForm(data, i){
        this.showAddNoteForm = true;
        this.iseditable = true;
        this.ndata = data;
        this.isedit = true;
    }
    // SUMMARY
    showSummaryPopup(){
        this.showAddNoteForm = false;
        this.showSummary = true;
        this.getLastUpdated();
    }
    hideSummaryPopup(){
        this.showSummary = false;
    }
    
}
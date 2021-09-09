import { LightningElement, track, api} from 'lwc';
import fetchAccount from '@salesforce/apex/AccountRelatedObj.fetchAccount';
import fetchContact from '@salesforce/apex/AccountRelatedObj.getContacts';
import fetchOpportunity from '@salesforce/apex/AccountRelatedObj.fetchOpportunity';
import countContact from '@salesforce/apex/AccountRelatedObj.countContact';
import countOpportunity from '@salesforce/apex/AccountRelatedObj.countOpportunity';
import countCases from '@salesforce/apex/AccountRelatedObj.countCases';
import countClosedWonOpp from '@salesforce/apex/AccountRelatedObj.countClosedWonOpp';
import countClosedLostOpp from '@salesforce/apex/AccountRelatedObj.countClosedLostOpp';
import getAmountClosedWonOpp from '@salesforce/apex/AccountRelatedObj.getAmountClosedWonOpp';
import fetchCase from '@salesforce/apex/AccountRelatedObj.fetchCase';
import ID_FIELD from '@salesforce/schema/Account.Id';
import Financial_Year from '@salesforce/schema/Account.Financial_Year__c';
import Full_Year_Target_Revenue from '@salesforce/schema/Account.Full_Year_Target_Revenue__c';
import Campaign_Budget from '@salesforce/schema/Account.Campaign_Budget__c';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { updateRecord } from 'lightning/uiRecordApi';
import { getRecord } from 'lightning/uiRecordApi';

export default class accountSummary extends LightningElement {

    @track acc;
    strAccId = '001p000000tLd8gAAC';
    @track con;
    message;
    @track msg;
    @track cntopp;
    @track cntcs;
    @track cnt;
    @track opp;
    @track cs;
    @track closedwonofopp;
    @track closedlostopp;
    @track amountClosedWonOpp;
    //@api objectApiName;
    //fieldList= [Financial_Year, Full_Year_Target_Revenue, Campaign_Budget];
    updateAccount(){
        const fields = {};
        fields[ID_FIELD.fieldApiName] = this.strAccId;
        fields[Financial_Year.fieldApiName] = this.template.querySelector("[data-field='Financial_Year__c']").value;
        fields[Full_Year_Target_Revenue.fieldApiName] = this.template.querySelector("[data-field='Full_Year_Target_Revenue__c']").value;
        fields[Campaign_Budget.fieldApiName] = this.template.querySelector("[data-field='Campaign_Budget__c']").value;

        const recordInput = { fields };
        updateRecord(recordInput)
        .then(() => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Account Updated',
                    variant: 'success'
                })
            );
        })
        .catch(error => {
            console.log(error);
        });
    }
    connectedCallback(){
        fetchAccount()
        .then(result => {
            this.acc = result;
            console.log(JSON.stringify(result));
            console.log("result",this.acc);
        })

    }

    relatedDetailsFetch(event){

        //fetchContact
        this.message = event.target.value;
        console.log('Contact Id-->'+this.message);
        fetchContact({accountId : this.message})
        .then(result => {
              this.con = result;
              console.log(JSON.stringify(result));
              console.log("result1",this.con);
        })
        .catch(error =>{
            this.error = error;
        })

        //countContact
        this.msg = event.target.value;
        console.log('Contact Id-->'+this.msg);
        countContact({accountId : this.msg})
        .then(result => {
            this.cnt = result;
            console.log(JSON.stringify(result));
            console.log("result2",this.cnt);
        })
        .catch(error =>{
            this.error = error;
        })

        //countOpportunity
        this.msg = event.target.value;
        console.log('Oppoertunity Id-->'+this.msg);
        countOpportunity({accountId : this.msg})
        .then(result => {
            this.cntopp = result;
            console.log(JSON.stringify(result));
            console.log("result2",this.cntopp);
        })
        .catch(error =>{
            this.error = error;
        })

        //fetchOpportunity
        this.msg = event.target.value;
        console.log('Oppoertunity Id-->'+this.msg);
        fetchOpportunity({accountId : this.msg})
        .then(result => {
            this.opp = result;
            console.log(JSON.stringify(result));
            console.log("result2",this.opp);
        })
        .catch(error =>{
            this.error = error;
        })

        //countClosedWonOpp
        this.msg1 = event.target.value;
        console.log('Opportunity Id-->'+this.msg1);
        countClosedWonOpp({accountId : this.msg1})
        .then(result => {
            this.closedwonofopp = result;
            console.log(JSON.stringify(result));
            console.log("result3",this.closedwonofopp);
        })
        .catch(error =>{
            this.error = error;
        })
        
        //countClosedLostOpp
        this.msg2 = event.target.value;
        console.log('Opportunity Id-->'+this.msg2);
        countClosedLostOpp({accountId : this.msg2})
        .then(result => {
            this.closedlostopp = result;
            console.log(JSON.stringify(result));
            console.log("result4",this.closedlostopp);
        })
        .catch(error =>{
        this.error = error;
        })

        //getAmountClosedWonOpp
        this.msg = event.target.value;
        console.log('Opportunity Id-->'+this.msg);
        getAmountClosedWonOpp({accountId : this.msg})
        .then(result => {
            this.amountClosedWonOpp = result;
            console.log(JSON.stringify(result));
            console.log("result",this.amountClosedWonOpp);
        })
        .catch(error =>{
        this.error = error;        
        })

        //countCases
        this.msg = event.target.value;
        console.log('Case Id-->'+this.msg);
        countCases({accountId : this.msg})
        .then(result => {
            this.cntcs = result;
            console.log(JSON.stringify(result));
            console.log("result2",this.cntcs);
        })
        .catch(error =>{
            this.error = error;
        })

        //fetchCases
        this.msg = event.target.value;
        console.log('Case Id-->'+this.msg);
        fetchCase({accountId : this.msg})
        .then(result => {
            this.cs = result;
            console.log(JSON.stringify(result));
            console.log("result2",this.cs);
        })
        .catch(error =>{
            this.error = error;
        })
    }
}
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Person } from '../Models/person';
import { Transaction } from '../Models/transaction';
import { MessageService } from '../Services/message.service';
import { PersonService } from '../Services/person.service';
import { TransactionService } from '../Services/transaction.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {


  people: Person[] = [];
  transactions: Transaction[] = [];
  type = 1;
  table1 = false;
  table2 = false;
  openingDebt!: number;
  closingDebt!: number;
  residentData: Data[] = [];
  houseOpeningBalance: number = 0;
  houseAllIncome: number = 0;
  houseAllExpanse: number = 0;
  houseClosingBalance: number = 0;

  dateForm: FormGroup = this.formBuilder.group({
    person: [1, Validators.required],
    datetime: ['', [Validators.required, this.dateValidator.bind(this)]],
    datetime2: ['', [Validators.required, this.dateValidator2.bind(this)]]
  });

  constructor(private personService: PersonService,
              private transactionService: TransactionService,
              private messageService: MessageService,
              private formBuilder: FormBuilder) { 
    this.messageService.newTitle('Kimutatások');
  }

  async ngOnInit() {
    this.getAllPerson();
  }

  get person() {
    return this.dateForm.get('person');
  }

  get datetime() {
    return this.dateForm.get('datetime');
  }

  get datetime2() {
    return this.dateForm.get('datetime2');
  }

  typeChange() {
    if (this.type === 1) {
      this.type = 2;
    } else {
      this.type = 1;
    }
  }

  async getAllPerson() {
    this.people = await this.personService.loadPeople();
  }

  async getAllTransaction() {
    this.transactions = (await this.transactionService.loadTransactions()).filter(item => {
      let startDate = new Date(this.dateForm.controls['datetime'].value).valueOf();
      let endDate = new Date(this.dateForm.controls['datetime2'].value).valueOf();
      let date = new Date(item.date).valueOf();
      if (startDate <= date && date <= endDate) {
        return true;
      }
      return false;
    });
  }

  async getTransactionsByName() {
    let personId = (document.getElementById("personSelector") as HTMLSelectElement).value as unknown as number;
    if (personId) {
      this.transactions = (await this.transactionService.loadTransactionsByResidentId(personId)).filter(item => {
        let startDate = new Date(this.dateForm.controls['datetime'].value).valueOf();
        let endDate = new Date(this.dateForm.controls['datetime2'].value).valueOf();
        let date = new Date(item.date).valueOf();
        if (startDate <= date && date <= endDate) {
          return true;
        }
        return false;
      });
    }
  }

  async showReport() {
    if (this.type === 1) {
      await this.getTransactionsByName();
      this.table1 = true;
      this.table2 = false;
      await this.calculateDebt();
    } else {
      await this.getAllTransaction();
      this.table2 = true;
      this.table1 = false;
      await this.calculatePersonData();
      this.calculateHouseData();
    }
  }

  async calculateDebt() {
    if (this.transactions.length != 0) {
      if (this.transactions[0].types === "payment") {
        this.openingDebt = this.transactions[0].balanceAfter - this.transactions[0].amount;
        if (this.openingDebt > 0) {
          this.openingDebt = 0;
        }
      } else {
        this.openingDebt = this.transactions[0].balanceAfter + this.transactions[0].amount;
        if (this.openingDebt > 0) {
          this.openingDebt = 0;
        }
      }
      this.closingDebt = this.transactions[this.transactions.length - 1].balanceAfter;
    } else {
      if (this.person) {
        let transactions = await this.transactionService.loadTransactionsByResidentId(parseInt(this.dateForm.controls['person'].value));
        let overDate = Math.max(...transactions.map(item => new Date(item.date).valueOf()));
        if (overDate < new Date(this.dateForm.controls['datetime2'].value).valueOf()) {
          let opening = this.people.find(item => item.id === parseInt(this.dateForm.controls['person'].value))?.accountBalance;
          if (opening) {
            this.openingDebt = opening;
            this.closingDebt = opening;
          }
        } else {
          this.openingDebt = 0;
          this.closingDebt = 0;
        }
      }
    }
    if (this.closingDebt > 0) {
      this.closingDebt = 0;
    }
  }

  async calculatePersonData() {
    this.residentData = [];
    for (let index = 0; index < this.people.length; index++) {
      const person = this.people[index];
      let allTrans = this.transactions.filter(item => item.resident.id === person.id);
      let tmp: Data = new Data();
      if (allTrans.length !== 0) {
        if (allTrans[0].types === "payment") {
          tmp.openingBalance = allTrans[0].balanceAfter - allTrans[0].amount;
        } else {
          tmp.openingBalance = allTrans[0].balanceAfter + allTrans[0].amount;
        }
        tmp.closingBalance = allTrans[allTrans.length - 1].balanceAfter;
        tmp.accumulatedIncome = allTrans.reduce((sum, current) => {
          if (current.types === "payment") {
            return sum + current.amount;
          } else {
            return sum;
          }}, 0);
        tmp.accumulatedExpanse = allTrans.reduce((sum, current) => {
          if (current.types === "expanse") {
            return sum + current.amount;
          } else {
            return sum;
          }}, 0);
        this.residentData.push(tmp);
      } else {
        let transactions = await this.transactionService.loadTransactions();
        let overDate = Math.max(...transactions.map(item => new Date(item.date).valueOf()));
        if (overDate < new Date(this.dateForm.controls['datetime2'].value).valueOf()) {
          let opening = person.accountBalance;
          let closing = person.accountBalance;
          if (opening && closing) {
            tmp.accumulatedExpanse = 0;
            tmp.accumulatedIncome = 0;
            tmp.closingBalance = closing;
            tmp.openingBalance = opening;
          }
        } else {
          let filteredTrns = transactions.filter(item => item.resident.name === person.name);
          let minDate = Math.min(...transactions.map(item => new Date(item.date).valueOf()));
          let minTrns = transactions.find(item => new Date(item.date).valueOf() === minDate);
          if (minTrns) {
            if (minTrns.types === "payment") {
              tmp.openingBalance = minTrns.balanceAfter - minTrns.amount;
              tmp.closingBalance = tmp.openingBalance;
            } else {
              tmp.openingBalance = minTrns.balanceAfter + minTrns.amount;
              tmp.closingBalance = tmp.openingBalance;
            }
          }
          tmp.accumulatedExpanse = 0;
          tmp.accumulatedIncome = 0;
        }
        this.residentData.push(tmp);
      }
      
    }
  }

  calculateHouseData() {
    this.houseOpeningBalance = 0;
    this.houseAllIncome = 0;
    this.houseAllExpanse = 0;
    this.houseClosingBalance = 0;
    
    this.residentData.forEach(element => {
      this.houseOpeningBalance += element.openingBalance;
      this.houseAllIncome += element.accumulatedIncome;
      this.houseAllExpanse += element.accumulatedExpanse;
      this.houseClosingBalance += element.closingBalance;
    });
  }

  dateValidator(control: FormControl) {
    let startDate = new Date(control.value).valueOf();
    if (this.dateForm !== undefined) {
      let endDate = new Date(this.dateForm.controls['datetime2'].value).valueOf();
      if (startDate >= endDate) {
        return { 'dateInvalid': true};
      }
    }
    /*if (startDate >= new Date().valueOf()) {
      return { 'dateInvalid': true};
    }*/
    return null;
  }

  dateValidator2(control: FormControl) {
    let endDate = new Date(control.value).valueOf();
    if (this.dateForm !== undefined) {
      let startDate = new Date(this.dateForm.controls['datetime'].value).valueOf();
      if (endDate <= startDate) {
        return { 'dateInvalid': true};
      }
    }
    /*if (endDate >= new Date().valueOf()) {
      return { 'dateInvalid': true};
    }*/
    return null;
  }

}

class Data{
  openingBalance!: number;
  accumulatedIncome!: number;
  accumulatedExpanse!: number;
  closingBalance!: number;
}

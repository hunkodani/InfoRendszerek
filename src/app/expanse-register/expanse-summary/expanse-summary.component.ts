import { Component, EventEmitter, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Housing } from 'src/app/Models/housing';
import { Person } from 'src/app/Models/person';
import { Transaction } from 'src/app/Models/transaction';
import { FlatService } from 'src/app/Services/flat.service';
import { PersonService } from 'src/app/Services/person.service';
import { TransactionService } from 'src/app/Services/transaction.service';

@Component({
  selector: 'app-expanse-summary',
  templateUrl: './expanse-summary.component.html',
  styleUrls: ['./expanse-summary.component.css']
})
export class ExpanseSummaryComponent implements OnInit, OnChanges {

  @Input() expansetype!: number;
  @Input() amount!: number;
  @Input() datetime!: Date;
  @Input() description!: string;

  people: Person[] = [];
  transactions: Transaction[] = [];
  flats: Housing[] = [];
  time!: string;
  errorMessage!: string;
  successMessage!: string;

  constructor(private personService: PersonService,
              private flatService: FlatService,
              private transactionService: TransactionService,
              private router: Router) { }

  ngOnInit(): void {
    
  }

  async ngOnChanges(changes: SimpleChanges) {
      await this.loadAllPerson();
      await this.loadAllFlat();
      this.calculateExpansePerResident();
      this.time = this.datetime?.toLocaleString();
  }

  calculateExpansePerResident() {
    this.transactions = [];
    for (let index = 0; index < this.people.length; index++) {
      let person = this.people[index];
      if (person.isResident && person.id) {
        let transaction: Transaction = {date: this.datetime, 
                                        amount: 0, 
                                        balanceAfter: 0, 
                                        types: "expanse", 
                                        resident: person};

        let calculatedExpanse = this.calculateExpanseAmount(person.id);
        transaction.amount = calculatedExpanse;
        transaction.balanceAfter = person.accountBalance - calculatedExpanse;
        person.accountBalance = person.accountBalance - calculatedExpanse;
        transaction.resident = person;
        transaction.description = this.description;

        this.transactions.push(transaction);
      }
    }
  }

  calculateExpanseAmount(personId: number) {
    let expanse = 0;
    if (this.expansetype == 1) {
      this.flats.forEach(element => {
        if (element.residentId == personId) {
          expanse += this.amount * element.area;
        }
      });
      return expanse;
    } else {
      let allArea = this.flats.reduce((sum, current) => sum + current.area, 0);
      this.flats.forEach(element => {
        if (element.residentId == personId) {
          expanse += Math.round((this.amount / allArea) * element.area);
        }
      });
      return expanse;
    }
  }

  async addExpanse() {
    this.errorMessage = '';
    this.successMessage = '';
    try {
      for (let index = 0; index < this.transactions.length; index++) {
        const element = this.transactions[index];
        this.transactionService.createTransaction(element);
      }
      /*this.transactions.forEach(async element => {
        await this.transactionService.createTransaction(element);
      });*/
      this.successMessage = 'A tranzakciók sikeresen létre lettek hozva';
      this.router.navigate(['/main-menu']);
    } catch (err) {
      if (err instanceof Error) {
        this.errorMessage = err.message;
      }
    }
  }

  closePopup() {
    this.errorMessage = "";
    this.successMessage = "";
  }

  async loadAllPerson() {
    this.people = (await this.personService.loadPeople()).filter(item => item.isResident === true);
  }
  
  async loadAllFlat() {
    this.flats = await this.flatService.loadFlats();
  }

  

}

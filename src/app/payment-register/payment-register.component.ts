import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Person } from '../Models/person';
import { Transaction } from '../Models/transaction';
import { MessageService } from '../Services/message.service';
import { PersonService } from '../Services/person.service';
import { TransactionService } from '../Services/transaction.service';

@Component({
  selector: 'app-payment-register',
  templateUrl: './payment-register.component.html',
  styleUrls: ['./payment-register.component.css']
})
export class PaymentRegisterComponent implements OnInit {

  people: Person[] = [];
  latestTransactionDate!: number;
  transactionDate!: string;
  seeDate = false;
  successMessage!: string;
  errorMessage!: string;
  minDate: string = new Date(new Date().getFullYear() - 3, 0, 1).toISOString().substring(0,16);
  maxDate: string = new Date(new Date().getFullYear(), 
                             new Date().getMonth(), 
                             new Date().getDate(), 
                             new Date().getHours() + 1)
                             .toISOString().substring(0,16);

  paymentForm: FormGroup = this.formBuilder.group({
    person: ['', Validators.required],
    amount: [0, [Validators.required, Validators.min(1)]],
    datetime: ['', [Validators.required, this.dateValidator.bind(this)]],
  });

  constructor(private formBuilder: FormBuilder,
              private personService: PersonService,
              private transactionService: TransactionService,
              private messageService: MessageService) {
                this.messageService.newTitle("Egyéni befizetések"); 
  }

  async ngOnInit() {
    this.getAllPerson();
  }

  get person() {
    return this.paymentForm.get('person');
  }

  get amount() {
    return this.paymentForm.get('amount');
  }

  get datetime() {
    return this.paymentForm.get('datetime');
  }

  async addPayment() {
    let person: Person = this.paymentForm.controls['person'].value;
    let transaction: Transaction = {date: new Date(), amount: 0, balanceAfter: 0, types: "payment", resident: person};
    this.successMessage = '';
    this.errorMessage = '';

    transaction.date = this.paymentForm.controls['datetime'].value;
    transaction.amount = this.paymentForm.controls['amount'].value;
    transaction.balanceAfter = person.accountBalance + transaction.amount;
    person.accountBalance = person.accountBalance + transaction.amount;
    transaction.types = "payment";
    transaction.resident = person;

    try {
      const tmpTransaction = await this.transactionService.createTransaction(transaction);
      this.successMessage = `Tranzakció létrehozva a következő id alatt: ${tmpTransaction.id}`;
      this.paymentForm.reset({person: '', amount: 0, datetime: ''});
      this.seeDate = false;
    } catch (err) {
      if (err instanceof Error) {
        this.errorMessage = err.message;
      }
    }
  }

  cancel() {
    this.paymentForm.reset({person: '', amount: 0, datetime: ''});
    this.seeDate = false;
  }

  closePopup() {
    this.errorMessage = "";
    this.successMessage = "";
  }

  async getAllPerson() {
    this.people = await this.personService.loadPeople();
  }

  async GetTransactions() {
    let person: Person = this.paymentForm.controls['person'].value;
    if (person.id) {
      const transactions = await this.transactionService.loadTransactionsByResidentId(person.id);
      this.latestTransactionDate = Math.max(...transactions.map(item => new Date(item.date).valueOf()));
      this.transactionDate = new Date(this.latestTransactionDate).toLocaleString();
      this.seeDate = true;
    }
  }

  dateValidator(control: FormControl) {
    let currentTransaction = new Date(control.value).valueOf();
    if (currentTransaction >= new Date().valueOf()) {
      return { 'dateInvalid': true};
    }
    if (this.latestTransactionDate != undefined && this.latestTransactionDate >= currentTransaction) {
      return { 'dateInvalid': true};
    }
    return null;
  }

}

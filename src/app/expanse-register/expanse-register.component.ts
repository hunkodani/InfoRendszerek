import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from '../Services/message.service';
import { TransactionService } from '../Services/transaction.service';

@Component({
  selector: 'app-expanse-register',
  templateUrl: './expanse-register.component.html',
  styleUrls: ['./expanse-register.component.css']
})
export class ExpanseRegisterComponent implements OnInit {

  latestTransactionDate!: number;
  transactionDate!: string;
  maxDate: string = new Date(new Date().getFullYear(), 
                             new Date().getMonth(), 
                             new Date().getDate(), 
                             new Date().getHours() + 1)
                             .toISOString().substring(0,16);
  summary = false;

  expanseForm: FormGroup = this.formBuilder.group({
    description: ['', Validators.required],
    amount: [0, [Validators.required, Validators.min(1)]],
    expanseType: ['', Validators.required],
    datetime: ['', [Validators.required, this.dateValidator.bind(this)]]
  });

  constructor(private formBuilder: FormBuilder,
              private transactionService: TransactionService,
              private messageService: MessageService) {
                this.messageService.newTitle("Költségek elosztása");
  }

  ngOnInit(): void {
    this.GetAllTransactions();
  }

  get description() {
    return this.expanseForm.get('description');
  }

  get amount() {
    return this.expanseForm.get('amount');
  }

  get datetime() {
    return this.expanseForm.get('datetime');
  }
  
  get expanseType() {
    return this.expanseForm.get('expanseType');
  }

  ToSummary() {
    //this.expanseForm.reset({description: '', amount: 0, datetime: ''});
    this.summary = true;
  }

  async GetAllTransactions() {
    const transactions = await this.transactionService.loadTransactions();
    this.latestTransactionDate = Math.max(...transactions.map(item => new Date(item.date).valueOf()));
    this.transactionDate = new Date(this.latestTransactionDate).toLocaleString();
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

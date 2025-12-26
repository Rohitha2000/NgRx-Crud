import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Customer } from '../store/model/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  baseurl= 'http://localhost:3000/customer';

  private http = inject(HttpClient);

  getCustomers(){
    return this.http.get<Customer[]>(this.baseurl);
  }
  getCustomerByCode(code:number){
    return this.http.get<Customer>(this.baseurl+'/'+code);
  }
  delete(code:number){
    return this.http.delete(this.baseurl +'/'+code);
  }
   update(data:Customer){
    return this.http.put(this.baseurl+'/' + data.id, data);
  }
   create(data:Customer){
    return this.http.post(this.baseurl, data);
  }

}

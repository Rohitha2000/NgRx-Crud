import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Associate } from '../store/model/associate.model';

@Injectable({
  providedIn: 'root'
})
export class AssociateService {
  baseurl= 'http://localhost:3000/associate';

  private http = inject(HttpClient);

  getAssociates(){
    return this.http.get<Associate[]>(this.baseurl);
  }
  getAssociateByCode(code:number){
    return this.http.get<Associate>(this.baseurl+'/'+code);
  }
  delete(code:number){
    return this.http.delete(this.baseurl +'/'+code);
  }
   update(data:Associate){
    return this.http.put(this.baseurl+'/' + data.id, data);
  }
   create(data:Associate){
    return this.http.post(this.baseurl, data);
  }

}

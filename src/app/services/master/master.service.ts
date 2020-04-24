import { Injectable } from '@angular/core';
import { DataService } from 'src/app/services/data/data.service';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor(private dataService: DataService) { }

  public getMainUserName(): string {
    return this.dataService.getUserName();
  }

}

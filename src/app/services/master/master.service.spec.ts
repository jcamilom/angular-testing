import { TestBed } from '@angular/core/testing';

import { MasterService } from './master.service';
import { DataService } from 'src/app/services/data/data.service';

describe('MasterService', () => {
  let masterService: MasterService;
  let dataServiceSpy: jasmine.SpyObj<DataService>;

  beforeEach(() => {

    const spy = jasmine.createSpyObj('DataService', ['getUserName']);

    TestBed.configureTestingModule({
      providers: [
        MasterService,
        { provide: DataService, useValue: spy },
      ]
    });
    masterService = TestBed.inject(MasterService);
    dataServiceSpy = TestBed.inject(DataService) as jasmine.SpyObj<DataService>;
  });

  it('should be created', () => {
    expect(masterService).toBeTruthy();
  });

  it('should get real values from service', () => {
    const stubValue = 'stub value';
    dataServiceSpy.getUserName.and.returnValue(stubValue);
    expect(masterService.getMainUserName()).toEqual(stubValue);
  });

});

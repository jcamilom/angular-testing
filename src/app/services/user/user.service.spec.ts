import { TestBed } from '@angular/core/testing';

import { UserService, IUserData } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should calculate BMI for valid data', () => {
    // Arrange
    const userData: IUserData = {
      name: 'Juan',
      mass: 70,
      height: 1.70
    };
    const expectedBMI = 24.2;
    // Act
    const bmi = service.calculateBMI(userData);
    // Assert
    expect(bmi).toBeCloseTo(expectedBMI, 1);
  });

});

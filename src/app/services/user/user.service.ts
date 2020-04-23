import { Injectable } from '@angular/core';

export interface IUserData {
  name: string;
  mass: number;
  height: number;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  // Calculates the Body Mass Index with the provided data.
  // mass in kg, height in meters
  public calculateBMI(userData: IUserData): number {
    return userData.mass / (userData.height * userData.height);
  }

}

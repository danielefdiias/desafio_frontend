
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Pet } from '../models/pet';

@Injectable({
  providedIn: 'root'
})
export class PetService {

  url = 'http://localhost:3000/pets'; // api rest fake

  // injetando o HttpClient
  constructor(private httpClient: HttpClient) { }

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  getPets(): Observable<Pet[]> {
    return this.httpClient.get<Pet[]>(this.url)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  getPetById(id: number): Observable<Pet> {
    return this.httpClient.get<Pet>(this.url + '/' + id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  savePet(pet: Pet): Observable<Pet> {
    return this.httpClient.post<Pet>(this.url, JSON.stringify(pet), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  updatePet(pet: Pet): Observable<Pet> {
    return this.httpClient.put<Pet>(this.url + '/' + pet.id, JSON.stringify(pet), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  deletePet(pet: Pet) {
    return this.httpClient.delete<Pet>(this.url + '/' + pet.id, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };

}
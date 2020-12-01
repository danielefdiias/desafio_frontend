import { Component, OnInit } from '@angular/core';
import { PetService } from './services/pet.service';
import { Pet } from './models/pet';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  pet = {} as Pet;
  pets: Pet[] = [];

  constructor(private petService: PetService) {}
  
  ngOnInit() {
    this.getPets();
  }

  savePet(form: NgForm) {
    if (this.pet.id !== undefined) {
      this.petService.updatePet(this.pet).subscribe(() => {
        this.cleanForm(form);
      });
    } else {
      this.petService.savePet(this.pet).subscribe(() => {
        this.cleanForm(form);
      });
    }
  }

  getPets() {
    this.petService.getPets().subscribe((pets: Pet[]) => {
      this.pets = pets;
    });
  }

  deletePet(pet: Pet) {
    
    this.petService.deletePet(pet).subscribe(() => {
      this.getPets();
    });
  }

  editPet(pet: Pet) {
    this.pet = { ...pet };
  }

  cleanForm(form: NgForm) {
    this.getPets();
    form.resetForm();
    this.pet = {} as Pet;
  }
}
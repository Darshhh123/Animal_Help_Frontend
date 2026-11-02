import { Component } from '@angular/core';
import { Pet } from '../../../core/models/pet.model';
import { NotificationService } from '../../../core/services/notification.service';
import { PetService } from '../../../core/services/pet.service';
@Component({ selector: 'app-pets', templateUrl: './pets.component.html' }) export class PetsComponent {
  selectedPet: Pet | null = null; petName = ''; species = 'Dog'; breed = ''; age = 1;
  constructor(public pets: PetService, private notify: NotificationService) {}
  selectPet(pet: Pet) { this.selectedPet = pet; }
  addPet() { if (!this.petName.trim() || !this.breed.trim()) { this.notify.show('Add your pet’s name and breed.'); return; } this.pets.add({ name: this.petName.trim(), species: this.species, breed: this.breed.trim(), age: this.age, gender: 'Not specified', color: 'Not specified', weight: 0, notes: 'Add notes about your pet here.', allergies: ['Not recorded'] }); this.petName = ''; this.breed = ''; this.age = 1; this.notify.show('Pet profile added.'); }
  removePet(id: string) { this.pets.remove(id); this.selectedPet = null; this.notify.show('Pet profile removed.'); }
}

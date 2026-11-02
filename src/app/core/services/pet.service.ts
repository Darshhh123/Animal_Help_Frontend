import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';
import { Pet } from '../models/pet.model';

interface ApiPet { id: number; owner_id: number; name: string; species: string; breed?: string; gender?: string; date_of_birth?: string; weight_kg?: number; image_url?: string; }

@Injectable({ providedIn: 'root' })
export class PetService {
  private readonly subject = new BehaviorSubject<Pet[]>([]);
  pets$ = this.subject.asObservable();

  constructor(private http: HttpClient, private auth: AuthService) { this.load(); }

  get pets() { return this.subject.value; }

  load() {
    this.http.get<ApiPet[]>(`${environment.apiUrl}/pets/`).subscribe({
      next: rows => this.subject.next(rows.map(row => this.toPet(row))),
      error: () => this.subject.next([]),
    });
  }

  add(pet: Omit<Pet, 'id' | 'ownerId'>) {
    const ownerId = Number(this.auth.currentUser?.id || 1);
    const dateOfBirth = pet.age ? `${new Date().getFullYear() - pet.age}-01-01` : undefined;
    this.http.post<ApiPet>(`${environment.apiUrl}/pets/`, {
      owner_id: ownerId,
      name: pet.name,
      species: pet.species,
      breed: pet.breed,
      gender: pet.gender,
      date_of_birth: dateOfBirth,
      weight_kg: pet.weight || undefined,
      image_url: undefined,
    }).subscribe({ next: row => this.subject.next([this.toPet(row), ...this.pets]) });
  }

  remove(id: string) {
    this.http.delete(`${environment.apiUrl}/pets/${id}`).subscribe({
      next: () => this.subject.next(this.pets.filter(pet => pet.id !== id)),
    });
  }

  update(id: string, changes: Partial<Pet>) {
    const existing = this.pets.find(pet => pet.id === id);
    if (!existing) return;
    this.http.put<ApiPet>(`${environment.apiUrl}/pets/${id}`, {
      name: changes.name ?? existing.name,
      species: changes.species ?? existing.species,
      breed: changes.breed ?? existing.breed,
      gender: changes.gender ?? existing.gender,
      weight_kg: changes.weight ?? existing.weight,
    }).subscribe({ next: row => this.subject.next(this.pets.map(pet => pet.id === id ? this.toPet(row) : pet)) });
  }

  private toPet(row: ApiPet): Pet {
    return {
      id: String(row.id), ownerId: String(row.owner_id), name: row.name, species: row.species,
      breed: row.breed || 'Not specified', age: this.ageFromDate(row.date_of_birth), gender: row.gender,
      weight: row.weight_kg, imageUrl: row.image_url,
    };
  }

  private ageFromDate(value?: string) {
    if (!value) return 0;
    return Math.max(0, new Date().getFullYear() - new Date(value).getFullYear());
  }
}

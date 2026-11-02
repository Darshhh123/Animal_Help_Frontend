export interface Pet {
  id: string; name: string; species: string; breed: string; age: number; ownerId: string;
  gender?: string; color?: string; weight?: number; microchip?: string; notes?: string;
  imageUrl?: string;
  lastCheckup?: string; nextVaccine?: string; allergies?: string[];
}

export interface Gun {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imagePath: string;
}
export interface GunCreateModel {
  name: string;
  description: string;
  price: number;
  category: string;
  image: File;
}

export interface Customer {
  id: number;
  name: string;
  cccd: string;
  username: string;
  address: string;
  phone: string;
  bookings: number;
  reviews: number;
  active: boolean;
  password?: string;
}
export interface Booking {
  image: string;
  openTime: string;
  pitchType: string;
  name: string;
  location: string;
  ratingCount: number;
}
export interface Review {
  date: string;
  rating: number;
  comment: string;
  stadium: string;
  location: string;
}
export interface RegisterMutation {
  username: string;
  password: string;
  displayName: string;
  avatar: File | null;
}

export interface User {
  _id: string;
  username: string;
  token: string;
  displayName: string;
  role: string;
  avatar: string;
}

export interface RegisterResponse {
  message: string;
  user: User;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    }
  },
  message: string;
  name: string;
  _message: string;
}

export interface GlobalError {
  error: string;
}

export interface LoginMutation {
  username: string;
  password: string;
}

export interface Ingredient {
  name: string;
  amount: string;
}

export interface CocktailMutation {
  name: string;
  recipe: string;
  ingredients: Ingredient[];
  image: File | null;
}

export interface Cocktail extends CocktailMutation {
  _id: string;
  isPublished: boolean;
}
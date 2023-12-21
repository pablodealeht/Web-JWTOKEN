import { Perfil } from "./perfil.enum";

export interface MenuItem {
  name: string;
  route: string;
  component: any; // Aquí puedes especificar un tipo más concreto si es necesario
  allowedProfiles: Perfil[];
}

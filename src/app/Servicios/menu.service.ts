import { Injectable } from '@angular/core';
import { AbmTestComponent } from '../Componentes/abm-test/abm-test.component';
import { MenuItem } from '../Menu/menu-item.model';
import { Perfil } from '../Menu/perfil.enum';

@Injectable({ providedIn: 'root' })
export class MenuService {
    private menus: MenuItem[] = [
        { name: 'ABM Test', route: '/abm-test', component: AbmTestComponent, allowedProfiles: [Perfil.Administrador] },
        // Agrega aquí otros menús...
    ];

    constructor() {}

    getMenusForProfile(profile: Perfil): MenuItem[] {
        return this.menus.filter(menu => menu.allowedProfiles.includes(profile));
    }
}

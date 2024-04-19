import { Routes } from '@angular/router';
import {ClientsPageComponent} from "../clients/page/clients-page.component";
import {HomePageComponent} from "./home-page.component";
import {ChatComponent} from "../chat/components/chat/chat.component";

export const homeRoutes: Routes = [
  {
    path: "",
    component: HomePageComponent,
    children: [
      {
        path: "",
        redirectTo: "clients",
        pathMatch: "full"
      },
      {
        title: "CLIENTS PAGE",
        component: ClientsPageComponent,
        path: 'clients',
        pathMatch: "full"
      },
      {
        title: "CHAT PAGE",
        component: ChatComponent,
        path: 'chat',
        pathMatch: "full"
      },
    ]
  },
];

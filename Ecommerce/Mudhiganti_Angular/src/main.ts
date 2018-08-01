import './polyfills.ts';
declare var $: any;

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';
import { AppModule } from './app/';

if (environment.production) {
  enableProdMode();
}

function HandleBackFunctionality(){
	window.location.reload();
}

window.onpopstate = HandleBackFunctionality;



platformBrowserDynamic().bootstrapModule(AppModule);

import {FactoryProvider} from '@angular/core';
import {DexService} from './dex.service';

const dexServiceFactory = () => new DexService();

export const dexServiceFactoryProvider: FactoryProvider = {
	provide: DexService,
	useFactory: dexServiceFactory,
	deps: []
};

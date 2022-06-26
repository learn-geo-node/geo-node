import { configuration } from '@/app-config';
import { App } from './server';
// TODO: register routes

const app = new App(configuration);
app.initServerConnection();

ANIMALCARE ANGULAR 17 SOURCE
Copy this package's app/ folder into your existing project's src/app/ and styles.css into src/styles.css.
Back up your existing src folder first.

Ensure src/main.ts bootstraps AppModule:
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
platformBrowserDynamic().bootstrapModule(AppModule).catch(err => console.error(err));

Ensure angular.json build.options.styles includes "src/styles.css".
Then run: npx ng serve -o

Demo portal: select Pet Owner or Clinic Admin at /login. No password.
Both portals share appointments using one root AppointmentService and browser localStorage.
Owner form booking creates PENDING appointment; admin can approve/reject; owner view updates.
AI chat is scripted demo logic, not Gemini/RAG. AI calling page does not place calls or use microphone.
Role guard is demo-only frontend protection, not production security. Data is browser-local only.

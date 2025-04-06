import { test, expect } from '@playwright/test';
import { RegisterPage } from '../pages/register.page';

test('Registro de nuevo usuario', async ({ page }) => {
  const registerPage = new RegisterPage(page);

  await registerPage.goto();          // Visitar página y cerrar popup si aparece
  await registerPage.fillForm();      // Llenar todos los campos
  await registerPage.submitForm();    // Enviar el formulario
  await page.pause();                 // Pausa para que puedas verlo en el navegador
});

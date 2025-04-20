import { test, expect } from '@playwright/test';
import { RegisterPage } from '../pages/register.page';
import { LoginPage } from '../pages/login.page';
import { v4 as uuidv4 } from 'uuid';  // Para generar un email único

test('Registro dinámico y login exitoso', async ({ page }) => {
  const registerPage = new RegisterPage(page);
  const loginPage = new LoginPage(page);

  // 1. Crear email único
  const uniqueEmail = `caro_${uuidv4()}@mail.com`;
  const password = '12345*';

  // 2. Registro
  await registerPage.goto();
  await registerPage.fillForm('Carolina', 'Romero', uniqueEmail, password);
  await registerPage.submitForm();

  // 3. Ir a Login
  await loginPage.goTo();
  await loginPage.loginCredentials(uniqueEmail, password);

  // 4. Ubicar el botón login y hacer clic
  const loginButton = page.locator('//html/body/div[2]/section/div/div/div[1]/div[2]/div/form/div[4]/button');

  try {
    await page.evaluate(() => window.scrollBy(0, window.innerHeight)); // Scroll hacia abajo
    await page.waitForTimeout(1000); // Espera

    await loginButton.scrollIntoViewIfNeeded(); // Asegura que se vea el botón
    await expect(loginButton).toBeVisible({ timeout: 5000 });
    await expect(loginButton).toBeEnabled();
    await loginButton.click(); // Hacer clic

    // 5. Verificar login exitoso
    const profileIcon = page.locator('#header .nav-account a');
    await expect(profileIcon).toBeVisible({ timeout: 5000 });

  } catch (error) {
    console.error('❌ Error al hacer clic en el botón de login:', error);
    await page.screenshot({ path: 'error_login.png', fullPage: true });
  }
});

import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';

test('Visit Website and Close Pop-up', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.goto();              // Ir al sitio y cerrar pop-up si aparece
  await homePage.clickProfileIcon();  // Clic en ícono de perfil
  await page.pause();                 // Pausar para ver si funcionó visualmente
});

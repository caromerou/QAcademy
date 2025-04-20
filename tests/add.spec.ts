import { test, expect } from '@playwright/test';

test('Añadir producto al carrito y seleccionar opciones', async ({ page }) => {
  // 1. Navegar a la página principal
  await page.goto('https://automation-portal-bootcamp.vercel.app/', {
    waitUntil: 'domcontentloaded', // Asegurarse de que el DOM esté cargado
  });

  // Verificar que el título de la página o algún otro elemento visible esté presente
  await expect(page).toHaveTitle(/Portal/);  // Ajusta el texto si el título real es diferente

  // 2. Esperar hasta que el pop-up de "Not Interested" esté cerrado manualmente
  await closeNotInterestedPopupIfVisible(page);

  // 3. Desplazar hacia abajo y seleccionar el primer producto
  await page.locator('#wrapper > div > section:nth-child(6) > div.tf-grid-layout.tf-col-2.md-col-3.gap-0.home-pckaleball-page > div:nth-child(1) > div.card-product-wrapper > a > img.lazyload.img-hover').scrollIntoViewIfNeeded();
  await page.locator('#wrapper > div > section:nth-child(6) > div.tf-grid-layout.tf-col-2.md-col-3.gap-0.home-pckaleball-page > div:nth-child(1) > div.card-product-wrapper > a > img.lazyload.img-hover').click();

  // 4. Cerrar cualquier pop-up emergente si está visible
  await closePopupIfVisible(page);

  // 5. Esperar y hacer clic en el botón de ocultar el popup si aparece
  await closeHidePopupButton(page);

  // 6. Seleccionar tamaño y color
  await page.locator('#wrapper > section:nth-child(3) > div.tf-main-product.section-image-zoom > div > div > div:nth-child(2) > div > div.tf-product-info-list.other-image-zoom > div.tf-product-info-variant-picker > div:nth-child(1) > form > label:nth-child(6) > span.btn-checkbox.bg-color-blue').click();
  await page.locator('#wrapper > section:nth-child(3) > div.tf-main-product.section-image-zoom > div > div > div:nth-child(2) > div > div.tf-product-info-list.other-image-zoom > div.tf-product-info-variant-picker > div:nth-child(2) > form > label:nth-child(8) > p').click();
  
  // Hacer click 3 veces en el mismo elemento para aplicar el tamaño/color
  await page.locator('#wrapper > section:nth-child(3) > div.tf-main-product.section-image-zoom > div > div > div:nth-child(2) > div > div.tf-product-info-list.other-image-zoom > div.tf-product-info-variant-picker > div:nth-child(2) > form > label:nth-child(8) > p').click();
  await page.locator('#wrapper > section:nth-child(3) > div.tf-main-product.section-image-zoom > div > div > div:nth-child(2) > div > div.tf-product-info-list.other-image-zoom > div.tf-product-info-variant-picker > div:nth-child(2) > form > label:nth-child(8) > p').click();
  await page.locator('#wrapper > section:nth-child(3) > div.tf-main-product.section-image-zoom > div > div > div:nth-child(2) > div > div.tf-product-info-list.other-image-zoom > div.tf-product-info-variant-picker > div:nth-child(2) > form > label:nth-child(8) > p').click();

  // 7. Agregar al carrito
  await page.locator('#wrapper > section:nth-child(3) > div.tf-main-product.section-image-zoom > div > div > div:nth-child(2) > div > div.tf-product-info-list.other-image-zoom > div.tf-product-info-variant-picker > div:nth-child(2) > form > label:nth-child(8) > p').click();

  // Validación: Verificar si el carrito ha sido actualizado (por ejemplo, verificar que el número de productos en el carrito aumentó)
  const cartCount = page.locator('.cart-icon .item-count');  // Suponiendo que el carrito tiene un contador
  await expect(cartCount).toHaveText('1');
});

// Función para cerrar el popup "Not Interested" usando el XPath actualizado
async function closeNotInterestedPopupIfVisible(page) {
  try {
    const notInterestedPopup = page.locator('#newsletterPopup > div > div > div.modal-bottom');  // Usando el selector actualizado
    if (await notInterestedPopup.isVisible({ timeout: 5000 })) {  // Esperar hasta 5 segundos para ver si está visible
      const closeButton = notInterestedPopup.locator('button'); // Suponiendo que el botón está dentro del modal
      await closeButton.click();
      console.log('Popup "Not Interested" cerrado con éxito');
    }
  } catch (error) {
    console.log('"Not Interested" Popup no visible o no apareció.');
  }
}

// Función para cerrar otros popups si son visibles
async function closePopupIfVisible(page) {
  try {
    const popup = page.locator('//*[@id="newsletterPopup"]');  // Usando el XPath proporcionado
    if (await popup.isVisible({ timeout: 5000 })) {
      const closeButton = popup.locator('.mfp-close');  // Botón de cerrar (ajustado al popup)
      await closeButton.click();
      console.log('Popup cerrado con éxito');
    }
  } catch (error) {
    console.log('Popup no visible o no apareció.');
  }
}

// Función para cerrar el botón de ocultar el popup emergente si aparece
async function closeHidePopupButton(page) {
  try {
    const hidePopupButton = page.locator('a.tf-btn.btn-line.fw-6.btn-hide-popup');
    // Esperamos a que el botón sea visible y habilitado
    await page.waitForSelector('a.tf-btn.btn-line.fw-6.btn-hide-popup', { visible: true, timeout: 5000 });
    await hidePopupButton.click();
    // Validamos que el modal se haya cerrado
    await page.waitForSelector('.modal-bottom', { hidden: true, timeout: 5000 });
    console.log('Popup de ocultar cerrado correctamente');
  } catch (error) {
    console.log('Popup de ocultar no visible o no apareció.');
  }
}


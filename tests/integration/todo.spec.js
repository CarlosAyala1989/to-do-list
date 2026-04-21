const { test, expect } = require('@playwright/test');

test.describe('Integración UI - Gestor de Tareas', () => {
  test('R1: agrega "Comprar leche" desde el formulario y aparece en pendientes', async ({ page }) => {
    await page.goto('/');

    await page.getByTestId('task-input').fill('Comprar leche');
    await page.getByTestId('save-task-button').click();

    await expect(page.getByTestId('pending-list')).toContainText('Comprar leche');
  });

  test('R2: al completar la tarea, se mueve a la lista de completadas', async ({ page }) => {
    await page.goto('/');

    await page.getByTestId('task-input').fill('Comprar leche');
    await page.getByTestId('save-task-button').click();

    await page.getByRole('button', { name: /completar comprar leche/i }).click();

    await expect(page.getByTestId('pending-list')).not.toContainText('Comprar leche');
    await expect(page.getByTestId('completed-list')).toContainText('Comprar leche');
  });
});

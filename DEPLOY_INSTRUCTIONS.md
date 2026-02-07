# Instrucciones para Deploy en GitHub Pages

## Paso 1: Inicializar Git (si no lo has hecho)
```bash
git init
git add .
git commit -m "Initial commit - Valentine's proposal"
```

## Paso 2: Crear repositorio en GitHub
1. Ve a https://github.com/new
2. Nombra tu repositorio (ejemplo: "valentine")
3. **NO inicialices con README, .gitignore o licencia**
4. Click en "Create repository"

## Paso 3: Conectar tu proyecto con GitHub
```bash
git remote add origin https://github.com/TU-USUARIO/valentine.git
git branch -M main
git push -u origin main
```

## Paso 4: Configurar GitHub Pages
1. Ve a tu repositorio en GitHub
2. Click en "Settings" (Configuración)
3. En el menú izquierdo, click en "Pages"
4. En "Source", selecciona "GitHub Actions"

## Paso 5: Actualizar el nombre del repositorio en vite.config.ts
Si tu repositorio se llama diferente a "valentine", actualiza la línea:
```typescript
base: '/TU-NOMBRE-REPOSITORIO/',
```

## ¡Listo!
Cada vez que hagas push a la rama main, se desplegará automáticamente.

Tu sitio estará disponible en:
https://TU-USUARIO.github.io/valentine/

## Para actualizar el sitio
```bash
git add .
git commit -m "Update content"
git push
```

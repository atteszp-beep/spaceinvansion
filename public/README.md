# Space Shooter – Netlify + Render Telepítési Útmutató

  ## Architektúra

  ```
  ┌─────────────────┐        WebSocket (wss://)       ┌─────────────────────┐
  │  Netlify        │ ◄──────────────────────────────► │  Render / Railway   │
  │  (frontend)     │                                  │  (WebSocket backend)│
  └─────────────────┘                                  └─────────────────────┘
  ```

  ---

  ## 1. Backend telepítése (WebSocket szerver) → Render.com

  1. Hozz létre egy ingyenes fiókot a **[render.com](https://render.com)** oldalon
  2. **New → Web Service** → töltsd fel a `server/` mappát (vagy GitHub repóból)
  3. Beállítások:
     - **Build Command:** `npm install`
     - **Start Command:** `npm start`
     - **Environment:** Node
  4. Render ad egy URL-t, pl: `https://space-shooter-server.onrender.com`

  ---

  ## 2. Frontend telepítése → Netlify

  1. Hozz létre ingyenes fiókot a **[netlify.com](https://netlify.com)** oldalon
  2. **Add new site → Deploy manually** → húzd be ezt a mappát (`space-shooter-frontend/`)
     - VAGY: GitHub repóból telepíts
  3. **Build settings** (automatikusan felismeri a `netlify.toml` alapján):
     - Build command: `npm run build`
     - Publish directory: `dist`
  4. **Environment variables** beállítása a Netlify dashboardon:
     - `VITE_WS_URL` = `wss://space-shooter-server.onrender.com`
     *(a Render-en kapott URL, `wss://` prefix-szel)*
  5. **Redeploy** a változtatás után

  ---

  ## 3. Helyi fejlesztés

  ### Frontend
  ```bash
  cd space-shooter-frontend
  npm install
  npm run dev
  ```

  ### Backend (másik terminálban)
  ```bash
  cd server
  npm install
  npm start
  ```

  Frontend: http://localhost:5173  
  Backend WS: ws://localhost:3001

  ---

  ## Vezérlés
  | Eszköz | Mozgás | Célzás | Lövés |
  |--------|--------|--------|-------|
  | Billentyűzet + egér | WASD / Nyilak | Egér | Kattintás / Space |
  | Gamepad | Bal kar | Jobb kar | RT / A gomb |
  | Érintőképernyő | Bal joystick | Jobb joystick | Jobb joystick kinyomva |
  
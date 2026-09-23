# 🏀 WUS Site — Wellfit Union Sport

Sito web ufficiale e moderno per la società di pallacanestro **Wellfit Union Sport** (Breda di Piave, Treviso).  
Il progetto è pronto all'uso, completamente responsive (perfetto su smartphone, tablet e computer) e **non richiede alcuna configurazione complessa o dipendenza pesante** per essere eseguito.

---

## 📋 Indice dei Contenuti
- [Caratteristiche del Sito](#-caratteristiche-del-sito)
- [Come Scaricare il Progetto da GitHub](#-come-scaricare-il-progetto-da-github)
- [Come Avviare il Sito sul Tuo PC (Guida per Principianti)](#-come-avviare-il-sito-sul-tuo-pc)
  - [Metodo 1: Doppio clic su `avvia-sito.bat` (Consigliato per Windows)](#metodo-1-doppio-clic-su-avvia-sitobat-consigliato-per-windows)
  - [Metodo 2: Apertura Diretta di `index.html` (Funziona ovunque: Windows, Mac, Linux)](#metodo-2-apertura-diretta-di-indexhtml-zero-installazioni)
  - [Metodo 3: Per sviluppatori (Live Server, Python o Node.js)](#metodo-3-per-sviluppatori)
- [Come Pubblicare il Sito Gratis su Internet (GitHub Pages)](#-come-pubblicare-il-sito-gratis-su-internet-github-pages)
- [Struttura delle Cartelle e dei File](#-struttura-delle-cartelle-e-dei-file)
- [Come Modificare e Personalizzare i Contenuti](#-come-modificare-e-personalizzare-i-contenuti)
- [Tecnologie Utilizzate](#-tecnologie-utilizzate)

---

## ✨ Caratteristiche del Sito

- **Home Page dinamica**: banner annunci in evidenza, sezioni informative, statistiche societarie e anteprima squadre.
- **Squadre**: schede dettagliate per Minibasket, Under 14 e Prima Squadra Senior con modali interattivi per staff e roster.
- **Calendario & Risultati**: filtro per categoria, risultati delle ultime partite e prossimi incontri casalinghi.
- **Galleria Fotografica**: galleria con visualizzatore a tutto schermo (lightbox) per eventi e partite.
- **Sponsor & Partner**: vetrina per sostenitori e pacchetti di sponsorizzazione.
- **Contatti & Dove Siamo**: modulo interattivo di richiesta informazioni, recapiti e indicazioni per il Palazzetto.
- **100% Responsive & Veloce**: ottimizzato per caricarsi all'istante su ogni dispositivo.

---

## 📥 Come Scaricare il Progetto da GitHub

Se sei un utente inesperto e vuoi solo scaricare il sito sul tuo computer:

1. Apri la pagina della repository su GitHub (**WUS Site**).
2. In alto a destra, clicca sul pulsante verde **`<> Code`**.
3. Nel menu a tendina che compare, seleziona **`Download ZIP`**.
4. Una volta terminato il download, vai nella tua cartella **Download** del computer.
5. Fai clic destro sul file `.zip` scaricato e scegli **"Estrai tutto..."** (o *Extract All*).
6. Ora hai la cartella pronta con tutti i file del progetto!

---

## 🚀 Come Avviare il Sito sul Tuo PC

Non è necessario installare database o programmi complicati. Scegli il metodo che preferisci:

### Metodo 1: Doppio clic su `avvia-sito.bat` (Consigliato per Windows)
All'interno della cartella del progetto trovi il file **`avvia-sito.bat`**:
1. Fai **doppio clic su `avvia-sito.bat`**.
2. Si aprirà una finestra nera e, in automatico, si aprirà il tuo browser all'indirizzo locale:  
   👉 **`http://localhost:8080/`**
3. Il sito è subito attivo e navigabile!
4. *Quando hai finito*, ti basta chiudere la finestra nera del terminale.

---

### Metodo 2: Apertura Diretta di `index.html` (Zero Installazioni)
Questo metodo funziona su **qualsiasi sistema operativo** (Windows, macOS, Linux):
1. Apri la cartella del progetto.
2. Trova il file **`index.html`**.
3. Fai **doppio clic su `index.html`** (oppure fai clic destro ➔ *Apri con* ➔ *Google Chrome*, *Microsoft Edge*, *Firefox* o *Safari*).
4. Il sito si aprirà istantaneamente nel tuo browser e potrai navigare tutte le pagine.

---

### Metodo 3: Per sviluppatori
Se disponi già di strumenti di sviluppo sul tuo computer:

- **Con estensione Live Server su VS Code / Antigravity IDE**:  
  Fai clic destro su `index.html` e seleziona **"Open with Live Server"**.
- **Con Python**:
  ```bash
  python -m http.server 8080
  ```
  poi apri `http://localhost:8080/` nel browser.
- **Con Node.js**:
  ```bash
  npx serve .
  ```

---

## 🌐 Come Pubblicare il Sito Gratis su Internet (GitHub Pages)

Vuoi condividere il sito con amici, atleti e dirigenti con un link pubblico senza dover inviare file ZIP? Puoi attivare **GitHub Pages** gratuitamente in 30 secondi:

1. Vai sulla tua repository su GitHub.
2. Clicca sulla scheda **Settings** (Impostazioni) in alto.
3. Nel menu a sinistra, clicca su **Pages**.
4. Sotto la voce **Build and deployment**:
   - In *Source* seleziona **Deploy from a branch**.
   - Sotto *Branch*, seleziona **main** (o *master*) e la cartella **/ (root)**.
   - Clicca su **Save**.
5. Attendi circa 1-2 minuti e ricarica la pagina: GitHub ti fornirà un link pubblico del tipo:  
   👉 `https://tuo-username.github.io/WUS-Site/`
6. Condividi questo link con chiunque: il sito sarà visibile da qualsiasi smartphone e computer!

---

## 📁 Struttura delle Cartelle e dei File

```text
WUS-Site/
│
├── index.html            # Pagina principale (Home page)
├── squadre.html          # Pagina con le schede delle squadre (Minibasket, U14, Senior)
├── calendario.html       # Calendario partite, orari e risultati
├── galleria.html         # Galleria fotografica con lightbox interattivo
├── sponsor.html          # Vetrina sponsor e informazioni di sostegno
├── contatti.html         # Modulo contatti, mappa e recapiti societari
│
├── avvia-sito.bat        # Lanciatore rapido con 1 clic per Windows
├── server.ps1            # Script server locale leggero PowerShell (porta 8080)
├── README.md             # Questo manuale di istruzioni
├── .gitignore            # File per escludere file temporanei da Git
│
├── css/
│   └── style.css         # Foglio di stile grafico (colori, layout, animazioni)
│
├── js/
│   └── main.js           # Logica interattiva (menu mobile, filtri, modali, popup)
│
└── assets/
    └── images/           # Immagini del sito, squadre, palazzetto e loghi
```

---

## 🎨 Come Modificare e Personalizzare i Contenuti

- **Testi e Informazioni**: Apri i file `.html` con un qualsiasi editor di testo (Blocco Note, VS Code, Notepad++) e modifica i testi tra i tag HTML.
- **Immagini**: Puoi sostituire le immagini all'interno della cartella `assets/images/` mantenendo lo stesso nome file o aggiornando il percorso nei file `.html`.
- **Colori e Stile**: Tutti i colori principali e le spaziature sono definiti nelle variabili CSS all'inizio del file `css/style.css`.

---

## 💻 Tecnologie Utilizzate

- **HTML5 Semantico**: Struttura accessibile, pulita e ottimizzata SEO.
- **CSS3 Moderno**: Flexbox, CSS Grid, variabili native e micro-animazioni fluide.
- **JavaScript (Vanilla ES6)**: Nessun framework pesante, massima reattività e velocità di caricamento.
- **FontAwesome 6**: Icone sportive e di navigazione.
- **Google Fonts**: Tipografia moderna con i font *Outfit* e *Inter*.

---

*Wellfit Union Sport - Passione, crescita e spirito di squadra.*

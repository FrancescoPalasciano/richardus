---
name: Richardus
description: La trattoria su fondo nero, con fotografie autentiche e accenti caldi.
colors:
  primary: "#d99426"
  primary-foreground: "#28160e"
  accent: "#34230e"
  accent-foreground: "#efbd65"
  olive: "#242b20"
  olive-foreground: "#d8dfc9"
  background: "#000000"
  foreground: "#f5f2ea"
  surface: "#101010"
  surface-secondary: "#1c1c1c"
  surface-elevated: "#151515"
  muted-foreground: "#bcb8af"
  border: "#333333"
  dark: "#111111"
  dark-foreground: "#f5f2ea"
  dark-muted: "#c3c3b7"
  ring: "#d99426"
  overlay: "rgb(24 24 21 / 42%)"
typography:
  display:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "clamp(2.5rem, 4.7vw, 4.9rem)"
    fontWeight: 600
    lineHeight: 1.09
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "clamp(2.1rem, 4vw, 3.8rem)"
    fontWeight: 600
    lineHeight: 1.08
    letterSpacing: "-0.04em"
  title:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "19px"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "-0.025em"
  body:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "13px"
    fontWeight: 600
    lineHeight: 1.4
  editorial-label:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "11px"
    fontWeight: 700
    letterSpacing: "0.1em"
rounded:
  sm: "10px"
  md: "16px"
  lg: "24px"
  xl: "30px"
  pill: "999px"
spacing:
  gutter-mobile: "16px"
  gutter-tablet: "32px"
  gutter-desktop: "40px"
  section: "clamp(64px, 7vw, 112px)"
  grid-compact: "12px"
  grid: "16px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-foreground}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "12px 22px"
  button-primary-hover:
    backgroundColor: "{colors.accent-foreground}"
  button-secondary:
    backgroundColor: "{colors.surface-secondary}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.pill}"
    padding: "12px 22px"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.foreground}"
    rounded: "{rounded.pill}"
    padding: "12px 22px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.foreground}"
    rounded: "{rounded.pill}"
    padding: "12px 22px"
  button-light:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-foreground}"
    rounded: "{rounded.pill}"
    padding: "12px 22px"
  card:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.lg}"
  badge:
    backgroundColor: "{colors.surface-secondary}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.pill}"
    padding: "4px 10px"
  category-active:
    backgroundColor: "{colors.foreground}"
    textColor: "{colors.surface}"
    rounded: "{rounded.pill}"
    padding: "10px 20px"
  navigation:
    backgroundColor: "{colors.background}"
    rounded: "{rounded.pill}"
    padding: "10px 12px 10px 22px"
---

# Design System: Richardus

## Overview

**Creative North Star: "La trattoria, dopo il tramonto"**

Richardus presenta la trattoria su un fondo nero continuo. Testo avorio, controlli color ambra e fotografie reali di ambienti e cucina danno gerarchia alla pagina. Manrope unifica titoli, contenuti e interfaccia; il logo orizzontale fornito conserva l’identità dell’attività.

La composizione alterna fotografie, moduli scuri e informazioni compatte. Titoli a sinistra e azioni esplicite rendono il percorso leggibile nelle cinque lingue. Le entrate sono brevi dissolvenze; il contenuto iniziale rimane visibile prima di JavaScript.

**Key Characteristics:**

- Fondo nero e superfici scure, testo avorio e accenti caldi.
- Manrope unica famiglia dell’interfaccia e logo orizzontale originale.
- Fotografie autentiche, una collocazione per immagine in ogni lingua.
- Navigazione sospesa con Home e selettore IT, EN, FR, DE.
- Gerarchia adattabile alle traduzioni e movimento leggero.

Fonte dei token: `src/app/globals.css`; proporzioni e componenti provengono dai moduli CSS attivi. Il sidecar `.impeccable/design.json` contiene motion, breakpoint e campioni renderizzabili. Le rampe tonali sono anteprime derivate, non nuovi colori dell’interfaccia.

## Colors

Il nero è il fondo condiviso. Le superfici si distinguono attraverso piccole variazioni di luminosità.

### Primary

- **Ambra:** `primary` e `primary-foreground` identificano prenotazione e controlli principali; `ring` rende riconoscibile il focus.
- **Ambra scura:** `accent` e `accent-foreground` formano una coppia per selezione e moduli editoriali.

### Secondary

- **Oliva profondo:** `olive` e `olive-foreground` distinguono moduli gastronomici mantenendo la superficie scura.

### Neutral

- **Nero e carbone:** `background`, `surface`, `surface-secondary` e `surface-elevated` costruiscono livelli coerenti con il brief.
- **Avorio e grigio caldo:** `foreground` e `muted-foreground` separano contenuto principale e descrizioni.
- **Sezioni scure:** `dark`, `dark-foreground` e `dark-muted` definiscono prenotazione e footer.
- **Bordi e sovrapposizioni:** `border` delimita controlli e righe; `overlay` separa il pannello modale dal contenuto sottostante.

**The Contrast Rule.** Conserva le coppie testo/sfondo dei token e verifica anche hover, focus e selezione sul fondo nero.

## Typography

Manrope è l’unica famiglia dell’interfaccia, con fallback Arial e sans-serif. Il file variabile latino locale viene caricato da `AppShell.tsx` tramite `next/font/local`, intervallo 400–700, `display: swap` e fallback adattato. Il lettering del logo appartiene all’asset originale e non è un font dell’interfaccia.

Display serve il titolo principale; headline e title sostengono sezioni e anteprime. Il menu usa nomi da 15px a 17px, prezzi da 13px con numeri tabulari e descrizioni da 13px con interlinea 1.8. I testi introduttivi hanno generalmente misura fra 37ch e 65ch. Le etichette editoriali maiuscole approvate restano brevi. Le traduzioni devono poter andare a capo senza ridurre artificialmente il carattere.

**The One Family Rule.** Mantieni Manrope in tutti i ruoli dell’interfaccia; differenzia la gerarchia con scala, peso, contrasto e spazio.

## Layout

Il contenitore arriva a 1400px. I margini seguono i token gutter: mobile, tablet da 768px e desktop da 1280px. La spaziatura delle sezioni è fluida. Il menu passa da una colonna a due da 600px, poi a tre da 1280px.

La home affianca testo e fotografia da 768px; sui viewport piccoli mostra prima proposta e azioni. Il primo blocco comprende titolo, breve descrizione e due azioni, senza badge, orari o didascalie sulla fotografia. Gli orari hanno una sezione successiva. L’intestazione del menu usa il vino come sfondo e un pannello scuro per il titolo.

I caroselli lasciano intravedere la scheda successiva: piatti all’84% su mobile, 47% da 600px e 30% da 1024px; recensioni all’88%, poi 47% e tre colonne da 1024px. La navigazione desktop appare da 1024px. Le categorie restano sticky con frecce e suggerimento di scorrimento quando necessari.

**The Content First Rule.** Mantieni proposta, prezzi e azioni leggibili a 320px in tutte le lingue; cambia colonne e proporzioni senza nascondere informazioni essenziali.

## Elevation & Depth

Colore e spazio comunicano profondità. L’unica ombra condivisa, `shadow-soft`, compare su navigazione in scorrimento, dock e dialoghi; il valore è nel sidecar. Il titolo del menu usa una superficie scura parzialmente trasparente per mantenere leggibile il testo sulla fotografia.

**The Quiet Depth Rule.** Usa l’ombra condivisa per elementi sospesi; le schede restano superfici scure senza elevazione decorativa.

## Shapes

I raggi sono graduati: sm per controlli minori e tooltip, md per schede menu e didascalie, lg per schede e fotografie, xl per moduli principali. Le pillole definiscono soprattutto azioni, categorie e navigazione. Le fotografie hanno proporzioni dichiarate e ritagli `object-fit: cover`. Il logo orizzontale si appoggia direttamente alla superficie, senza targhetta aggiuntiva.

## Components

### Buttons

Altezza minima 48px; i pulsanti con sola icona misurano 46px. Primary, secondary, outline, ghost e light condividono forma e tipografia. Hover modifica il fondo; la pressione sposta il controllo di 1px. Il focus usa un contorno di 2px separato di 4px; lo stato disabilitato riduce l’opacità e impedisce l’azione. La variante light conserva il nome dell’API ma usa i colori della CTA primaria sul tema scuro.

### Navigation and language selector

Header nero sospeso, logo originale, Home esplicita e selettore Radix con bandiere SVG e lingue IT/EN/FR/DE/ES. Da 1024px mostra link e prenotazione; sotto usa un Sheet Radix con gestione focus e chiusura Escape. Il cambio lingua conserva pagina e hash. Il dock compare dopo lo scorrimento quando la prenotazione non è visibile e il pannello è chiuso; rispetta la safe area inferiore.

### Categories and badges

Le categorie sono Tabs Radix scorribili con stato selezionato avorio, tastiera e URL hash. Frecce e suggerimento aiutano lo scorrimento della barra quando eccede lo spazio. I conteggi sono rimossi dall’interfaccia. Il menu completo rimane nell’HTML iniziale. I badge informativi non devono sembrare pulsanti.

### Cards and editorial modules

Le schede raccolgono proposte del menu e recensioni confrontabili. Fotografie e moduli scuri alternano ritmo e densità. Le immagini hanno un solo contesto per lingua; il logo è riutilizzabile nei punti di identità.

### Disclosures and carousels

Accordion, Dialog, Sheet, Drawer e Tooltip sono primitive Radix personalizzate. Le disclosure attive servono navigazione, allergie, coperto e consenso alla mappa. Embla avanza con trascinamento, pulsanti e frecce della tastiera; non ha autoplay.

Motion applica una sola entrata ai blocchi sotto la piega: dissolvenza da opacità 0 a 1 in 350ms, senza traslazione, a 32px dal bordo inferiore del viewport. Le griglie del menu e della storia rivelano i singoli elementi. Il contenuto iniziale resta subito visibile; senza JavaScript, con movimento ridotto, alla stampa e al focus da tastiera non si attende la dissolvenza. Il cambio categoria dura 200ms con traslazione di 4px. Non esistono campi di prenotazione interni da assumere come pattern.

## Do's and Don'ts

### Do:

- **Do** riutilizzare token e primitive esistenti, verificandoli sul tema nero.
- **Do** conservare logo orizzontale e fotografie originali con proporzioni dichiarate.
- **Do** verificare focus, tastiera e testi nelle cinque lingue da 320px.
- **Do** mantenere prezzi, contatti e conferma della prenotazione leggibili e specifici.

### Don't:

- **Don't** introdurre superfici generali chiare o targhette aggiunte dietro il logo.
- **Don't** aggiungere serif, font script o altre famiglie all’interfaccia.
- **Don't** usare fotografie generate, stock esterno o duplicare le foto nel percorso di una lingua.
- **Don't** copiare asset o composizioni complete di Plate.
- **Don't** subordinare contenuti essenziali ad autoplay, hover o animazioni.

/**
 * scripts/sync-fip.js
 * Script automatico di sincronizzazione della classifica FIP per Wellfit Union Sport
 */

const fs = require('fs');
const path = require('path');

const FIP_API_URL = 'https://backend.fip.it/api/v1/classifica?comitato_codice=PTV&regione_codice=VE&sesso=M&codice_campionato=1DM&codice_fase=1&codice_girone=86006';
const OUTPUT_FILE = path.join(__dirname, '..', 'data', 'classifica-dr3.json');

async function syncFipStandings() {
  console.log(`[FIP Sync] Interrogazione endpoint: ${FIP_API_URL}`);
  
  try {
    const response = await fetch(FIP_API_URL, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'application/json, text/plain, */*'
      },
      signal: AbortSignal.timeout(15000)
    });

    if (!response.ok) {
      throw new Error(`HTTP Error ${response.status}: ${response.statusText}`);
    }

    const rawData = await response.json();
    if (!Array.isArray(rawData) || rawData.length === 0) {
      throw new Error('Dati non validi o array vuoto ricevuto da FIP');
    }

    // Sort by position
    const sorted = [...rawData].sort((a, b) => (a.posizione || 99) - (b.posizione || 99));

    const payload = {
      updated_at: new Date().toISOString(),
      updated_at_formatted: new Intl.DateTimeFormat('it-IT', {
        dateStyle: 'full',
        timeStyle: 'short',
        timeZone: 'Europe/Rome'
      }).format(new Date()),
      championship: 'Divisione Regionale 3',
      girone: 'Girone TV Ovest',
      comitato: 'Treviso (PTV)',
      regione: 'Veneto (VE)',
      codice_campionato: '1DM',
      codice_girone: '86006',
      total_teams: sorted.length,
      standings: sorted.map((team, idx) => ({
        pos: team.posizione || (idx + 1),
        team: team.nome_squadra || '',
        full_name: team.squadra_nome || team.nome_squadra || '',
        city: team.squadra_sede_citta || '',
        fip_code: team.squadra_codice || '',
        points: Number(team.punti_classifica) || 0,
        played: Number(team.disputate) || 0,
        won: Number(team.vinte) || 0,
        lost: Number(team.perse) || 0,
        scored: Number(team.punti_segnati) || 0,
        conceded: Number(team.punti_subiti) || 0,
        diff: (Number(team.punti_segnati) || 0) - (Number(team.punti_subiti) || 0),
        penalties: Number(team.punti_penalita) || 0
      }))
    };

    const dir = path.dirname(OUTPUT_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(payload, null, 2), 'utf-8');
    console.log(`[FIP Sync] Successo! Classifica salvata in: ${OUTPUT_FILE}`);
    console.log(`[FIP Sync] Squadre elaborate: ${payload.total_teams}, Data: ${payload.updated_at_formatted}`);
  } catch (err) {
    console.error(`[FIP Sync] Errore: ${err.message}`);
    process.exit(1);
  }
}

syncFipStandings();

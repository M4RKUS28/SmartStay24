// src/utils/LoadingMessages.js

/**
 * Sammlung kreativer Ladehinweise für SmartStay24
 * Diese Nachrichten erzeugen den Eindruck einer KI, die aktiv
 * durch einen ausgeklügelten Prozess arbeitet, um perfekte Hotelübereinstimmungen zu finden
 */

// Erste Suchphase - die KI beginnt mit der Verarbeitung der Anfrage
export const initialSearchMessages = [
  "Scanne nach perfekten Übereinstimmungen...",
  "Durchsuche Tausende von Hotels für Sie...",
  "Analysiere Ihre Präferenzen...",
  "Aktiviere Hotel-Suchalgorithmen...",
  "Starte personalisierte Hotelsuche...",
  "Ihre Hotelsuche wird gestartet...",
  "Durchsuche globale Hoteldatenbank...",
  "Lese zwischen den Zeilen Ihrer Anfrage...",
  "Bereite mich vor, Ihren idealen Aufenthalt zu finden...",
  "Hotel-Radar aktiviert...",
  "Aktiviere meine Hotelsuche-Neuronen...",
  "Interpretiere Ihre Reisewünsche...",
  "Suche nach verborgenen Hotel-Perlen...",
  "Entschlüssele Ihre perfekten Hotelkriterien...",
  "Übersetze Ihre Bedürfnisse in Hotelmerkmale..."
];

// Verarbeitungsphase - die KI bewertet und vergleicht Optionen
export const processingMessages = [
  "Vergleiche Annehmlichkeiten über Hunderte von Unterkünften...",
  "Bewerte Preis-Leistungs-Verhältnisse...",
  "Vergleiche Standorte mit Ihren Präferenzen...",
  "Filtere Hotels, die Ihrem Stil entsprechen...",
  "Berechne optimale Preis-Qualitäts-Verhältnisse...",
  "Vergleiche Hotelbewertungen für Sie...",
  "Priorisiere Ihre unverzichtbaren Merkmale...",
  "Bewerte die Nähe der Hotels zu Sehenswürdigkeiten...",
  "Überprüfe Verfügbarkeit für Ihre Daten...",
  "Analysiere Bewertungen früherer Gäste...",
  "Wäge Komfortfaktoren gegen Preispunkte ab...",
  "Sichte Tausende von Hoteloptionen...",
  "Prüfe Ausstattungsmerkmale der Hotels...",
  "Gleiche Ihre Kriterien mit verfügbaren Unterkünften ab...",
  "Berechne Entfernung zu wichtigen Sehenswürdigkeiten..."
];

// Verfeinerungsphase - die KI finalisiert und optimiert Ergebnisse
export const refinementMessages = [
  "Optimiere Ergebnisse für Ihre perfekte Übereinstimmung...",
  "Sortiere die besten Ergebnisse für Sie...",
  "Wende finale Präferenzfilter an...",
  "Ordne Hotels nach Relevanz für Ihre Bedürfnisse...",
  "Optimiere Empfehlungen speziell für Sie...",
  "Erstelle maßgeschneiderte Empfehlungen...",
  "Verfeinere die perfekte Hotel-Auswahlliste...",
  "Stelle sicher, dass wir Ihre idealen Optionen gefunden haben...",
  "Füge den letzten Schliff zu Ihren Ergebnissen hinzu...",
  "Die passenden Hotels werden gleich angezeigt...",
  "Bereite Ihre personalisierte Hotelauswahl vor...",
  "Überprüfe die Übereinstimmungsqualität...",
  "Stelle die Top-Empfehlungen zusammen...",
  "Finalisiere Ihre perfekten Hotelübereinstimmungen...",
  "Ordne Empfehlungen nach Relevanz..."
];

// Gelegentliche Spaß-/Persönlichkeitsnachrichten, die zufällig eingestreut werden können
export const personalityMessages = [
  "Jage nach versteckten Hotelschätzen nur für Sie...",
  "Ich flüstere mit den Hotel-Datenbanken...",
  "Meine Hotelfindungskräfte kribbeln...",
  "Trenne die guten von den großartigen Hotels...",
  "Verhandle mit Pixeln, um Ihren perfekten Aufenthalt zu finden...",
  "Consulte die Hotel-Kristallkugel...",
  "Braue die perfekten Hotelempfehlungen...",
  "Frage die Hotelgötter nach ihrer Weisheit...",
  "Denke härter nach als ein Concierge an Silvester...",
  "Mein künstliches Gehirn arbeitet auf Hochtouren..."
];

// Kombiniertes Array mit allen Nachrichten für einfache Zufallsauswahl
export const allLoadingMessages = [
  ...initialSearchMessages,
  ...processingMessages,
  ...refinementMessages,
  ...personalityMessages
];

/**
 * Gibt eine zufällige Ladenachricht zurück
 * @returns {string} Eine zufällige Ladenachricht
 */
export const getRandomMessage = () => {
  const randomIndex = Math.floor(Math.random() * allLoadingMessages.length);
  return allLoadingMessages[randomIndex];
};

/**
 * Gibt eine Sequenz von Ladenachrichten basierend auf der Suchphase zurück
 * @param {number} phase - 0: anfänglich, 1: Verarbeitung, 2: Verfeinerung
 * @returns {string} Eine Ladenachricht, die für die aktuelle Phase geeignet ist
 */
export const getPhaseMessage = (phase) => {
  const phases = [initialSearchMessages, processingMessages, refinementMessages];
  const safePhase = Math.min(Math.max(phase, 0), 2); // Stelle sicher, dass die Phase 0-2 ist
  const messageArray = phases[safePhase];
  const randomIndex = Math.floor(Math.random() * messageArray.length);
  return messageArray[randomIndex];
};
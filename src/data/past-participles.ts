export interface PastParticipleExercise {
  infinitive: string;
  translation: string;
  pastParticiple: string;
  auxiliaryVerb: 'hebben' | 'zijn';
  type: 'regulier' | 'onregelmatig';
  rule?: string;
}

export const pastParticiples: PastParticipleExercise[] = [
  // Regulier - t (stam eindigt op t, k, f, s, ch, p = 't kofschip)
  { infinitive: 'werken', translation: 'to work', pastParticiple: 'gewerkt', auxiliaryVerb: 'hebben', type: 'regulier', rule: "'t kofschip: stam eindigt op -k, dus ge-...-t" },
  { infinitive: 'fietsen', translation: 'to cycle', pastParticiple: 'gefietst', auxiliaryVerb: 'hebben', type: 'regulier', rule: "'t kofschip: stam eindigt op -s, dus ge-...-t" },
  { infinitive: 'koken', translation: 'to cook', pastParticiple: 'gekookt', auxiliaryVerb: 'hebben', type: 'regulier', rule: "'t kofschip: stam eindigt op -k, dus ge-...-t" },
  { infinitive: 'maken', translation: 'to make', pastParticiple: 'gemaakt', auxiliaryVerb: 'hebben', type: 'regulier', rule: "'t kofschip: stam eindigt op -k, dus ge-...-t" },
  { infinitive: 'praten', translation: 'to talk', pastParticiple: 'gepraat', auxiliaryVerb: 'hebben', type: 'regulier', rule: "'t kofschip: stam eindigt op -t, dus ge-...-t" },
  { infinitive: 'wachten', translation: 'to wait', pastParticiple: 'gewacht', auxiliaryVerb: 'hebben', type: 'regulier', rule: "'t kofschip: stam eindigt op -t, dus ge-...-t" },
  { infinitive: 'stoppen', translation: 'to stop', pastParticiple: 'gestopt', auxiliaryVerb: 'hebben', type: 'regulier', rule: "'t kofschip: stam eindigt op -p, dus ge-...-t" },
  { infinitive: 'straffen', translation: 'to punish', pastParticiple: 'gestraft', auxiliaryVerb: 'hebben', type: 'regulier', rule: "'t kofschip: stam eindigt op -f, dus ge-...-t" },
  { infinitive: 'reizen', translation: 'to travel', pastParticiple: 'gereisd', auxiliaryVerb: 'hebben', type: 'regulier', rule: "Stam eindigt niet op 't kofschip, dus ge-...-d" },
  // Regulier - d
  { infinitive: 'wonen', translation: 'to live', pastParticiple: 'gewoond', auxiliaryVerb: 'hebben', type: 'regulier', rule: "Stam eindigt niet op 't kofschip, dus ge-...-d" },
  { infinitive: 'leren', translation: 'to learn', pastParticiple: 'geleerd', auxiliaryVerb: 'hebben', type: 'regulier', rule: "Stam eindigt niet op 't kofschip, dus ge-...-d" },
  { infinitive: 'studeren', translation: 'to study', pastParticiple: 'gestudeerd', auxiliaryVerb: 'hebben', type: 'regulier', rule: "Stam eindigt niet op 't kofschip, dus ge-...-d" },
  { infinitive: 'spelen', translation: 'to play', pastParticiple: 'gespeeld', auxiliaryVerb: 'hebben', type: 'regulier', rule: "Stam eindigt niet op 't kofschip, dus ge-...-d" },
  { infinitive: 'leven', translation: 'to live (life)', pastParticiple: 'geleefd', auxiliaryVerb: 'hebben', type: 'regulier', rule: "Stam eindigt niet op 't kofschip, dus ge-...-d" },
  { infinitive: 'antwoorden', translation: 'to answer', pastParticiple: 'geantwoord', auxiliaryVerb: 'hebben', type: 'regulier', rule: "Stam eindigt niet op 't kofschip, dus ge-...-d" },
  { infinitive: 'horen', translation: 'to hear', pastParticiple: 'gehoord', auxiliaryVerb: 'hebben', type: 'regulier', rule: "Stam eindigt niet op 't kofschip, dus ge-...-d" },
  // Onregelmatig
  { infinitive: 'zijn', translation: 'to be', pastParticiple: 'geweest', auxiliaryVerb: 'zijn', type: 'onregelmatig' },
  { infinitive: 'hebben', translation: 'to have', pastParticiple: 'gehad', auxiliaryVerb: 'hebben', type: 'onregelmatig' },
  { infinitive: 'gaan', translation: 'to go', pastParticiple: 'gegaan', auxiliaryVerb: 'zijn', type: 'onregelmatig' },
  { infinitive: 'komen', translation: 'to come', pastParticiple: 'gekomen', auxiliaryVerb: 'zijn', type: 'onregelmatig' },
  { infinitive: 'doen', translation: 'to do', pastParticiple: 'gedaan', auxiliaryVerb: 'hebben', type: 'onregelmatig' },
  { infinitive: 'zien', translation: 'to see', pastParticiple: 'gezien', auxiliaryVerb: 'hebben', type: 'onregelmatig' },
  { infinitive: 'eten', translation: 'to eat', pastParticiple: 'gegeten', auxiliaryVerb: 'hebben', type: 'onregelmatig' },
  { infinitive: 'drinken', translation: 'to drink', pastParticiple: 'gedronken', auxiliaryVerb: 'hebben', type: 'onregelmatig' },
  { infinitive: 'schrijven', translation: 'to write', pastParticiple: 'geschreven', auxiliaryVerb: 'hebben', type: 'onregelmatig' },
  { infinitive: 'lezen', translation: 'to read', pastParticiple: 'gelezen', auxiliaryVerb: 'hebben', type: 'onregelmatig' },
  { infinitive: 'slapen', translation: 'to sleep', pastParticiple: 'geslapen', auxiliaryVerb: 'hebben', type: 'onregelmatig' },
  { infinitive: 'nemen', translation: 'to take', pastParticiple: 'genomen', auxiliaryVerb: 'hebben', type: 'onregelmatig' },
  { infinitive: 'spreken', translation: 'to speak', pastParticiple: 'gesproken', auxiliaryVerb: 'hebben', type: 'onregelmatig' },
  { infinitive: 'rijden', translation: 'to drive', pastParticiple: 'gereden', auxiliaryVerb: 'hebben', type: 'onregelmatig' },
  { infinitive: 'vinden', translation: 'to find', pastParticiple: 'gevonden', auxiliaryVerb: 'hebben', type: 'onregelmatig' },
  { infinitive: 'beginnen', translation: 'to begin', pastParticiple: 'begonnen', auxiliaryVerb: 'zijn', type: 'onregelmatig' },
  { infinitive: 'vergeten', translation: 'to forget', pastParticiple: 'vergeten', auxiliaryVerb: 'zijn', type: 'onregelmatig' },
  { infinitive: 'lopen', translation: 'to walk', pastParticiple: 'gelopen', auxiliaryVerb: 'hebben', type: 'onregelmatig' },
  { infinitive: 'staan', translation: 'to stand', pastParticiple: 'gestaan', auxiliaryVerb: 'hebben', type: 'onregelmatig' },
  { infinitive: 'zitten', translation: 'to sit', pastParticiple: 'gezeten', auxiliaryVerb: 'hebben', type: 'onregelmatig' },
  { infinitive: 'liggen', translation: 'to lie down', pastParticiple: 'gelegen', auxiliaryVerb: 'hebben', type: 'onregelmatig' },
];

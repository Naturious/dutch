export interface VerbConjugation {
  infinitive: string;
  translation: string;
  type: 'regulier' | 'onregelmatig';
  presens: {
    ik: string;
    jij: string;
    hij: string;
    wij: string;
    jullie: string;
    zij: string;
  };
  imperfectum: {
    ik: string;
    jij: string;
    hij: string;
    wij: string;
    jullie: string;
    zij: string;
  };
  perfectum: {
    hulpwerkwoord: 'hebben' | 'zijn';
    voltooidDeelwoord: string;
  };
}

export const verbs: VerbConjugation[] = [
  {
    infinitive: 'werken',
    translation: 'to work',
    type: 'regulier',
    presens: { ik: 'werk', jij: 'werkt', hij: 'werkt', wij: 'werken', jullie: 'werken', zij: 'werken' },
    imperfectum: { ik: 'werkte', jij: 'werkte', hij: 'werkte', wij: 'werkten', jullie: 'werkten', zij: 'werkten' },
    perfectum: { hulpwerkwoord: 'hebben', voltooidDeelwoord: 'gewerkt' },
  },
  {
    infinitive: 'maken',
    translation: 'to make',
    type: 'regulier',
    presens: { ik: 'maak', jij: 'maakt', hij: 'maakt', wij: 'maken', jullie: 'maken', zij: 'maken' },
    imperfectum: { ik: 'maakte', jij: 'maakte', hij: 'maakte', wij: 'maakten', jullie: 'maakten', zij: 'maakten' },
    perfectum: { hulpwerkwoord: 'hebben', voltooidDeelwoord: 'gemaakt' },
  },
  {
    infinitive: 'wonen',
    translation: 'to live',
    type: 'regulier',
    presens: { ik: 'woon', jij: 'woont', hij: 'woont', wij: 'wonen', jullie: 'wonen', zij: 'wonen' },
    imperfectum: { ik: 'woonde', jij: 'woonde', hij: 'woonde', wij: 'woonden', jullie: 'woonden', zij: 'woonden' },
    perfectum: { hulpwerkwoord: 'hebben', voltooidDeelwoord: 'gewoond' },
  },
  {
    infinitive: 'leren',
    translation: 'to learn',
    type: 'regulier',
    presens: { ik: 'leer', jij: 'leert', hij: 'leert', wij: 'leren', jullie: 'leren', zij: 'leren' },
    imperfectum: { ik: 'leerde', jij: 'leerde', hij: 'leerde', wij: 'leerden', jullie: 'leerden', zij: 'leerden' },
    perfectum: { hulpwerkwoord: 'hebben', voltooidDeelwoord: 'geleerd' },
  },
  {
    infinitive: 'fietsen',
    translation: 'to cycle',
    type: 'regulier',
    presens: { ik: 'fiets', jij: 'fietst', hij: 'fietst', wij: 'fietsen', jullie: 'fietsen', zij: 'fietsen' },
    imperfectum: { ik: 'fietste', jij: 'fietste', hij: 'fietste', wij: 'fietsten', jullie: 'fietsten', zij: 'fietsten' },
    perfectum: { hulpwerkwoord: 'hebben', voltooidDeelwoord: 'gefietst' },
  },
  {
    infinitive: 'reizen',
    translation: 'to travel',
    type: 'regulier',
    presens: { ik: 'reis', jij: 'reist', hij: 'reist', wij: 'reizen', jullie: 'reizen', zij: 'reizen' },
    imperfectum: { ik: 'reisde', jij: 'reisde', hij: 'reisde', wij: 'reisden', jullie: 'reisden', zij: 'reisden' },
    perfectum: { hulpwerkwoord: 'hebben', voltooidDeelwoord: 'gereisd' },
  },
  {
    infinitive: 'koken',
    translation: 'to cook',
    type: 'regulier',
    presens: { ik: 'kook', jij: 'kookt', hij: 'kookt', wij: 'koken', jullie: 'koken', zij: 'koken' },
    imperfectum: { ik: 'kookte', jij: 'kookte', hij: 'kookte', wij: 'kookten', jullie: 'kookten', zij: 'kookten' },
    perfectum: { hulpwerkwoord: 'hebben', voltooidDeelwoord: 'gekookt' },
  },
  {
    infinitive: 'praten',
    translation: 'to talk',
    type: 'regulier',
    presens: { ik: 'praat', jij: 'praat', hij: 'praat', wij: 'praten', jullie: 'praten', zij: 'praten' },
    imperfectum: { ik: 'praatte', jij: 'praatte', hij: 'praatte', wij: 'praatten', jullie: 'praatten', zij: 'praatten' },
    perfectum: { hulpwerkwoord: 'hebben', voltooidDeelwoord: 'gepraat' },
  },
  {
    infinitive: 'betalen',
    translation: 'to pay',
    type: 'regulier',
    presens: { ik: 'betaal', jij: 'betaalt', hij: 'betaalt', wij: 'betalen', jullie: 'betalen', zij: 'betalen' },
    imperfectum: { ik: 'betaalde', jij: 'betaalde', hij: 'betaalde', wij: 'betaalden', jullie: 'betaalden', zij: 'betaalden' },
    perfectum: { hulpwerkwoord: 'hebben', voltooidDeelwoord: 'betaald' },
  },
  {
    infinitive: 'wachten',
    translation: 'to wait',
    type: 'regulier',
    presens: { ik: 'wacht', jij: 'wacht', hij: 'wacht', wij: 'wachten', jullie: 'wachten', zij: 'wachten' },
    imperfectum: { ik: 'wachtte', jij: 'wachtte', hij: 'wachtte', wij: 'wachtten', jullie: 'wachtten', zij: 'wachtten' },
    perfectum: { hulpwerkwoord: 'hebben', voltooidDeelwoord: 'gewacht' },
  },
  {
    infinitive: 'zijn',
    translation: 'to be',
    type: 'onregelmatig',
    presens: { ik: 'ben', jij: 'bent', hij: 'is', wij: 'zijn', jullie: 'zijn', zij: 'zijn' },
    imperfectum: { ik: 'was', jij: 'was', hij: 'was', wij: 'waren', jullie: 'waren', zij: 'waren' },
    perfectum: { hulpwerkwoord: 'zijn', voltooidDeelwoord: 'geweest' },
  },
  {
    infinitive: 'hebben',
    translation: 'to have',
    type: 'onregelmatig',
    presens: { ik: 'heb', jij: 'hebt', hij: 'heeft', wij: 'hebben', jullie: 'hebben', zij: 'hebben' },
    imperfectum: { ik: 'had', jij: 'had', hij: 'had', wij: 'hadden', jullie: 'hadden', zij: 'hadden' },
    perfectum: { hulpwerkwoord: 'hebben', voltooidDeelwoord: 'gehad' },
  },
  {
    infinitive: 'gaan',
    translation: 'to go',
    type: 'onregelmatig',
    presens: { ik: 'ga', jij: 'gaat', hij: 'gaat', wij: 'gaan', jullie: 'gaan', zij: 'gaan' },
    imperfectum: { ik: 'ging', jij: 'ging', hij: 'ging', wij: 'gingen', jullie: 'gingen', zij: 'gingen' },
    perfectum: { hulpwerkwoord: 'zijn', voltooidDeelwoord: 'gegaan' },
  },
  {
    infinitive: 'komen',
    translation: 'to come',
    type: 'onregelmatig',
    presens: { ik: 'kom', jij: 'komt', hij: 'komt', wij: 'komen', jullie: 'komen', zij: 'komen' },
    imperfectum: { ik: 'kwam', jij: 'kwam', hij: 'kwam', wij: 'kwamen', jullie: 'kwamen', zij: 'kwamen' },
    perfectum: { hulpwerkwoord: 'zijn', voltooidDeelwoord: 'gekomen' },
  },
  {
    infinitive: 'doen',
    translation: 'to do',
    type: 'onregelmatig',
    presens: { ik: 'doe', jij: 'doet', hij: 'doet', wij: 'doen', jullie: 'doen', zij: 'doen' },
    imperfectum: { ik: 'deed', jij: 'deed', hij: 'deed', wij: 'deden', jullie: 'deden', zij: 'deden' },
    perfectum: { hulpwerkwoord: 'hebben', voltooidDeelwoord: 'gedaan' },
  },
  {
    infinitive: 'zien',
    translation: 'to see',
    type: 'onregelmatig',
    presens: { ik: 'zie', jij: 'ziet', hij: 'ziet', wij: 'zien', jullie: 'zien', zij: 'zien' },
    imperfectum: { ik: 'zag', jij: 'zag', hij: 'zag', wij: 'zagen', jullie: 'zagen', zij: 'zagen' },
    perfectum: { hulpwerkwoord: 'hebben', voltooidDeelwoord: 'gezien' },
  },
  {
    infinitive: 'eten',
    translation: 'to eat',
    type: 'onregelmatig',
    presens: { ik: 'eet', jij: 'eet', hij: 'eet', wij: 'eten', jullie: 'eten', zij: 'eten' },
    imperfectum: { ik: 'at', jij: 'at', hij: 'at', wij: 'aten', jullie: 'aten', zij: 'aten' },
    perfectum: { hulpwerkwoord: 'hebben', voltooidDeelwoord: 'gegeten' },
  },
  {
    infinitive: 'drinken',
    translation: 'to drink',
    type: 'onregelmatig',
    presens: { ik: 'drink', jij: 'drinkt', hij: 'drinkt', wij: 'drinken', jullie: 'drinken', zij: 'drinken' },
    imperfectum: { ik: 'dronk', jij: 'dronk', hij: 'dronk', wij: 'dronken', jullie: 'dronken', zij: 'dronken' },
    perfectum: { hulpwerkwoord: 'hebben', voltooidDeelwoord: 'gedronken' },
  },
  {
    infinitive: 'schrijven',
    translation: 'to write',
    type: 'onregelmatig',
    presens: { ik: 'schrijf', jij: 'schrijft', hij: 'schrijft', wij: 'schrijven', jullie: 'schrijven', zij: 'schrijven' },
    imperfectum: { ik: 'schreef', jij: 'schreef', hij: 'schreef', wij: 'schreven', jullie: 'schreven', zij: 'schreven' },
    perfectum: { hulpwerkwoord: 'hebben', voltooidDeelwoord: 'geschreven' },
  },
  {
    infinitive: 'lezen',
    translation: 'to read',
    type: 'onregelmatig',
    presens: { ik: 'lees', jij: 'leest', hij: 'leest', wij: 'lezen', jullie: 'lezen', zij: 'lezen' },
    imperfectum: { ik: 'las', jij: 'las', hij: 'las', wij: 'lazen', jullie: 'lazen', zij: 'lazen' },
    perfectum: { hulpwerkwoord: 'hebben', voltooidDeelwoord: 'gelezen' },
  },
  {
    infinitive: 'slapen',
    translation: 'to sleep',
    type: 'onregelmatig',
    presens: { ik: 'slaap', jij: 'slaapt', hij: 'slaapt', wij: 'slapen', jullie: 'slapen', zij: 'slapen' },
    imperfectum: { ik: 'sliep', jij: 'sliep', hij: 'sliep', wij: 'sliepen', jullie: 'sliepen', zij: 'sliepen' },
    perfectum: { hulpwerkwoord: 'hebben', voltooidDeelwoord: 'geslapen' },
  },
  {
    infinitive: 'nemen',
    translation: 'to take',
    type: 'onregelmatig',
    presens: { ik: 'neem', jij: 'neemt', hij: 'neemt', wij: 'nemen', jullie: 'nemen', zij: 'nemen' },
    imperfectum: { ik: 'nam', jij: 'nam', hij: 'nam', wij: 'namen', jullie: 'namen', zij: 'namen' },
    perfectum: { hulpwerkwoord: 'hebben', voltooidDeelwoord: 'genomen' },
  },
  {
    infinitive: 'spreken',
    translation: 'to speak',
    type: 'onregelmatig',
    presens: { ik: 'spreek', jij: 'spreekt', hij: 'spreekt', wij: 'spreken', jullie: 'spreken', zij: 'spreken' },
    imperfectum: { ik: 'sprak', jij: 'sprak', hij: 'sprak', wij: 'spraken', jullie: 'spraken', zij: 'spraken' },
    perfectum: { hulpwerkwoord: 'hebben', voltooidDeelwoord: 'gesproken' },
  },
  {
    infinitive: 'rijden',
    translation: 'to drive',
    type: 'onregelmatig',
    presens: { ik: 'rijd', jij: 'rijdt', hij: 'rijdt', wij: 'rijden', jullie: 'rijden', zij: 'rijden' },
    imperfectum: { ik: 'reed', jij: 'reed', hij: 'reed', wij: 'reden', jullie: 'reden', zij: 'reden' },
    perfectum: { hulpwerkwoord: 'hebben', voltooidDeelwoord: 'gereden' },
  },
  {
    infinitive: 'vinden',
    translation: 'to find',
    type: 'onregelmatig',
    presens: { ik: 'vind', jij: 'vindt', hij: 'vindt', wij: 'vinden', jullie: 'vinden', zij: 'vinden' },
    imperfectum: { ik: 'vond', jij: 'vond', hij: 'vond', wij: 'vonden', jullie: 'vonden', zij: 'vonden' },
    perfectum: { hulpwerkwoord: 'hebben', voltooidDeelwoord: 'gevonden' },
  },
];

export interface SeparableVerbExercise {
  id: number;
  verb: string;
  prefix: string;
  stem: string;
  translation: string;
  exercises: {
    tense: string;
    sentence: string;
    answer: string;
    hint?: string;
  }[];
}

export const separableVerbs: SeparableVerbExercise[] = [
  {
    verb: 'opbellen',
    prefix: 'op',
    stem: 'bellen',
    translation: 'to call (phone)',
    id: 1,
    exercises: [
      {
        tense: 'Presens',
        sentence: 'Ik ___ mijn moeder ___.',
        answer: 'Ik bel mijn moeder op.',
        hint: 'In de presens gaat het prefix naar het einde.',
      },
      {
        tense: 'Perfectum',
        sentence: 'Ik heb mijn moeder ___.',
        answer: 'Ik heb mijn moeder opgebeld.',
        hint: 'In het perfectum: prefix + ge + stam + t/d',
      },
    ],
  },
  {
    verb: 'aankomen',
    prefix: 'aan',
    stem: 'komen',
    translation: 'to arrive',
    id: 2,
    exercises: [
      {
        tense: 'Presens',
        sentence: 'De trein ___ om drie uur ___.',
        answer: 'De trein komt om drie uur aan.',
      },
      {
        tense: 'Perfectum',
        sentence: 'De trein is om drie uur ___.',
        answer: 'De trein is om drie uur aangekomen.',
      },
    ],
  },
  {
    verb: 'meenemen',
    prefix: 'mee',
    stem: 'nemen',
    translation: 'to take along',
    id: 3,
    exercises: [
      {
        tense: 'Presens',
        sentence: 'Ik ___ mijn paraplu ___.',
        answer: 'Ik neem mijn paraplu mee.',
      },
      {
        tense: 'Perfectum',
        sentence: 'Ik heb mijn paraplu ___.',
        answer: 'Ik heb mijn paraplu meegenomen.',
      },
    ],
  },
  {
    verb: 'opstaan',
    prefix: 'op',
    stem: 'staan',
    translation: 'to get up',
    id: 4,
    exercises: [
      {
        tense: 'Presens',
        sentence: 'Ik ___ elke dag om zeven uur ___.',
        answer: 'Ik sta elke dag om zeven uur op.',
      },
      {
        tense: 'Perfectum',
        sentence: 'Ik ben om zeven uur ___.',
        answer: 'Ik ben om zeven uur opgestaan.',
      },
    ],
  },
  {
    verb: 'afwassen',
    prefix: 'af',
    stem: 'wassen',
    translation: 'to do the dishes',
    id: 5,
    exercises: [
      {
        tense: 'Presens',
        sentence: 'Zij ___ elke avond ___.',
        answer: 'Zij wast elke avond af.',
      },
      {
        tense: 'Perfectum',
        sentence: 'Zij heeft gisteren ___.',
        answer: 'Zij heeft gisteren afgewassen.',
      },
    ],
  },
  {
    verb: 'uitnodigen',
    prefix: 'uit',
    stem: 'nodigen',
    translation: 'to invite',
    id: 6,
    exercises: [
      {
        tense: 'Presens',
        sentence: 'Wij ___ onze vrienden ___.',
        answer: 'Wij nodigen onze vrienden uit.',
      },
      {
        tense: 'Perfectum',
        sentence: 'Wij hebben onze vrienden ___.',
        answer: 'Wij hebben onze vrienden uitgenodigd.',
      },
    ],
  },
  {
    verb: 'terugkomen',
    prefix: 'terug',
    stem: 'komen',
    translation: 'to come back',
    id: 7,
    exercises: [
      {
        tense: 'Presens',
        sentence: 'Hij ___ morgen ___.',
        answer: 'Hij komt morgen terug.',
      },
      {
        tense: 'Perfectum',
        sentence: 'Hij is gisteren ___.',
        answer: 'Hij is gisteren teruggekomen.',
      },
    ],
  },
  {
    verb: 'opruimen',
    prefix: 'op',
    stem: 'ruimen',
    translation: 'to tidy up',
    id: 8,
    exercises: [
      {
        tense: 'Presens',
        sentence: 'De kinderen ___ hun kamer ___.',
        answer: 'De kinderen ruimen hun kamer op.',
      },
      {
        tense: 'Perfectum',
        sentence: 'De kinderen hebben hun kamer ___.',
        answer: 'De kinderen hebben hun kamer opgeruimd.',
      },
    ],
  },
  {
    verb: 'voorstellen',
    prefix: 'voor',
    stem: 'stellen',
    translation: 'to introduce / to propose',
    id: 9,
    exercises: [
      {
        tense: 'Presens',
        sentence: 'Ik ___ mij even ___.',
        answer: 'Ik stel mij even voor.',
      },
      {
        tense: 'Perfectum',
        sentence: 'Ik heb mij ___.',
        answer: 'Ik heb mij voorgesteld.',
      },
    ],
  },
  {
    verb: 'binnenkomen',
    prefix: 'binnen',
    stem: 'komen',
    translation: 'to come in',
    id: 10,
    exercises: [
      {
        tense: 'Presens',
        sentence: 'De leraar ___ de klas ___.',
        answer: 'De leraar komt de klas binnen.',
      },
      {
        tense: 'Perfectum',
        sentence: 'De leraar is de klas ___.',
        answer: 'De leraar is de klas binnengekomen.',
      },
    ],
  },
  {
    verb: 'uitzetten',
    prefix: 'uit',
    stem: 'zetten',
    translation: 'to turn off',
    id: 11,
    exercises: [
      {
        tense: 'Presens',
        sentence: 'Ik ___ de televisie ___.',
        answer: 'Ik zet de televisie uit.',
      },
      {
        tense: 'Perfectum',
        sentence: 'Ik heb de televisie ___.',
        answer: 'Ik heb de televisie uitgezet.',
      },
    ],
  },
  {
    verb: 'aandoen',
    prefix: 'aan',
    stem: 'doen',
    translation: 'to put on (clothes) / to turn on',
    id: 12,
    exercises: [
      {
        tense: 'Presens',
        sentence: 'Zij ___ haar jas ___.',
        answer: 'Zij doet haar jas aan.',
      },
      {
        tense: 'Perfectum',
        sentence: 'Zij heeft haar jas ___.',
        answer: 'Zij heeft haar jas aangedaan.',
      },
    ],
  },
];

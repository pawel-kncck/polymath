// AUTO-GENERATED from src/content/modules/general-knowledge.ts.
// Bank file — the module config now reads from this. Edit question text here.

import type { ContentItem } from '../types';

export const GENERAL_KNOWLEDGE_TOPIC = 'GENERAL_KNOWLEDGE';

export const generalKnowledgeBank = {
  id: 'general-knowledge',
  items: [
    {
      "id": "general-knowledge-01",
      "type": "SINGLE_CHOICE",
      "content": {
        "prompt": {
          "pl": "Która planeta jest najbliżej Słońca?",
          "en": "Which planet is closest to the Sun?"
        },
        "options": {
          "pl": [
            "Wenus",
            "Merkury",
            "Ziemia",
            "Mars"
          ],
          "en": [
            "Venus",
            "Mercury",
            "Earth",
            "Mars"
          ]
        },
        "answer": {
          "pl": "Merkury",
          "en": "Mercury"
        }
      },
      "topic": "GENERAL_KNOWLEDGE"
    },
    {
      "id": "general-knowledge-02",
      "type": "SINGLE_CHOICE",
      "content": {
        "prompt": {
          "pl": "Ile jest kontynentów?",
          "en": "How many continents are there?"
        },
        "options": {
          "pl": [
            "5",
            "6",
            "7",
            "8"
          ],
          "en": [
            "5",
            "6",
            "7",
            "8"
          ]
        },
        "answer": {
          "pl": "7",
          "en": "7"
        }
      },
      "topic": "GENERAL_KNOWLEDGE"
    },
    {
      "id": "general-knowledge-03",
      "type": "SINGLE_CHOICE",
      "content": {
        "prompt": {
          "pl": "Który ocean jest największy na Ziemi?",
          "en": "What is the largest ocean on Earth?"
        },
        "options": {
          "pl": [
            "Atlantycki",
            "Indyjski",
            "Arktyczny",
            "Spokojny"
          ],
          "en": [
            "Atlantic",
            "Indian",
            "Arctic",
            "Pacific"
          ]
        },
        "answer": {
          "pl": "Spokojny",
          "en": "Pacific"
        }
      },
      "topic": "GENERAL_KNOWLEDGE"
    },
    {
      "id": "general-knowledge-04",
      "type": "SINGLE_CHOICE",
      "content": {
        "prompt": {
          "pl": "Który gaz jest pochłaniany przez rośliny w procesie fotosyntezy?",
          "en": "Which gas do plants absorb from the air for photosynthesis?"
        },
        "options": {
          "pl": [
            "Tlen",
            "Azot",
            "Dwutlenek węgla",
            "Wodór"
          ],
          "en": [
            "Oxygen",
            "Nitrogen",
            "Carbon dioxide",
            "Hydrogen"
          ]
        },
        "answer": {
          "pl": "Dwutlenek węgla",
          "en": "Carbon dioxide"
        },
        "hint": {
          "pl": "Ludzie go wydychają",
          "en": "Humans breathe it out"
        }
      },
      "topic": "GENERAL_KNOWLEDGE"
    },
    {
      "id": "general-knowledge-05",
      "type": "SINGLE_CHOICE",
      "content": {
        "prompt": {
          "pl": "Kto namalował obraz Mona Lisa?",
          "en": "Who painted the Mona Lisa?"
        },
        "options": {
          "pl": [
            "Michał Anioł",
            "Leonardo da Vinci",
            "Rafael",
            "Donatello"
          ],
          "en": [
            "Michelangelo",
            "Leonardo da Vinci",
            "Raphael",
            "Donatello"
          ]
        },
        "answer": {
          "pl": "Leonardo da Vinci",
          "en": "Leonardo da Vinci"
        }
      },
      "topic": "GENERAL_KNOWLEDGE"
    },
  ] satisfies ContentItem[],
};

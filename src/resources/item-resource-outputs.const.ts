/* eslint-disable prettier/prettier */
import { v4 as uuidv4 } from 'uuid';

export const ITEM_RESOURCE_OUTPUTS = [
  { id: uuidv4(), item_id: 1, name: 'power', token_name: 'POWER', amount_per_ep: 0.0028 },
  { id: uuidv4(), item_id: 2, name: 'power', token_name: 'POWER', amount_per_ep: 0.0030 },
  { id: uuidv4(), item_id: 3, name: 'power', token_name: 'POWER', amount_per_ep: 0.0032 },

  { id: uuidv4(), item_id: 4, name: 'water', token_name: 'WATER', amount_per_ep: 0.0023 },
  { id: uuidv4(), item_id: 37, name: 'water', token_name: 'WATER', amount_per_ep: 0.0050 },

  { id: uuidv4(), item_id: 5, name: 'wellbeing', token_name: 'WELLBNG', amount_per_ep: 0.0023 },
  { id: uuidv4(), item_id: 40, name: 'wellbeing', token_name: 'WELLBNG', amount_per_ep: 0.0050 },
  { id: uuidv4(), item_id: 41, name: 'wellbeing', token_name: 'WELLBNG', amount_per_ep: 0.0050 },
  { id: uuidv4(), item_id: 42, name: 'wellbeing', token_name: 'WELLBNG', amount_per_ep: 0.0052 },
  { id: uuidv4(), item_id: 54, name: 'wellbeing', token_name: 'WELLBNG', amount_per_ep: 0.0060 },

  { id: uuidv4(), item_id: 6, name: 'regolith', token_name: 'REGOLTH', amount_per_ep: 0.0013 },
  { id: uuidv4(), item_id: 7, name: 'regolith', token_name: 'REGOLTH', amount_per_ep: 0.0023 },
  { id: uuidv4(), item_id: 49, name: 'regolith', token_name: 'REGOLTH', amount_per_ep: 0.0012 },

  { id: uuidv4(), item_id: 6, name: 'construction materials', token_name: 'CONSTRN', amount_per_ep: 0.0005 },
  { id: uuidv4(), item_id: 19, name: 'construction materials', token_name: 'CONSTRN', amount_per_ep: 0.0015 },
  { id: uuidv4(), item_id: 29, name: 'construction materials', token_name: 'CONSTRN', amount_per_ep: 0.0003 },
  { id: uuidv4(), item_id: 30, name: 'construction materials', token_name: 'CONSTRN', amount_per_ep: 0.0003 },
  { id: uuidv4(), item_id: 45, name: 'construction materials', token_name: 'CONSTRN', amount_per_ep: 0.0026 },
  { id: uuidv4(), item_id: 51, name: 'construction materials', token_name: 'CONSTRN', amount_per_ep: 0.0011 },
  { id: uuidv4(), item_id: 52, name: 'construction materials', token_name: 'CONSTRN', amount_per_ep: 0.0011 },
  { id: uuidv4(), item_id: 53, name: 'construction materials', token_name: 'CONSTRN', amount_per_ep: 0.0030 },

  { id: uuidv4(), item_id: 20, name: 'food', token_name: 'FOOD', amount_per_ep: 0.0020 },
  { id: uuidv4(), item_id: 25, name: 'food', token_name: 'FOOD', amount_per_ep: 0.0005 },
  { id: uuidv4(), item_id: 26, name: 'food', token_name: 'FOOD', amount_per_ep: 0.0005 },
  { id: uuidv4(), item_id: 44, name: 'food', token_name: 'FOOD', amount_per_ep: 0.0030 },
  { id: uuidv4(), item_id: 55, name: 'food', token_name: 'FOOD', amount_per_ep: 0.0040 },

  { id: uuidv4(), item_id: 18, name: 'oxygen', token_name: 'OXYGEN', amount_per_ep: 0.0004 },
  { id: uuidv4(), item_id: 39, name: 'oxygen', token_name: 'OXYGEN', amount_per_ep: 0.0006 },
  { id: uuidv4(), item_id: 44, name: 'oxygen', token_name: 'OXYGEN', amount_per_ep: 0.0003 },
  { id: uuidv4(), item_id: 48, name: 'oxygen', token_name: 'OXYGEN', amount_per_ep: 0.0030 },
  { id: uuidv4(), item_id: 55, name: 'oxygen', token_name: 'OXYGEN', amount_per_ep: 0.0005 },

  { id: uuidv4(), item_id: 18, name: 'fuel', token_name: 'FUEL', amount_per_ep: 0.0006 },
  { id: uuidv4(), item_id: 39, name: 'fuel', token_name: 'FUEL', amount_per_ep: 0.0012 },

  { id: uuidv4(), item_id: 21, name: 'engineer lab', token_name: 'ENGLAB', amount_per_ep: 0.0011 },
  { id: uuidv4(), item_id: 22, name: 'engineer lab', token_name: 'ENGLAB', amount_per_ep: 0.0011 },
  { id: uuidv4(), item_id: 29, name: 'engineer lab', token_name: 'ENGLAB', amount_per_ep: 0.0009 },
  { id: uuidv4(), item_id: 30, name: 'engineer lab', token_name: 'ENGLAB', amount_per_ep: 0.0009 },
  { id: uuidv4(), item_id: 33, name: 'engineer lab', token_name: 'ENGLAB', amount_per_ep: 0.0002 },
  { id: uuidv4(), item_id: 34, name: 'engineer lab', token_name: 'ENGLAB', amount_per_ep: 0.0002 },

  { id: uuidv4(), item_id: 23, name: 'science labor', token_name: 'SCILAB', amount_per_ep: 0.0011 },
  { id: uuidv4(), item_id: 24, name: 'science labor', token_name: 'SCILAB', amount_per_ep: 0.0011 },
  { id: uuidv4(), item_id: 25, name: 'science labor', token_name: 'SCILAB', amount_per_ep: 0.0009 },
  { id: uuidv4(), item_id: 26, name: 'science labor', token_name: 'SCILAB', amount_per_ep: 0.0009 },
  { id: uuidv4(), item_id: 31, name: 'science labor', token_name: 'SCILAB', amount_per_ep: 0.0002 },
  { id: uuidv4(), item_id: 32, name: 'science labor', token_name: 'SCILAB', amount_per_ep: 0.0002 },

  { id: uuidv4(), item_id: 27, name: 'social labor', token_name: 'SOCLAB', amount_per_ep: 0.0009 },
  { id: uuidv4(), item_id: 28, name: 'social labor', token_name: 'SOCLAB', amount_per_ep: 0.0009 },
  { id: uuidv4(), item_id: 35, name: 'social labor', token_name: 'SOCLAB', amount_per_ep: 0.0011 },
  { id: uuidv4(), item_id: 36, name: 'social labor', token_name: 'SOCLAB', amount_per_ep: 0.0011 },

  { id: uuidv4(), item_id: 31, name: 'logistic labor', token_name: 'LOGLAB', amount_per_ep: 0.0009 },
  { id: uuidv4(), item_id: 32, name: 'logistic labor', token_name: 'LOGLAB', amount_per_ep: 0.0009 },
  { id: uuidv4(), item_id: 33, name: 'logistic labor', token_name: 'LOGLAB', amount_per_ep: 0.0009 },
  { id: uuidv4(), item_id: 34, name: 'logistic labor', token_name: 'LOGLAB', amount_per_ep: 0.0009 },

  { id: uuidv4(), item_id: 46, name: 'repairs', token_name: 'REPAIR', amount_per_ep: 0.0013 },
  { id: uuidv4(), item_id: 47, name: 'repairs', token_name: 'REPAIR', amount_per_ep: 0.0013 },
  { id: uuidv4(), item_id: 51, name: 'repairs', token_name: 'REPAIR', amount_per_ep: 0.0008 },

  { id: uuidv4(), item_id: 27, name: 'medicine', token_name: 'MEDICINE', amount_per_ep: 0.0002 },
  { id: uuidv4(), item_id: 28, name: 'medicine', token_name: 'MEDICINE', amount_per_ep: 0.0002 },
  { id: uuidv4(), item_id: 43, name: 'medicine', token_name: 'MEDICINE', amount_per_ep: 0.0010 },
  { id: uuidv4(), item_id: 52, name: 'medicine', token_name: 'MEDICINE', amount_per_ep: 0.0008 },

  { id: uuidv4(), item_id: 8, name: 'data', token_name: 'DATA', amount_per_ep: 0.0005 },
  { id: uuidv4(), item_id: 38, name: 'data', token_name: 'DATA', amount_per_ep: 0.0013 },
  { id: uuidv4(), item_id: 43, name: 'data', token_name: 'DATA', amount_per_ep: 0.0003 },
  { id: uuidv4(), item_id: 50, name: 'data', token_name: 'DATA', amount_per_ep: 0.0013 },

  { id: uuidv4(), item_id: 49, name: 'ore', token_name: 'ORE', amount_per_ep: 0.0010 },
];

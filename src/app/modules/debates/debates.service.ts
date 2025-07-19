import { IDebate } from './debates.interface';
import { Debate } from './debates.model';
// reate debate
const createDebateIntoDB = async (payload: IDebate) => {
  const debate = await Debate.create(payload);
  return debate;
};

export const debateService = {
  createDebateIntoDB,
};

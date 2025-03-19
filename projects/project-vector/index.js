import { bound } from '@aryth/bound-vector/dist/index.js';
import { Projector } from '@aryth/projector';

/**
 *
 * @param {*[]} vec
 * @param {number} max
 * @param {number} min
 * @return {number[]}
 */
const project = function (vec, { max, min } = {}) {
  /** @type {{level:number,max:number,min:number}} */ const config = this ?? {};
  max = max ?? config.max;
  min = min ?? config.min;
  const projector = Projector(bound.call(config, vec), { max, min });
  return vec.map(projector)
};

const Project = ({ max, min, level }) => project.bind({ max, min, level });

export { Project, project };

/**
 * Created by hungvo on 04/05/2017.
 */
import {unaccentVietnamese} from './vn';

// Paul Williams Smith becomes 'PS'
export const initials = (str, cap = true) => {
  if (!str) return '';

  const tmp = str.split(' ');
  const first = tmp[0][0];
  let last = '';
  if (tmp.length > 1) {
    last = tmp[tmp.length - 1][0];
  }
  let ret = `${first}${last}`;
  if (cap) ret = ret.toUpperCase();
  return ret;
};

// https://gist.github.com/mathewbyrne/1280286
export const slugify = (text, transformToCase /* 'lower' or 'upper' */) => {
  if (!text) return '';


  const ret = unaccentVietnamese(text)
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^a-z0-9A-Z_\.@]/g, '-') // all non-chars & non [._@] to -
    // .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, ''); // Trim - from start of text
  // .replace(/-+$/, '');            // Trim - from end of text

  if (transformToCase === 'lower') return ret.toLowerCase();
  else if (transformToCase === 'upper') return ret.toUpperCase();
  return ret;
};

export default class Slug {
  static get(value: string) {
    return slugify(value, 'lower');
  }
}
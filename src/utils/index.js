export * from './ssr';

import Cookies from 'universal-cookie';
const cookies = new Cookies();

export const upVote = item => {
  const upvotes = cookies.get("upvotes");
  let _upvotes = upvotes || [];

  const index = _upvotes.indexOf(item.id);
  if (index !== -1) {
    _upvotes.splice(index, 1);
  } else {
    _upvotes.push(item.id);    
  }
  _upvotes = _upvotes.filter(onlyUnique);
  cookies.set("upvotes", JSON.stringify(_upvotes));  
};

export const isVoted = item => {
  const upVote = cookies.get("upvotes");
  if (!upVote) {
    return false;
  }
  return (upVote.indexOf(item.id)) >= 0 ? true : false;
};

export const itemExist = item => {
  const hiddens = cookies.get("hiddens");
  if (!hiddens) {
    return false;
  }
  return (hiddens.indexOf(item.id)) >= 0 ? true : false;
};

export const hideItem = _item => {
  const hiddens = cookies.get("hiddens");
  let _hiddens = hiddens || [];
  _hiddens.push(_item.id);
  _hiddens = _hiddens.filter(onlyUnique);
  cookies.set("hiddens", JSON.stringify(_hiddens));
};

export const host = url => {
  const host = url.replace(/^https?:\/\//, '').replace(/\/.*$/, '');
  const parts = host.split('.').slice(-3);
  if (parts[0] === 'www') parts.shift();
  return parts.join('.');
};

export const timeAgo = time => {
  const between = Date.now() / 1000 - Number(time);
  if (between < 3600) {
    return pluralize(~~(between / 60), ' minute');
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), ' hour');
  } else {
    return pluralize(~~(between / 86400), ' day');
  }
}

const onlyUnique = (value, index, self) => (self.indexOf(value) === index);

const pluralize = (time, label) => {
  if (time === 1) {
    return time + label;
  }
  return time + label + 's';
};

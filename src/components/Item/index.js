import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { 
  withSsr, host, timeAgo, hideItem, itemExist, upVote, isVoted
} from 'utils';
import { startCase } from 'lodash';

import styles from './styles';

const show = (item, _voted) => (
  <li className="news-item">
    <span className="score">{_voted ? parseInt(item.score) + 1 : item.score}</span>
    <span className="title">
      <Link onClick={() => upVote(item)} className="vote">{_voted ? "\u25B2" : "\u25B3"}</Link> 
      {' '}{item.url ? (
        <>
          <a href={item.url} target="_blank" rel="noopener noreferrer">
            {item.title}
          </a>
          <span className="host"> ({host(item.url)})</span>
        </>
      ) : (
        <Link to={'/item/' + item.id}>{item.title}</Link>
      )}
    </span>
    <br />
    <span className="meta">
      {item.type !== 'job' ? (
        <span className="by">
          by <Link to={'/user/' + item.by}>{item.by}</Link> {' '} | {' '}
        </span>
      ) : null}
      <span className="time">{timeAgo(item.time)} ago</span>
      {' '} | {' '}
      <span className="comments-link">
        <Link onClick={() => hideItem(item)}>Hide</Link>
      </span>
      {item.type !== 'job' ? (
        <span className="comments-link">
          {' '}
          | <Link to={'/item/' + item.id}>{item.descendants} Comments</Link>
        </span>
      ) : null}
    </span>
    {item.type !== 'story' ? (
      <span className="meta">{' | ' + startCase(item.type)}</span>
    ) : null}
  </li>
);

const Item = ({ item }) => {
  const _voted = isVoted(item);
  return itemExist(item) ? null : show (item, _voted);
};

Item.propTypes = {
  item: PropTypes.object.isRequired,
};

export default withSsr(styles, true)(Item);

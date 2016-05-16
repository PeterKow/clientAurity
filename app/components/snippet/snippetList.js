/**
 * Created by Peter on 30/08/15.
 */
import React, { PropTypes } from 'react'
import Snippet from './snippet.js'
import { syncTweet } from 'businessLogic/firebase/firebase'
import LoadingIndicator from 'components/LoadingIndicator'
import { completeSnippet } from 'businessLogic/snippets/snippets.actions'

export default function SnippetList({ dispatch, snippetList, isFetching }) {
  return (
    isFetching ?
    <LoadingIndicator /> :
    <ul style={{ WebkitPaddingStart: '0em' }}>
      {snippetList.map((miniArticle, index) =>
        <Snippet {...miniArticle}
          key={index}
          onClick={() => dispatch(completeSnippet(miniArticle.id_str))}
          onThumbDown={() => syncTweet(setThumbDown(miniArticle))}
          onThumbUp={() => syncTweet(setThumbUp(miniArticle))}
          onStared={() => syncTweet(setStar(miniArticle))}
          saveTags={(tags) => syncTweet(setTags(tags, miniArticle))}
        />
      )}
    </ul>
  );
}

SnippetList.propTypes = {
  onSnippetClick: PropTypes.func,
  snippetList: PropTypes.object.isRequired,
  isFetching: PropTypes.bool.isRequired,
}

// TODO refactor to actions
function setThumbUp(snippet) {
  return {
    ...snippet,
    thumbDown: false,
    thumbUp: true,
  }
}

function setThumbDown(snippet) {
  return {
    ...snippet,
    thumbDown: true,
    thumbUp: false,
  }
}

function setStar(snippet) {
  return {
    ...snippet,
    stared: !snippet.stared,
  }
}

function setTags(tags, snippet) {
  return {
    ...snippet,
    tags,
  }
}

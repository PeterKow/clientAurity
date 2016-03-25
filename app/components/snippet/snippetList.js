/**
 * Created by Peter on 30/08/15.
 */
import React, { PropTypes } from 'react'
import Snippet from './snippet.js'
import { syncTweet, saveTags } from 'businessLogic/firebase/firebase'

export default function SnippetList({ onSnippetClick, snippetList }) {
  return (
    <ul style={{ WebkitPaddingStart: '0em' }}>
      {snippetList.map((miniArticle, index) =>
        <Snippet {...miniArticle}
          key={index}
          onClick={() => onSnippetClick(miniArticle.id_str)}
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
  onSnippetClick: PropTypes.func.isRequired,
  snippetList: PropTypes.array.isRequired,
}

//TODO refactor to actions
function setThumbUp(snippet) {
  snippet.thumbDown = false
  snippet.thumbUp = true
  return snippet
}

function setThumbDown(snippet) {
  snippet.thumbDown = true
  snippet.thumbUp = false
  return snippet
}

function setStar(snippet) {
  snippet.stared = !snippet.stared
  return snippet
}

function setTags(tags, snippet) {
  snippet.tags = tags
  return snippet
}
/**
 * Created by Peter on 30/08/15.
 */
import React, { PropTypes } from 'react'
import Snippet from './snippet.js'
import LoadingIndicator from 'components/LoadingIndicator'
import { completeSnippet, updateStar, thumbUp, thumbDown, updateTags }
  from 'businessLogic/snippets/snippets.actions'

export default function SnippetList({ dispatch, snippetList, isFetching }) {
  return (
    isFetching ?
    <LoadingIndicator /> :
    <ul style={{ WebkitPaddingStart: '0em' }}>
      {snippetList.map((snippet, index) => {
        const snippetJS = snippet.toJS()
        return (
          <Snippet {...snippetJS}
            key={index}
            onClick={() => dispatch(completeSnippet(snippetJS))}
            onStared={() => dispatch(updateStar(snippetJS))}
            onThumbDown={() => dispatch(thumbDown(snippetJS))}
            onThumbUp={() => dispatch(thumbUp(snippetJS))}
            saveTags={(tags) => dispatch(updateTags(tags))}
          />
        )
      }
      )}
    </ul>
  );
}

SnippetList.propTypes = {
  onSnippetClick: PropTypes.func,
  snippetList: PropTypes.object.isRequired,
  isFetching: PropTypes.bool.isRequired,
}

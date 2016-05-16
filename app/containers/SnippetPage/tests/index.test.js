import { SnippetPage } from '../index'

import expect from 'expect'
import { shallow } from 'enzyme'
import React from 'react'

describe('<SnippetPage />', () => {
  it('should render the with a text', () => {
    const renderedComponent = shallow(
      <SnippetPage />
    )
    expect(renderedComponent.contains(<h1>Hello me</h1>)).toEqual(true)
  })
})

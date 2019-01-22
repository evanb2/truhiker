import React from 'react'
import renderer from 'react-test-renderer'

import { HomeScreen } from '../HomeScreen'

it('renders correctly with defaults', () => {
  const button = renderer.create(<HomeScreen />).toJSON()
  expect(button).toMatchSnapshot()
})

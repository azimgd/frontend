import React from 'react'
import { useDispatch } from 'react-redux'
import { openSettings } from 'react-native-permissions'
import { renderWithProviders, fireEvent } from 'tests/utils'
import * as actions from 'store/ducks/contacts/actions'
import * as selectors from 'store/ducks/contacts/selectors'
import InviteFriendsScreen from 'screens/InviteFriendsScreen'

jest.mock('react-redux', () => ({ useDispatch: jest.fn(), useSelector: (fn) => fn() }))
jest.mock('store/ducks/contacts/selectors', () => ({ contactsGet: jest.fn(), invited: jest.fn() }))
jest.mock('react-native-permissions', () => ({ openSettings: jest.fn() }))

const dispatch = jest.fn()
useDispatch.mockReturnValue(dispatch)
selectors.contactsGet.mockReturnValue({ status: 'idle', error: '' })
selectors.invited.mockReturnValue({ items: [] })

const setup = () => renderWithProviders(<InviteFriendsScreen />)

describe('Invite Friends screen', () => {
  afterEach(() => {
    dispatch.mockClear()
    openSettings.mockClear()
  })

  it('update failed permission status on mount', () => {
    selectors.contactsGet.mockReturnValueOnce({ status: 'failure', error: 'error' })
    setup()

    expect(dispatch).toHaveBeenCalledWith(actions.contactsGetRequest())
  })

  it('do not update permission status on mount by default', () => {
    setup()

    expect(dispatch).not.toHaveBeenCalled()
  })

  it('idle state', () => {
    const { getByText } = setup()

    dispatch.mockClear()
    fireEvent.press(getByText('Connect Contacts'))
    expect(dispatch).toHaveBeenCalledWith(actions.contactsGetRequest())
  })

  it('error state', () => {
    const error = 'Error'
    selectors.contactsGet.mockReturnValueOnce({ status: 'failure', error })
    const { getByText } = setup()

    fireEvent.press(getByText('Open the "Settings"'))
    expect(openSettings).toHaveBeenCalled()
  })
})

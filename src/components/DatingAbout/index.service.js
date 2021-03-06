import { useEffect } from 'react'
import propOr from 'ramda/src/propOr'
import { useSelector, useDispatch } from 'react-redux'
import * as usersActions from 'store/ducks/users/actions'
import * as authSelector from 'store/ducks/auth/selectors'
import * as navigationActions from 'navigation/actions'
import { useNavigation } from '@react-navigation/native'
import dayjs from 'dayjs'

const getDateOfBirth = propOr('2000-01-01', 'dateOfBirth')

const DatingAboutService = ({ children }) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const user = useSelector(authSelector.authUserSelector)
  const usersEditProfile = useSelector(state => state.users.usersEditProfile)
  const dateOfBirthParsed = dayjs(getDateOfBirth(user), 'YYYY-MM-DD')

  const usersEditProfileRequest = (payload) =>
    dispatch(usersActions.usersEditProfileRequest(payload))
  
  useEffect(() => {
    if (usersEditProfile.status === 'success') {
      dispatch(usersActions.usersEditProfileIdle({}))
      navigationActions.navigateDatingMatch(navigation)()
    }
  }, [usersEditProfile.status])

  /**
   * Form helpers
   */
  const handleFormTransform = (values) => ({
    dateOfBirth: `${values.dateOfBirthYear}-${values.dateOfBirthMonth}-${values.dateOfBirthDay}`,
    gender: values.gender,
    fullName: values.fullName,
    bio: values.bio,
  })

  const handleFormSubmit = (values) => {
    usersEditProfileRequest(handleFormTransform(values))
  }

  const formSubmitLoading = usersEditProfile.status === 'loading'
  const formSubmitDisabled = usersEditProfile.status === 'loading'
  const formErrorMessage = usersEditProfile.error.text

  const formInitialValues = {
    dateOfBirthYear: dateOfBirthParsed.format('YYYY'), 
    dateOfBirthMonth: dateOfBirthParsed.format('MM'), 
    dateOfBirthDay: dateOfBirthParsed.format('DD'), 
    gender: user.gender,
    fullName: user.fullName,
    bio: user.bio,
  }

  const handleErrorClose = () => dispatch(usersActions.usersEditProfileIdle({}))

  return children({
    user,
    form: {
      handleFormSubmit,
      formInitialValues,
      formSubmitLoading,
      formSubmitDisabled,
      formErrorMessage,
      handleErrorClose,
    },
  })
}

export default DatingAboutService

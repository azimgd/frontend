import React, { useEffect, useCallback } from 'react'
import HeaderRight from 'navigation/HeaderRight'
import { useNavigation } from '@react-navigation/native'

export const useHeader = ({
  onPress,
  title,
  disabled,
}) => {
  const navigation = useNavigation()

  /**
   *
   */
  const headerRight = useCallback(() =>
    <HeaderRight onPress={onPress} title={title} disabled={disabled} />
  , [disabled])
  
  /**
   *
   */
  useEffect(() => {
    navigation.setOptions({
      headerRight,
    })
  }, [disabled])
}

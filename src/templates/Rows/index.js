import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
} from 'react-native'

import { withTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { withTranslation } from 'react-i18next'

const RowsTemplate = ({
  t,
  theme,
  children,
  items,
}) => {
  const styling = styles(theme)
  
  return (
    <View style={styling.root}>
      {items.map((item, key) => (
        <View style={styling.item} key={key}>
          {children(item, key)}
        </View>
      ))}
    </View>
  )
}

const styles = theme => StyleSheet.create({
  root: {
  },
})

RowsTemplate.defaultProps = {
  items: [],
  children: () => {},
}

RowsTemplate.propTypes = {
  theme: PropTypes.any,
  children: PropTypes.any,
  items: PropTypes.any,
}

export default withTranslation()(withTheme(RowsTemplate))

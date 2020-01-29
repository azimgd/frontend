import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native'
import BubbleIcon from 'assets/svg/action/Bubble'
import DirectIcon from 'assets/svg/action/Direct'
import LikeIcon from 'assets/svg/action/Like'
import UnlikeIcon from 'assets/svg/action/Unlike'
import path from 'ramda/src/path'
import { Caption } from 'react-native-paper'
import dayjs from 'dayjs'

import { withTheme } from 'react-native-paper'
import { withNavigation } from 'react-navigation'
import { useTranslation } from 'react-i18next'

const Action = ({
  theme,
  navigation,
  authUser,
  post,
  postsOnymouslyLikeRequest,
  postsDislikeRequest,
}) => {
  const styling = styles(theme)
  const { t } = useTranslation()

  const self = path(['postedBy', 'userId'])(post) === path(['userId'])(authUser)

  const handleCommentPress = () => navigation.navigate('Modal', ({
    cancelAction: () => navigation.goBack(null),
    cancelLabel: t('Cancel'),
    confirmLabel: t('OK'),
    confirmAction: () => navigation.goBack(null),
    text: `${t('REAL is fully Open Source & built by the people')}. ${t('Help us move faster by contributing code')}.`,
    title: t('Comments Coming Soon'),
  }))

  const handleViewsPress = () => {
    if (!self) { return }
    navigation.navigate({
      routeName: 'PostMediaViews',
      params: {
        postId: path(['postId'])(post)
      },
      key: `PostMediaViews-postid${post.postId}`,
    })
  }

  /**
   * Visibility of like button, like button will be visible if:
   * - Post owner has enabled likes
   * - Current authenticated user has like enabled in settings
   * - Like hasn't been set before, which allows only 1 like per post
   */
  const likeButtonVisibility = (
    !path(['postedBy', 'likesDisabled'])(post) &&
    !post.likesDisabled &&
    !path(['onymouslyLikedBy', 'items', '0'])(post)
  )

  /**
   * Visibility of comment button, comment button will be visible if:
   * - Post owner has enabled comments
   * - Current authenticated user has comments enabled in settings
   */
  const commentButtonVisibility = (
    !post.commentsDisabled &&
    !path(['postedBy', 'commentsDisabled'])(post)
  )

  return (
    <View style={styling.action}>
      <View style={styling.actionLeft}>

        {likeButtonVisibility && post.likeStatus === 'NOT_LIKED' ?
          <TouchableOpacity style={styling.actionLeftIcon} onPress={() => postsOnymouslyLikeRequest({ postId: path(['postId'])(post), userId: path(['postedBy', 'userId'])(post) })}>
            <LikeIcon fill={theme.colors.primaryIcon} />
          </TouchableOpacity>
        : null}

        {likeButtonVisibility && post.likeStatus !== 'NOT_LIKED' ?
          <TouchableOpacity style={styling.actionLeftIcon} onPress={() => postsDislikeRequest({ postId: path(['postId'])(post), userId: path(['postedBy', 'userId'])(post) })}>
            <UnlikeIcon fill={theme.colors.primary} />
          </TouchableOpacity>
        : null}
        
        {commentButtonVisibility ?
          <TouchableOpacity style={styling.actionLeftIcon} onPress={handleCommentPress}>
            <BubbleIcon fill={theme.colors.primaryIcon} />
          </TouchableOpacity>
        : null}

        <TouchableOpacity style={styling.actionLeftIcon} onPress={() => navigation.navigate('PostShare', { post })}>
          <DirectIcon fill={theme.colors.primaryIcon} />
        </TouchableOpacity>
      </View>

      {!post.viewCountsHidden && !path(['postedBy', 'viewCountsHidden'])(post) ?
        <TouchableOpacity style={styling.actionRight} onPress={handleViewsPress}>
          <View style={styling.time}>
            <Caption style={styling.timeAgo}>{dayjs(post.postedAt).from(dayjs())}</Caption>
          </View>
        </TouchableOpacity>
      : null}

      {post.viewCountsHidden || path(['postedBy', 'viewCountsHidden'])(post) ?
        <View style={styling.actionRight}>
          <View style={styling.time}>
            <Caption style={styling.timeAgo}>{dayjs(post.postedAt).from(dayjs())}</Caption>
          </View>
        </View>
      : null}
    </View>
  )
}

const styles = theme => StyleSheet.create({
  action: {
    flexDirection: 'row',
    padding: theme.spacing.base,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  actionLeftIcon: {
    marginRight: 18,
  },
  actionLeft: {
    flexDirection: 'row',
  },
  actionRight: {
    flexDirection: 'row',
  },
  time: {
    flexDirection: 'row',
    paddingVertical: 6,
  },
  timeAgo: {
  },
})

Action.propTypes = {
  theme: PropTypes.any,
  navigation: PropTypes.any,
  post: PropTypes.any,
  postsOnymouslyLikeRequest: PropTypes.any,
  postsDislikeRequest: PropTypes.any,
}

export default withNavigation(
  withTheme(Action)
)

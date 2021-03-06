import React, { useCallback, useEffect, useMemo, useState } from 'react';
import type {
  PressableAndroidRippleConfig,
  ViewStyle,
  ViewToken,
} from 'react-native';
import {
  Animated,
  BackHandler,
  FlatList,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';

import type { StackScreenProps } from '@react-navigation/stack';
import FastImage from 'react-native-fast-image';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Feather';
import type { SharedElementSceneComponent } from 'react-navigation-shared-element';
import { SharedElement } from 'react-navigation-shared-element';

import type { Repository } from '../services/github';

import { useTheme } from '../contexts/themeManager';

import { CardPressable } from '../components/CardPressable/CardPressable';
import { Text } from '../components/Text/Text';

import C from '../../assets/languages/c.svg';
import Coding from '../../assets/languages/coding.svg';
import Cpp from '../../assets/languages/cpp.svg';
import Csharp from '../../assets/languages/csharp.svg';
import CSS from '../../assets/languages/css.svg';
import Go from '../../assets/languages/go.svg';
import Java from '../../assets/languages/java.svg';
import JavaScript from '../../assets/languages/javascript.svg';
import Kotlin from '../../assets/languages/kotlin.svg';
import PHP from '../../assets/languages/php.svg';
import Powershell from '../../assets/languages/powershell.svg';
import Python from '../../assets/languages/python.svg';
import Ruby from '../../assets/languages/ruby.svg';
import Rust from '../../assets/languages/rust.svg';
import TypeScript from '../../assets/languages/typescript.svg';
import type { AppStackParamList } from '../routes/types';

type RepositoriesProps = StackScreenProps<AppStackParamList, 'Repositories'>;

interface RepositoryCardProps {
  animate: boolean;
  index: number;
  item: Repository;
  onPress: (repo: Repository) => void;
}

const languagesSvg = {
  default: Coding,
  // eslint-disable-next-line sort-keys
  C,
  'C#': Csharp,
  'C++': Cpp,
  CSS,
  Go,
  Java,
  JavaScript,
  Kotlin,
  PHP,
  Python,
  Ruby,
  Rust,
  Shell: Powershell,
  TypeScript,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getIconName = (language?: string | null): React.FC<any> => {
  if (!language) {
    return languagesSvg.default;
  }

  const exists = language in languagesSvg;

  // @ts-expect-error It is valid.
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const Component = exists ? languagesSvg[language] : languagesSvg.default;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  Component.displayName = exists ? language : 'Default';
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return Component;
};

const RepositoryCard: React.FC<RepositoryCardProps> = ({
  animate,
  item,
  onPress,
}) => {
  const { theme } = useTheme();

  const [showAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    function showAnimation() {
      Animated.spring(showAnim, {
        delay: 100,
        toValue: 1,
        useNativeDriver: true,
      }).start();
    }

    if (animate) {
      showAnimation();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animate]);

  function handleRepositoryPress() {
    onPress(item);
  }

  const date = new Date(item.createdAt).toLocaleDateString();

  const LanguageIcon = getIconName(item.language);

  const showStyle: Animated.WithAnimatedValue<ViewStyle> = {
    opacity: showAnim,
    transform: [
      {
        translateY: showAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [300, 0],
        }),
      },
    ],
  };

  return (
    <Animated.View style={showStyle}>
      <CardPressable
        key={`${item.name}-${item.createdAt}`}
        color={theme.cardOnPrimary}
        onPress={handleRepositoryPress}
        rippleColor={theme.rippleOnCard}
        style={styles.card}
        unstablePressDelay={70}
        wrapperStyle={styles.cardWrapper}
      >
        <View style={styles.cardHeader}>
          <LanguageIcon height={24} style={styles.cardLanguage} width={24} />
          <Text numberOfLines={1} style={styles.cardTitle}>
            {item.name}
          </Text>
        </View>
        <Text>Created at {date}</Text>
        {item.description ? (
          <Text>
            {'\n'}
            {item.description}
          </Text>
        ) : null}
      </CardPressable>
    </Animated.View>
  );
};

const Repositories: SharedElementSceneComponent<RepositoriesProps> = ({
  navigation,
  route,
}) => {
  const { theme } = useTheme();

  const [hideAnim] = useState(new Animated.Value(1));
  const [viewedItems, setViewedItems] = useState<number[]>([]);

  const headerTitleColor = useMemo(
    () => ({ color: theme.textPrimaryOnPrimary }),
    [theme.textPrimaryOnPrimary],
  );

  const ripple: PressableAndroidRippleConfig = useMemo(
    () => ({ color: theme.rippleOnPrimary, radius: 32 }),
    [theme.rippleOnPrimary],
  );

  const screenColor = useMemo(() => ({ backgroundColor: theme.primary }), [
    theme.primary,
  ]);

  const handleViewableItemsChanged = useCallback(
    (info: { changed: ViewToken[]; viewableItems: ViewToken[] }) => {
      const { changed } = info;
      let newViewedItems: number[] | null = null;

      setViewedItems(oldViewedItems => {
        changed.forEach(({ index, isViewable }) => {
          const viewed = index != null && oldViewedItems.includes(index);

          if (index != null && isViewable && !viewed) {
            if (newViewedItems == null) {
              newViewedItems = [...oldViewedItems];
            }
            newViewedItems.push(index);
          }
        });

        return newViewedItems ?? oldViewedItems;
      });
    },
    [],
  );

  const hideListAndGoBack = useCallback(() => {
    Animated.spring(hideAnim, {
      toValue: 0,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      navigation.goBack();
    }, 100);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation]);

  useEffect(() => {
    function backHandler() {
      hideListAndGoBack();
      return true;
    }

    const backHandlerListener = BackHandler.addEventListener(
      'hardwareBackPress',
      backHandler,
    );

    return () => backHandlerListener.remove();
  }, [hideListAndGoBack, navigation]);

  useEffect(() => {
    function handleFocus() {
      Animated.timing(hideAnim, {
        duration: 0,
        toValue: 1,
        useNativeDriver: true,
      }).start();
    }

    const focusHandler = navigation.addListener('focus', handleFocus);

    return () => focusHandler();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation]);

  function flatListKeyExtractor(item: Repository) {
    return `${item.name}-${item.createdAt}`;
  }

  function handleBackPress() {
    hideListAndGoBack();
  }

  function handleRepositoryPress(repo: Repository) {
    navigation.navigate('RepositoryDetails', { repository: repo });
  }

  function renderItem(props: { index: number; item: Repository }) {
    const animate = viewedItems.includes(props.index);
    return (
      <RepositoryCard
        {...props}
        animate={animate}
        onPress={handleRepositoryPress}
      />
    );
  }

  const hideAnimationStyle: Animated.WithAnimatedValue<ViewStyle> = {
    opacity: hideAnim,
    transform: [
      {
        scale: hideAnim,
      },
    ],
  };

  return (
    <SafeAreaView style={styles.container}>
      <SharedElement
        id="card-enter"
        style={[StyleSheet.absoluteFill, styles.container]}
      >
        <View style={[styles.sharedElement, screenColor]} />
      </SharedElement>
      <View style={styles.header}>
        <View style={styles.backContainer}>
          <Pressable
            android_ripple={ripple}
            onPress={handleBackPress}
            style={styles.back}
          >
            <Icon color={theme.textOnPrimary} name="arrow-left" size={32} />
          </Pressable>
        </View>
        <FastImage
          source={{ uri: route.params.user.avatarUrl }}
          style={styles.avatar}
        />
        <Text style={[styles.headerTitle, headerTitleColor]}>
          {route.params.user.username}
        </Text>
      </View>
      <Animated.View style={[styles.listContainer, hideAnimationStyle]}>
        <FlatList
          key="repo-list"
          contentContainerStyle={styles.list}
          data={route.params.repositories}
          keyExtractor={flatListKeyExtractor}
          onViewableItemsChanged={handleViewableItemsChanged}
          renderItem={renderItem}
        />
      </Animated.View>
    </SafeAreaView>
  );
};

Repositories.sharedElements = () => {
  return ['card-enter'];
};

/* eslint-disable sort-keys */
const styles = StyleSheet.create({
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginHorizontal: 8,
    marginVertical: 10,
  },
  back: {
    padding: 4,
  },
  backContainer: {
    overflow: 'hidden',
    margin: 8,
    borderRadius: 32,
  },
  card: {
    flexBasis: 0,
    flexGrow: 0.5,
    elevation: 0,
  },
  cardHeader: {
    flexDirection: 'row',
  },
  cardLanguage: {
    marginRight: 8,
    marginBottom: 8,
  },
  cardTitle: {
    fontFamily: 'Montserrat-Bold',
  },
  cardWrapper: {
    marginHorizontal: 20,
    marginVertical: 8,
  },
  container: {
    flexGrow: 1,
  },
  header: {
    flexDirection: 'row',
  },
  headerTitle: {
    textAlignVertical: 'center',
  },
  list: {
    paddingBottom: 8,
  },
  listContainer: {
    flex: 1,
  },
  sharedElement: {
    width: '100%',
    flexGrow: 1,
  },
});
/* eslint-enable sort-keys */

export { Repositories };

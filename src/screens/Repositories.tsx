import React, { useEffect, useMemo } from 'react';
import type { PressableAndroidRippleConfig } from 'react-native';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';

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

import type { AppStackParamList } from '../routes/types';

type RepositoriesProps = StackScreenProps<AppStackParamList, 'Repositories'>;

interface RepositoryCardProps {
  index: number;
  item: Repository;
}

const RepositoryCard: React.FC<RepositoryCardProps> = ({ item }) => {
  const { theme } = useTheme();

  function handleRepositoryPress() {}

  const date = new Date(item.createdAt).toLocaleDateString();

  return (
    <CardPressable
      key={`${item.name}-${item.createdAt}`}
      color={theme.cardOnPrimary}
      onPress={handleRepositoryPress}
      rippleColor={theme.rippleOnCard}
      style={styles.card}
      unstablePressDelay={70}
      wrapperStyle={styles.cardWrapper}
    >
      <Text style={styles.cardTitle}>{item.name}</Text>
      <Text>{date}</Text>
      {item.description ? (
        <Text>
          {'\n'}
          {item.description}
        </Text>
      ) : null}
    </CardPressable>
  );
};

const Repositories: SharedElementSceneComponent<RepositoriesProps> = ({
  navigation,
  route,
}) => {
  const { theme } = useTheme();

  const headerTitleColor = useMemo(
    () => ({ color: theme.textPrimaryOnPrimary }),
    [theme.textPrimaryOnPrimary],
  );

  const ripple: PressableAndroidRippleConfig = useMemo(
    () => ({ radius: 500, color: theme.rippleOnPrimary }),
    [theme.rippleOnPrimary],
  );

  const screenColor = useMemo(() => ({ backgroundColor: theme.primary }), [
    theme.primary,
  ]);

  useEffect(() => {
    if (!route.params) {
      navigation.goBack();
    }
  }, [navigation, route.params]);

  function flatListKeyExtractor(item: Repository) {
    return `${item.name}-${item.createdAt}`;
  }

  function handleBackPress() {
    navigation.goBack();
  }

  function renderItem(props: { index: number; item: Repository }) {
    return <RepositoryCard {...props} />;
  }

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
          source={{
            uri: 'https://avatars0.githubusercontent.com/u/26308880?v=4',
          }}
          style={styles.avatar}
        />
        <Text style={[styles.headerTitle, headerTitleColor]}>
          {route.params?.user?.username}
        </Text>
      </View>
      <FlatList
        key="repo-list"
        data={route.params?.repositories}
        keyExtractor={flatListKeyExtractor}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
};

Repositories.sharedElements = () => {
  return ['card-enter'];
};

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
  cardTitle: {
    fontFamily: 'Montserrat-Bold',
  },
  cardWrapper: {
    marginHorizontal: 20,
    marginVertical: 8,
  },
  container: {
    flex: 1,
    flexGrow: 1,
  },
  header: {
    flexDirection: 'row',
  },
  headerTitle: {
    textAlignVertical: 'center',
  },
  sharedElement: {
    width: '100%',
    flexGrow: 1,
  },
});

export { Repositories };

import React from 'react';
import { View } from 'react-native';

import type { StackScreenProps } from '@react-navigation/stack';
import type { SharedElementSceneComponent } from 'react-navigation-shared-element';

import type { AppStackParamList } from '../routes/types';

type RepositoryDetailsProps = StackScreenProps<
  AppStackParamList,
  'RepositoryDetails'
>;

const RepositoryDetails: SharedElementSceneComponent<RepositoryDetailsProps> = () => {
  return <View />;
};

RepositoryDetails.sharedElements = () => {
  return [];
};

export { RepositoryDetails };

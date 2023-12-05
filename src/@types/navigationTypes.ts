import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type StackProp = {
  Home: undefined;
  Initial: undefined;
  Detail: {
    id: string;
    text: string;
  };
};

export type StackTypes = NativeStackNavigationProp<StackProp>;

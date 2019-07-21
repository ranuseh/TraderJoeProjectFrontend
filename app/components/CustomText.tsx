import React from 'react';
import { Text, TextProps } from 'react-native';

interface Props extends TextProps {
  children: any;
}

export const CustomText = (props: Props) => {
  const defaultStyle = { fontFamily: 'Chalkduster' };
  const { children, style, ...rest } = props;
  const newStyle = Object.assign({}, defaultStyle, style);

  return (
    <Text style={newStyle} {...rest}>
      {children}
    </Text>
  );
};

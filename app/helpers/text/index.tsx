import React from "react";

export const sliceText = (
  event: React.ChangeEvent<any>,
  length: number
): React.ChangeEvent<any> => {
  event.target.value = event.target.value.slice(0, length);
  return event;
};

export const concatDots = (value: string, length: number): string => {
  const newValue = value.slice(0, length);
  return newValue.length >= length ? newValue.concat(" ...") : newValue;
};

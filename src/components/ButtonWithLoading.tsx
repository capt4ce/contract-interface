import { Button, ButtonComponentProps, Spinner } from 'flowbite-react';
import React, { ReactPropTypes } from 'react';

const ButtonWithLoading = (
  props: { isLoading?: boolean } & ButtonComponentProps
) => {
  const { isLoading, children, ...otherProps } = props;
  if (isLoading) {
    return (
      <Button {...otherProps} disabled={otherProps.disabled || isLoading}>
        <div className="mr-3">
          <Spinner size="sm" light={true} />
        </div>
        Loading ...
      </Button>
    );
  }

  return <Button {...otherProps}>{children}</Button>;
};
export default ButtonWithLoading;

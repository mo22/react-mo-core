import * as React from 'react';
import { Releaseable } from 'mo-core';


/**
 * call `callback` when react class component `self` is unmounted
 */
export function onWillUnmount(self: React.Component, callback: () => void) {
  const prev = self.componentWillUnmount ? self.componentWillUnmount.bind(self) : undefined;
  self.componentWillUnmount = () => {
    if (prev) prev();
    callback();
  };
}

/**
 * release Releaseable `sub` if class `self` is unmounted
 */
export function releaseOnWillUnmount(self: React.Component, sub: Releaseable) {
  onWillUnmount(self, () => sub.release());
}

/**
 * provide a safe setState function that does nothing if unmounted
 * @example
 * class MyComponent extends React.Component {
 *   private safeSetState = SafeSetState(this);
 * }
 */
export function SafeSetState<S>(self: React.Component<any, S>) {
  let mounted = true;
  onWillUnmount(self, () => {
    mounted = false;
  });
  return (arg: Pick<S, keyof S>) => {
    if (mounted) {
      self.setState(arg);
    }
  };
}

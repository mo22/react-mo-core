import * as React from 'react';
import { Releaseable } from 'mo-core';



export function onWillUnmount(self: React.Component, callback: () => void) {
  const prev = self.componentWillUnmount ? self.componentWillUnmount.bind(self) : undefined;
  self.componentWillUnmount = () => {
    if (prev) prev();
    callback();
  };
}

export function releaseOnWillUnmount(self: React.Component, sub: Releaseable) {
  onWillUnmount(self, () => sub.release());
}

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

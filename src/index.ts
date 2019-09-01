import * as React from 'react';

export function onWillUnmount(self: React.Component, callback: () => void) {
  const prev = self.componentWillUnmount ? self.componentWillUnmount.bind(self) : undefined;
  self.componentWillUnmount = () => {
    if (prev) prev();
    callback();
  };
}

// @TODO: react-mo-core?
export function releaseOnWillUnmount(self: React.Component, sub: Releaseable) {
  onWillUnmount(self, () => sub.release());
}

// @TODO: react-mo-core?
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

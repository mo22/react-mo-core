import * as React from 'react';
import { Releaseable } from 'mo-core';
/**
 * call `callback` when react class component `self` is unmounted
 */
export declare function onWillUnmount(self: React.Component, callback: () => void): void;
/**
 * release Releaseable `sub` if class `self` is unmounted
 */
export declare function releaseOnWillUnmount(self: React.Component, sub: Releaseable | undefined): void;
/**
 * provide a safe setState function that does nothing if unmounted
 * @example
 * class MyComponent extends React.Component {
 *   private safeSetState = SafeSetState(this);
 * }
 */
export declare function SafeSetState<S>(self: React.Component<any, S>): (arg: Pick<S, keyof S>) => void;

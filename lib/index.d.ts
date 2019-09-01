import * as React from 'react';
import { Releaseable } from 'mo-core';
export declare function onWillUnmount(self: React.Component, callback: () => void): void;
export declare function releaseOnWillUnmount(self: React.Component, sub: Releaseable): void;
export declare function SafeSetState<S>(self: React.Component<any, S>): (arg: Pick<S, keyof S>) => void;

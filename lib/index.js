/**
 * call `callback` when react class component `self` is unmounted
 */
export function onWillUnmount(self, callback) {
    const prev = self.componentWillUnmount ? self.componentWillUnmount.bind(self) : undefined;
    self.componentWillUnmount = () => {
        if (prev)
            prev();
        callback();
    };
}
/**
 * release Releaseable `sub` if class `self` is unmounted
 */
export function releaseOnWillUnmount(self, sub) {
    if (sub === undefined)
        return;
    onWillUnmount(self, () => sub.release());
}
/**
 * provide a safe setState function that does nothing if unmounted
 * @example
 * class MyComponent extends React.Component {
 *   private safeSetState = SafeSetState(this);
 * }
 */
export function SafeSetState(self) {
    let mounted = true;
    onWillUnmount(self, () => {
        mounted = false;
    });
    return (arg) => {
        if (mounted) {
            self.setState(arg);
        }
    };
}
//# sourceMappingURL=index.js.map
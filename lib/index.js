export function onWillUnmount(self, callback) {
    const prev = self.componentWillUnmount ? self.componentWillUnmount.bind(self) : undefined;
    self.componentWillUnmount = () => {
        if (prev)
            prev();
        callback();
    };
}
export function releaseOnWillUnmount(self, sub) {
    onWillUnmount(self, () => sub.release());
}
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
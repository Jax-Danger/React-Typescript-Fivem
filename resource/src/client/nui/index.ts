type SendAction<T> = {
    action: string;
    data: T;
};

export function send<T>({ action, data }: SendAction<T>) {
    SendNuiMessage(
        JSON.stringify({
            action: action,
            data: data,
        })
    );
}

export function focus(value: boolean) {
    SetNuiFocus(value, value);
}

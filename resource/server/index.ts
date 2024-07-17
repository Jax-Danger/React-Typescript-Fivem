RegisterCommand('cc', (source: number, args: string[]) => {
  emitNet('chat:clear', -1);
}, false)
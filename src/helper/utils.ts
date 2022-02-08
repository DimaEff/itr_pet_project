export const getSubscribeMessageCreator = (socketName: string) => (pointName: string): string => `${socketName}.${pointName}`;

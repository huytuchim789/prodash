export default function shallowProperty(key: string) {
  return (obj: any) => (obj == null ? void 0 : obj[key]);
}

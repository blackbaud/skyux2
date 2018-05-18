// TODO: Convert to string enum after upgrading TypeScript to ^2.4.0.
// https://stackoverflow.com/questions/45191472/typescripts-string-enums-type-is-not-assignable-to-type
type ToastType = 'danger' | 'info' | 'success' | 'warning';

// tslint:disable:variable-name
export abstract class SkyToastType {
  public static Danger: ToastType = 'danger';
  public static Info: ToastType = 'info';
  public static Success: ToastType = 'success';
  public static Warning: ToastType = 'warning';
}

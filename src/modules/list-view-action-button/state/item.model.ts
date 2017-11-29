export class SkyListViewActionButtonItemModel {
  public id?: string;
  public title: string;
  public summary: string;
  public icon: string;
  public route: string;

  constructor(id: string, data?: any) {
    this.id = id;

    if (data) {
      this.title = data.title;
      this.summary = data.summary;
      this.icon = data.icon;
      this.route = data.route;
    }
  }
}

export class ListViewChecklistItemModel {
  public id: string;
  public label: string;
  public description: string;
  public category: string;

  constructor(id: string, data?: any) {
    this.id = id;

    if (data) {
      this.label = data.label;
      this.description = data.description;
      this.category = data.category;
    }
  }
}

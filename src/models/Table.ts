import {
  StatusOptions,
  ConctactChannelOptions,
  TableData as TTableData,
  TableDataFlat,
} from '../types/table';

export default class TableData {
  data: TTableData[];

  constructor(data: TTableData[]) {
    this.data = data;
  }

  buildTableData(): TableDataFlat[] {
    let tableData = this.flattenData(this.data);
    tableData = this.normalizeValues(tableData);

    return tableData;
  }

  normalizeValues(data: TableDataFlat[]): TableDataFlat[] {
    return data.map(({ status, contact_channel, ...rest }) => {
      return {
        ...rest,
        status: StatusOptions[status as keyof typeof StatusOptions],
        contact_channel:
          ConctactChannelOptions[
            contact_channel as keyof typeof ConctactChannelOptions
          ],
      };
    });
  }

  flattenData(data: TTableData[]): TableDataFlat[] {
    return data.map((item) => {
      const { customer, ...rest } = item;

      return {
        ...rest,
        ...customer,
      };
    });
  }
}

export type Customer = {
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
  country_code: string;
  phone: string;
  birthday: string;
};

export type TableData = {
  id: number;
  customer: Customer;
  contact_channel: string;
  status: string;
  interaction_creation_date: string;
  due_date: string;
  attachments: string;
  last_comment: string;
  assignedTO: string;
};

export type TableDataFlat = Omit<TableData, 'customer'> & Customer;

export type TableColumn = {
  name: keyof TableDataFlat;
  required: boolean;
  label: string;
  field: keyof TableDataFlat;
  sortable: boolean;
  format?: (val: any) => string;
};

export enum StatusOptions {
  finished = 'Finished',
  inProgress = 'In progress',
  reserved = 'Reserved',
  toTreat = 'To treat',
  waiting = 'Waiting',
}

export enum ConctactChannelOptions {
  facebook = 'Facebook',
  file = 'File',
  form = 'Form',
  messenger = 'Messanger',
  twiter = 'Twitter',
}

export enum KeyLabels {
  id = 'ID',
  interaction_creation_date = 'Interaction Creation Date',
  due_date = 'Due Date',
  attachments = 'Attachments',
  last_comment = 'Last Comment',
  assignedTO = 'Assigned To',
  email = 'Email',
  gender = 'Gender',
  country_code = 'Country Code',
  phone = 'Phone',
  birthday = 'Birthday',
  status = 'Status',
  contact_channel = 'Contact Channel',
  first_name = 'First Name',
  last_name = 'Last Name',
}

export type TableCheckboxFilterEnums = StatusOptions | ConctactChannelOptions;

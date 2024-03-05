<template>
  <div class="q-pa-md">
    <q-table
      flat
      style="height: 600px"
      bordered
      ref="tableRef"
      title="Mock Table"
      :rows
      :columns
      :filter="searchFilter"
      :rows-per-page-options="[25, 50, 100, 200]"
      virtual-scroll
      row-key="id"
      @row-click="onRowSelected"
    >
      <template v-slot:top-right>
        <div class="row">
          <q-btn
            no-caps
            outline
            class="btn-fixed-width q-mr-md"
            color="grey-6"
            label="Filters"
            @click="filtersModal = true"
          />
          <q-btn
            no-caps
            outline
            class="btn-fixed-width q-mr-md"
            color="grey-6"
            label="Column Settings"
            @click="columnOrderModal = true"
          />

          <q-input debounce="300" v-model="searchFilter" placeholder="Search">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </div>
      </template>
    </q-table>

    <q-dialog v-model="filtersModal">
      <q-card class="q-pl-xl q-pr-xl q-pt-md q-pb-lg">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Filters</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <TableCheckboxFilter
          :options="statusFilterOptions"
          v-model="statusFilter"
          label="Status Filter"
        />
        <TableCheckboxFilter
          :options="contactChannelFilterOptions"
          v-model="contactChannelFilter"
          label="Contact Channel Filter"
        />
      </q-card>
    </q-dialog>
    <q-dialog v-model="columnOrderModal">
      <TableColumnOrder :columns="columns" />
    </q-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import TableColumnOrder from 'src/components/TableColumnOrder.vue';
import TableCheckboxFilter from 'src/components/TableCheckboxFilter.vue';
import {
  StatusOptions,
  ConctactChannelOptions,
  KeyLabels,
} from '../types/table';
import type { Entries } from '../types/utils';
import type { TableColumn, TableDataFlat } from '../types/table';
import { parseDate } from '../utils/helpers';

const props = defineProps<{
  tableData: TableDataFlat[];
}>();

const emits = defineEmits<{
  'row-selected': [index: number];
}>();

// MODALS

const filtersModal = ref(false);
const columnOrderModal = ref(false);

// FILTERS

const statusFilter = ref(Object.values(StatusOptions));
const statusFilterOptions = Object.values(StatusOptions).map((value) => ({
  value,
  label: value,
}));

const contactChannelFilter = ref(Object.values(ConctactChannelOptions));
const contactChannelFilterOptions = Object.values(ConctactChannelOptions).map(
  (value) => ({
    value,
    label: value,
  })
);

const searchFilter = ref('');

const filersToApply = {
  status: statusFilter,
  contact_channel: contactChannelFilter,
};

// LIST/TABLE DATA

const rows = computed(() => {
  let itemlist = [...props.tableData];

  (Object.entries(filersToApply) as Entries<typeof filersToApply>).forEach(
    ([filterKey, filter]) => {
      itemlist = itemlist.filter((item) => {
        const itemValue = item[filterKey];
        // @ts-expect-error - it's a string
        return filter.value.includes(itemValue);
      });
    }
  );

  return itemlist;
});

const columns = ref<TableColumn[]>([
  {
    name: 'id',
    required: true,
    label: KeyLabels.id,
    field: 'id',
    sortable: true,
  },
  {
    name: 'first_name',
    required: true,
    label: KeyLabels.first_name,
    sortable: true,
    field: 'first_name',
  },
  {
    name: 'last_name',
    required: true,
    label: KeyLabels.last_name,
    sortable: true,
    field: 'last_name',
  },
  {
    name: 'phone',
    required: false,
    label: KeyLabels.phone,
    sortable: true,
    field: 'phone',
  },
  {
    name: 'email',
    required: false,
    label: KeyLabels.email,
    sortable: true,
    field: 'email',
  },
  {
    name: 'country_code',
    required: false,
    label: KeyLabels.country_code,
    field: 'country_code',
    sortable: true,
  },
  {
    name: 'birthday',
    required: false,
    label: KeyLabels.birthday,
    field: 'birthday',
    sortable: true,
    format: (val: string) => parseDate(val, true),
  },
  {
    name: 'gender',
    required: false,
    label: KeyLabels.gender,
    field: 'gender',
    sortable: true,
  },
  {
    name: 'contact_channel',
    required: false,
    label: KeyLabels.contact_channel,
    field: 'contact_channel',
    sortable: true,
  },
  {
    name: 'status',
    required: false,
    label: KeyLabels.status,
    field: 'status',
    sortable: true,
  },
  {
    name: 'interaction_creation_date',
    required: false,
    label: KeyLabels.interaction_creation_date,
    field: 'interaction_creation_date',
    sortable: true,
    format: (val: string) => parseDate(val),
  },
  {
    name: 'due_date',
    required: false,
    label: KeyLabels.due_date,
    field: 'due_date',
    sortable: true,
    format: (val: string) => parseDate(val),
  },
  {
    name: 'assignedTO',
    required: false,
    label: KeyLabels.assignedTO,
    field: 'assignedTO',
    sortable: true,
  },
]);

function onRowSelected(_: Event, row: TableDataFlat) {
  emits('row-selected', row.id);
}
</script>

<template>
  <div class="q-pa-md">
    <div>
      <draggable
        :list="columns"
        item-key="name"
        class="list-group"
        ghost-class="ghost"
        @start="dragging = true"
        @end="dragging = false"
      >
        <template #item="{ element, index }">
          <div class="list-group-item">
            <div class="">
              <q-btn color="primary" no-caps outline style="width: 200px">
                <div class="ellipsis">{{ element.label }} {{ index }}</div>
              </q-btn>
            </div>
          </div>
        </template>
      </draggable>
    </div>
    Filters
    <div>
      <q-option-group
        v-model="statusFilter"
        :options="options"
        color="green"
        type="checkbox"
      />
    </div>
    <q-table
      flat
      bordered
      ref="tableRef"
      title="Mock Table"
      :rows="originalRows"
      :columns="columns"
      :filter="filter"
      row-key="id"
      @row-click="onRowSelected"
    >
      <template v-slot:top-right>
        <q-btn
          no-caps
          outline
          class="btn-fixed-width"
          color="brown-5"
          label="Filters"
          @click="dialogColumn = true"
        />
        <q-btn
          no-caps
          outline
          class="btn-fixed-width"
          color="brown-5"
          label="Column Settings"
        />

        <q-input debounce="300" v-model="filter" placeholder="Search">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
    </q-table>

    <q-dialog v-model="dialogColumn">
      <q-card>
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Close icon</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum
          repellendus sit voluptate voluptas eveniet porro. Rerum blanditiis
          perferendis totam, ea at omnis vel numquam exercitationem aut, natus
          minima, porro labore.
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup lang="ts">
// import { Todo, Meta } from 'components/models';
import draggable from 'vuedraggable';
import { ref, computed } from 'vue';
import jsonData from '../data/MockData.json';

// 0. Base table - DONE
// 1. Search table - DONE
// 2. Filters - DONE / 1 EXAMPLE
// 3. Sortowanie asc/desc - DONE BY quasar
// 4. Reored columns - DONE / TO UPDATE
// 5. Clicking on table should display data /modal + routing do tego
// 6. Rozkminic parsowanie w obiekcie + status wysoka litera + contact channel
// 7. Unity do tego?
// 8. Typy?
// 9. Virtualizacja
// 10. Czas - trzymaj w UTC -
// 11. List model

// Dialog

const dialogColumn = ref(false);

// FILTERS
enum Status {
  Finished = 'finished',
  InProgress = 'inProgress',
  Reserved = 'reserved',
  ToTreat = 'toTreat',
  Waiting = 'waiting',
}

const statusFilter = ref<string[]>([...Object.values(Status)]);
const statusKeys = Object.keys(Status);

const options = statusKeys.map((statusKey) => {
  return {
    label: statusKey,
    value: Status[statusKey as keyof typeof Status],
  };
});

// Dragging
const dragging = ref(false);

// LIST
function parseDate(isoDateString: string, isDateOnly = false): string {
  const date: Date = new Date(isoDateString);
  const day: string = date.getUTCDate().toString().padStart(2, '0');
  const month: string = (date.getUTCMonth() + 1).toString().padStart(2, '0');
  const year: string = date.getUTCFullYear().toString();
  const hour: string = date.getUTCHours().toString().padStart(2, '0');
  const minute: string = date.getUTCMinutes().toString().padStart(2, '0');
  return isDateOnly
    ? `${day}-${month}-${year}`
    : `${day}-${month}-${year} ${hour}:${minute}`;
}

const statusFilterMethod = (status: string) => {
  return statusFilter.value.includes(status);
};

const originalRows = computed(() => {
  const itemlist = jsonData.map((item) => {
    const { customer, ...rest } = item;

    return {
      ...rest,
      ...customer,
    };
  });

  return itemlist.filter(({ status }) => statusFilterMethod(status));
});

const columns = ref([
  {
    name: 'id',
    required: true,
    label: 'ID',
    field: 'id',
    sortable: true,
  },
  {
    name: 'first_name',
    required: true,
    label: 'First Name',
    sortable: true,
    field: 'first_name',
  },
  {
    name: 'last_name',
    required: true,
    label: 'Last Name',
    sortable: true,
    field: 'last_name',
  },
  {
    name: 'phone',
    required: false,
    label: 'Phone',
    sortable: true,
    field: 'phone',
  },
  {
    name: 'email',
    required: false,
    label: 'Email',
    sortable: true,
    field: 'email',
  },
  {
    name: 'country_code',
    required: false,
    label: 'Country',
    field: 'country_code',
    sortable: true,
  },
  {
    name: 'birthday',
    required: false,
    label: 'Birthday',
    field: 'birthday',
    format: (val: string) => `${parseDate(val, true)}`,
    sortable: true,
  },
  {
    name: 'contact_channel',
    required: false,
    label: 'Contact channel',
    field: 'contact_channel',
    sortable: true,
  },
  {
    name: 'status',
    required: false,
    label: 'Status',
    field: 'status',
    sortable: true,
  },
  {
    name: 'interaction_creation_date',
    required: false,
    label: 'Interaction creation date',
    field: 'interaction_creation_date',
    format: (val: string) => `${parseDate(val)}`,
    sortable: true,
  },
  {
    name: 'due_date',
    required: false,
    label: 'Due date',
    field: 'due_date',
    format: (val: string) => `${parseDate(val)}`,
    sortable: true,
  },
  {
    name: 'assignedTO',
    required: false,
    label: 'Assigned to',
    field: 'assignedTO',
    sortable: true,
  },
]);

const tableRef = ref();
// const rows = ref([]);
const filter = ref('');
// const loading = ref(false);
// const pagination = ref({
//   sortBy: 'desc',
//   descending: false,
//   page: 1,
//   rowsPerPage: 20,
//   rowsNumber: 10,
// });

function onRowSelected(index: number) {
  console.log(index);
}
</script>

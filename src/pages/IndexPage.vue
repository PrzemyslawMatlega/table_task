<template>
  <div class="q-pa-md">
    <PeopleTable :table-data="tableData" @row-selected="openDetailsModal" />
    <q-dialog v-model="detailModal" @hide="closeDetailsModal">
      <PersonDetailsCard :details="personDetails" />
    </q-dialog>

    <q-separator />
    <div>
      <ol>
        <li>Render table - Done</li>
        <li>Search table - Done</li>
        <li>Filters - Done (Added two just for the showcase)</li>
        <li>Sorting asc/desc - Done</li>
        <li>Reordered columns - Done - by drag and drop</li>
        <li>
          Clicking on a table will display a page/modal, all using routing -
          Done
        </li>
        <li>
          "It's up to you to add any other functions you think might be useful."
          - I've added list virtualization for better performance and wrote
          everything in TypeScript. Of course, there is always room for
          improvement and adding more features, but since this is just a
          recruitment task, I've decided to stop here. I also didn't pay much
          attention to styles and design, as it was not the main focus of the
          task.
        </li>
      </ol>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import PersonDetailsCard from 'src/components/PersonDetailsCard.vue';
import PeopleTable from 'src/components/PeopleTable.vue';
import TableData from '../models/Table';
import jsonData from '../data/MockData.json';

const router = useRouter();
const route = useRoute();

const tableData = new TableData(jsonData).buildTableData();

// DETAIL MODAL

const detailModal = ref(false);
const currentPersonId = ref<number | null>(null);

const personDetails = computed(() => {
  return tableData.find((person) => person.id === currentPersonId.value);
});

const openDetailsModal = async (id: number) => {
  try {
    await router.push(`/${id}`);
    currentPersonId.value = id;
    detailModal.value = true;
  } catch (error: unknown) {
    console.log(`Navigation failed: ${error}`);
  }
};

const closeDetailsModal = () => {
  router.push('/');
  detailModal.value = false;
};

watch(
  () => route.params.id,
  (id) => {
    if (typeof id === 'string' && id.length) {
      const numId = Number(id);
      if (!isNaN(numId)) {
        openDetailsModal(numId);
      } else {
        currentPersonId.value = null;
        detailModal.value = true;
      }
    }
  },
  { immediate: true }
);
</script>

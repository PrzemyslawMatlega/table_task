<template>
  <q-card class="q-pa-md">
    <q-card-section class="row items-center">
      <div class="text-h6">Column Order</div>
      <q-space />
      <q-btn icon="close" flat round dense v-close-popup />
    </q-card-section>
    <draggable
      :list="columns"
      item-key="name"
      class="list-group"
      ghost-class="ghost"
    >
      <template #item="{ element, index }">
        <div class="list-group-item">
          <div class="q-pb-md">
            <q-btn
              color="black-5 grabbable"
              no-caps
              outline
              style="width: 200px"
            >
              <div class="ellipsis">{{ element.label }}</div>
              <q-badge color="red" floating>{{ index }}</q-badge>
            </q-btn>
          </div>
        </div>
      </template>
    </draggable>

    <span>Set order by drag and drop</span>
  </q-card>
</template>
<script setup lang="ts">
import { TableColumn } from 'src/types/table';
import draggable from 'vuedraggable';

defineProps<{
  columns: TableColumn[];
}>();
</script>

<style lang="scss">
.grabbable {
  cursor: grab;
}
</style>

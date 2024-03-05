<template>
  <q-card class="q-pl-md q-pr-md q-pt-md q-pb-md">
    <q-card-section v-if="!!details">
      <q-btn icon="close" flat round dense v-close-popup />
      <q-item>
        <q-item-section>
          <q-item-label>Id</q-item-label>
          <q-item-label caption>{{ details.id }}</q-item-label>
        </q-item-section>
        <q-item-section>
          <q-item-label>First Name</q-item-label>
          <q-item-label caption>{{ details.first_name }}</q-item-label>
        </q-item-section>
        <q-item-section>
          <q-item-label>Last Name</q-item-label>
          <q-item-label caption>{{ details.last_name }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-separator />
      <q-item v-for="(value, key) in otherDetails" :key="key">
        <q-item-section>
          <q-item-label>{{ formatKey(key) }}</q-item-label>
          <q-item-label caption>{{ value }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-card-section>
    <q-card-section v-else>
      <q-btn icon="close" flat round dense v-close-popup />
      <div class="text-h6">
        No details available. Check if user id is correct
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { parseDate } from '../utils/helpers';
import { type TableDataFlat, KeyLabels } from '../types/table';

const props = defineProps<{
  details: TableDataFlat | undefined;
}>();

const formatKey = (key: string): string => {
  return KeyLabels[key as keyof typeof KeyLabels];
};

const otherDetails = computed(() => {
  if (!props.details) return {};
  const {
    first_name,
    last_name,
    interaction_creation_date,
    due_date,
    birthday,
    id,
    ...otherDetails
  } = props.details;

  return {
    interaction_creation_date: parseDate(interaction_creation_date),
    due_date: parseDate(due_date),
    birthday: parseDate(birthday, true),
    ...otherDetails,
  };
});
</script>

<style lang="scss"></style>

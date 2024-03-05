<template>
  <q-card-section>
    <div class="text-bold">{{ label }}</div>
    <div>
      <q-option-group
        v-model="model"
        :options="options"
        color="green"
        type="checkbox"
      />
    </div>
  </q-card-section>
</template>
<script setup lang="ts">
import { TableCheckboxFilterEnums } from 'src/types/table';

const model = defineModel();

type Option = {
  label: TableCheckboxFilterEnums;
  value: string;
};

defineProps<{
  options: Option[];
  label: string;
}>();
</script>
<style lang=""></style>

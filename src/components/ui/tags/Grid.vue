<script setup lang="ts">
import { useStore } from '@nanostores/vue';
import { tags } from '@/store.js';
import config from "@util/themeConfig";
import type Tag from "@/types/Tag";

const availableTags = config.directoryData.tags as Tag[] | undefined;

const selectedTags = useStore(tags);

function toggleTagByName(tag: string) {
  if (!tag) return;
  
  if (!selectedTags.value.includes(tag as never)) {
    tags.set([...selectedTags.value, tag] as never[]);
  }
  else {
    let filtered = selectedTags.value.filter(e => e !== tag);
    tags.set([...filtered]);
  }
}
</script>

<template>
  <div class="flex flex-wrap gap-2 mt-4">
    <span
      v-for="tag in availableTags"
      class="cursor-pointer select-none rounded-full border border-cyan-300/20 bg-white/70 px-3 py-1.5 text-sm text-slate-700 transition hover:border-cyan-300 hover:bg-cyan-50 dark:bg-slate-900/70 dark:text-slate-200"
      :class="selectedTags.includes(tag.key) ? 'border-cyan-400 bg-cyan-100 text-cyan-950 dark:bg-cyan-300 dark:text-slate-950' : ''"
      @click="toggleTagByName(tag.key)"
    >
      {{ tag.name }}
    </span>
  </div>
</template>
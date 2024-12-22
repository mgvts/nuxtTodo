<script lang="ts">
import {defineComponent, type PropType} from 'vue'
import type {Note} from "~/types/note";
import {ActionDialog} from "#components";

export default defineComponent({
  name: "DeleteBtn",
  components: {ActionDialog},
  setup() {
    return {notesStore: useNotesStore()}
  },
  props: {
    note: {
      type: Object as PropType<Note>,
      required: true
    }
  },
  data() {
    return {
      isOpenDeleteDialog: false
    }
  },
  methods: {
    deleteNote(force = false) {
      if (!force) {
        this.isOpenDeleteDialog = true
        return
      }
      this.notesStore.deleteNote(this.note.id)
      this.$emit('delete', this.note)
      this.isOpenDeleteDialog = false
    },
  }
})
</script>

<template>
  <v-btn icon="mdi-delete" flat @click="deleteNote()"/>
  <action-dialog
      v-model="isOpenDeleteDialog"
      :title="`Вы точно хотите удалить заметку ${note.title}?`"
      confirm-title-btn="Удалить"
      back-title-btn="Оставить"
      @confirm="deleteNote(true)"
      @back="isOpenDeleteDialog = false"
  />
</template>

<style scoped>

</style>
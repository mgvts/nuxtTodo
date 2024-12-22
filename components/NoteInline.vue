<script lang="ts">
import {defineComponent, type PropType} from 'vue'
import type {Note} from "~/types/note";
import DeleteBtn from "~/components/DeleteBtn.vue";

export default defineComponent({
  name: "NoteInline",
  components: {DeleteBtn},
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
      open: ['todoList'],
      isOpenDeleteDialog: false,
      isCompose: false
    }
  },
  computed: {
    getTodos() {
      if (this.note.todo.length <= 3) return this.note.todo
      this.isCompose = true
      return this.note.todo.slice(0, 3)
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
    editNote() {
      this.$router.push('/edit/' + this.note.id)
    }
  }
})
</script>

<template>
  <v-card>
    <v-card-title>
      <div class="d-flex justify-space-between align-center">
        <div class="text-truncate">
          {{ note.title }}
        </div>
        <div>
          <v-btn icon="mdi-pencil" flat @click="editNote"/>
          <delete-btn :note="note" />
        </div>
      </div>
    </v-card-title>
    <v-card-item>
      <v-list v-model:opened="open" v-if="note.todo.length > 0">
        <v-list-group value="todoList">
          <template v-slot:activator="{ props }">
            <v-list-item
                v-bind="props"
                title="Todo list"
            ></v-list-item>
          </template>
          <v-list-item v-for="(todo, ind) of getTodos">
            <template v-slot:title>
              <s v-if="todo.solve">{{ todo.name }}</s>
              <div v-else>{{ todo.name }}</div>
            </template>
          </v-list-item>
          <v-list-item v-if="isCompose">
            <div class="d-flex justify-center">
              ...and more
            </div>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-card-item>
  </v-card>
</template>

<style scoped>

</style>
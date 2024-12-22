<script lang="ts">
import {defineComponent} from 'vue'
import type {Note} from "~/types/note";
import {NoteInline} from "#components";

export default defineComponent({
  name: "index",
  setup() {
    return {notesStore: useNotesStore()}
  },
  components: {NoteInline},
  data() {
    return {
      deleteDialog: {
        isOpen: false,
        noteTitle: ''
      },
    }
  },
  computed: {
    notes() {
      return this.notesStore.notes
    }
  },
  methods: {
    createNote() {
      const newNote: Note = {
        id: Date.now(),
        title: 'Пока пустая заметка',
        todo: []
      }
      this.notesStore.addNote(newNote)
      this.$router.push('/edit/' + newNote.id)
    },
  },
  mounted() {
    this.notes = Object.values(this.notesStore.loadAll())
  }
})
</script>

<template>
  <v-container>
    <v-row class="bg-white h-screen justify-center ma-auto pt-5">
      <v-col>
        <v-row class="justify-space-between pb-5 align-center">
          <h1>
            All notes
          </h1>
          <div>
            <v-btn
                variant="outlined"
                size="40"
                @click="createNote"
                flat
                icon="mdi-plus"
            />
          </div>
        </v-row>
        <v-divider class="px-0"/>
        <v-list>
          <note-inline
              v-for="note in notes"
              :key="note.id"
              :note="note"
          />
        </v-list>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
</style>
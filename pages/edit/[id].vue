<script lang="ts">
import type {Todo, Note} from "~/types/note";
import {DeleteBtn} from "#components";
import ActionDialog from "~/components/ActionDialog.vue";
import {useDisplay} from "vuetify";

export default {
  name: 'EditNote',
  components: {ActionDialog, DeleteBtn},
  setup() {
    const {smAndDown} = useDisplay()
    return {
      notesStore: useNotesStore(),
      smAndDown,
    }
  },
  data() {
    return {
      creating: false,
      note: null as null | Note,
      originalNote: null as Note | null,
      isOpenDeleteDialog: false,
      isOpenCancelChanges: false
    }
  },
  created() {
    this.loadNote();
  },
  computed: {
    isChanged() {
      return JSON.stringify(this.note) !== JSON.stringify(this.originalNote);
    },
    saveBtnText() {
      return this.isChanged ? 'Сохранить' : 'Вернуться обратно'
    },
    cardTitle() {
      return this.creating ? 'Создание заметки' : 'Изменение заметки'
    }
  },
  methods: {
    addTodo() {
      if (!this.note) return;
      this.note.todo.push({
        id: Date.now(),
        name: '',
        solve: false,
      });
    },
    loadNote() {
      const {id} = useRoute().params;
      const loadedNote = this.notesStore.loadNote(+id);
      this.note = loadedNote;
      this.originalNote = JSON.parse(JSON.stringify(loadedNote));
    },
    saveNote() {
      if (!this.note || !this.note.title) {
        alert("Название заметки не может быть пустым!");
        return;
      }
      this.notesStore.updateNote(this.note);
      this.$router.push('/');
    },
    cancelChanges(force = false) {
      if (!force) {
        this.isOpenCancelChanges = true;
        return;
      }
      this.note = JSON.parse(JSON.stringify(this.originalNote));
      this.isOpenCancelChanges = false;
    },
    deleteTodo(ind: number) {
      if (!this.note) return;
      this.note.todo.splice(ind, 1);
    }
  },
  mounted() {
    if (window.location.search.substring(1)) {
      this.creating = true
    }
    console.log();
    this.loadNote();
  }
}
</script>

<template>
  <v-container class="pa-0 pt-15" fluid>
    <div v-if="!note" class="text-center px-1">
      <div class="pb-3">
        Заметка не найдена
      </div>
      <v-btn
          :class="{'w-100' : smAndDown}"
          variant="outlined"
          @click="$router.push('/')"
          text="Вернуться назад"
      />
    </div>
    <v-card v-else class="mx-auto" :class="smAndDown ? 'w-100' : 'w-75'">
      <v-card-item v-if="note">
        <div class="d-flex flex-row justify-space-between align-center">
          <h1 class="text-h5 text-md-h4">{{ cardTitle }}</h1>

          <delete-btn :note="note" @delete="_ => $router.push('/')"/>
        </div>
        <v-card-item>
          <v-text-field
              label="Название"
              v-model="note.title"
              :error-messages="!note.title ? 'Название обязательно для заполнения' : ''"
              outlined
          />
        </v-card-item>


        <v-card-item class="align-center" :class="smAndDown ? 'pa-0' : 'pa-3'">
          <div
              class="d-flex justify-space-between align-center py-2"
              :class="smAndDown ? 'pa-0': 'px-4'"
          >
            <div>Задачи:</div>
            <v-btn @click="addTodo" icon="mdi-plus" color="primary"/>
          </div>
          <v-list class=" w-100">
            <template v-if="note.todo.length">
              <v-list-item
                  v-for="(todo, index) in note.todo"
                  :key="todo.id"
                  class="d-grid ga-5 px-0"
              >
                <template v-slot:prepend>
                  <v-checkbox v-model="todo.solve" hide-details/>
                </template>
                <template v-slot:title>
                  <v-text-field
                      autofocus
                      hide-details
                      dense
                      solo
                      v-model="todo.name"
                      placeholder="Название задачи"
                      class="w-100"
                      :error-messages="!todo.name ? 'Название задачи не может быть пустым' : ''"
                  />
                </template>
                <template v-slot:append>
                  <v-btn
                      color="error"
                      icon
                      @click="deleteTodo(index)"
                  >
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </template>
              </v-list-item>
            </template>
            <template v-else>
              <div class="text-center grey--text">
                Список задач пуст. Добавьте новую задачу.
              </div>
            </template>
          </v-list>
        </v-card-item>

        <v-card-actions class="mt-4" :class="smAndDown ? 'w-100 flex-column justify-center' : 'justify-space-between'">
          <v-btn
              :class="{'w-100' : smAndDown}"
              variant="outlined"
              @click="cancelChanges()"
              :disabled="!isChanged"
              text="Отменить изменения"
          />
          <v-btn
              :class="{'w-100' : smAndDown}"
              variant="tonal"
              @click="saveNote"
              :text="saveBtnText"
          />
        </v-card-actions>
      </v-card-item>
    </v-card>

    <action-dialog
        title="Вы точно хотите отменить изменения?"
        confirm-title-btn="Отменить"
        back-title-btn="Оставить"
        @confirm="addTodo"
        @back="cancelChanges"
    />
  </v-container>
</template>

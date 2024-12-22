<script lang="ts">
export default defineComponent({
  name: 'ActionDialog',
  props: {
    modelValue:{
      type: Boolean,
      required: false,
    },
    title: {
      type: String,
      requited: true
    },
    confirmTitleBtn: {
      type: String,
      default: ''
    },
    backTitleBtn: {
      type: String,
      default: ''
    },
  },
  computed: {
    isOpen: {
      get() {
        return this.modelValue;
      },
      set(val: boolean) {
        this.$emit('update:moduleValue', val);
      }
    }
  },
  methods: {
    confirm() {
      this.$emit('confirm');
    },
    back() {
      this.$emit('back');
    }
  }
})
</script>

<template>
<v-dialog v-model="isOpen" max-width="500px" v-bind="$attrs">
  <v-card>
    <v-card-text>
      {{title}}
    </v-card-text>

    <v-card-actions>
      <v-btn variant="tonal" @click="confirm">
        {{ confirmTitleBtn }}
      </v-btn>
      <v-spacer/>

      <v-btn variant="outlined" @click="back">
        {{ backTitleBtn }}
      </v-btn>
    </v-card-actions>
  </v-card>
</v-dialog>
</template>

<style scoped>

</style>
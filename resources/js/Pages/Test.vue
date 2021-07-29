<template>
  <div id="app">
    <div class="parent">
      <Vue3DraggableResizable
        v-model:w="w"
        v-model:h="h"
        v-model:active="active"
        :draggable="false"
        :resizable="true"
        :disabledH="true"
        :handles="['mr']"
        @activated="print('activated')"
        @deactivated="print('deactivated')"
        @resize-start="print('resize-start')"
        @resizing="print('resizing')"
        @resize-end="print('resize-end')"
      >
        This is a test example
      </Vue3DraggableResizable>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import Vue3DraggableResizable from 'vue3-draggable-resizable'
//default styles
import 'vue3-draggable-resizable/dist/Vue3DraggableResizable.css'
export default defineComponent({
  components: { Vue3DraggableResizable },
  data() {
    return {
      x: 100,
      y: 100,
      h: 100,
      w: 100,
      active: false
    }
  },
  methods: {
    print(val) {
      console.log(val)
    }
  }
})
</script>
<style>
.parent {
  width: 200px;
  height: 200px;
  position: absolute;
  top: 100px;
  left: 100px;
  border: 1px solid #000;
  user-select: none;
}
</style>
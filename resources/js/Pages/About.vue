<template>
  <div>
    <Tabs>
      <Tab title="Tab 1"> Hello from Tab 1</Tab>
      <Tab title="Tab 2"> Hello from Tab 2</Tab>
      <Tab title="Tab 3"> Hello from Tab 3</Tab>
      <Tab title="Tab 4"> Hello from Tab 4</Tab>
    </Tabs>
  </div>
</template>

<script>
import Tabs from "../Components/Tabs";
export default {
  components: {
    Tab, 
    Tabs
  }
};
</script>

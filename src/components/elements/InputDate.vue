<template>
  <form-group v-bind="$props">
    <div class="input-group">
      <flat-pickr
        style="background: white"
        v-model="value"
        class="form-control active"
        :config="config"
        :placeholder="placeholder"
      ></flat-pickr>
      <div class="input-group-append">
        <button class="btn btn-outline-primary" type="button" title="Toggle" data-toggle>
          <i class="fa fa-calendar">
            <span aria-hidden="true" class="sr-only">Toggle</span>
          </i>
        </button>
        <button class="btn btn-outline-primary" type="button" title="Clear" data-clear>
          <i class="fa fa-times">
            <span aria-hidden="true" class="sr-only">Clear</span>
          </i>
        </button>
      </div>
    </div>
  </form-group>
</template>

<script>
import _baseInput from "./_baseInput.vue";
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import "../../../public/css/bootstrap-molgenis-blue.css";

export default {
  extends: _baseInput,
  data: function() {
    return {
      config: {
        wrap: true, // set wrap to true only when using 'input-group'
        dateFormat: "Y-m-d",
        allowInput: false
      }
    };
  },
  components: {
    flatPickr
  }
};
</script>

<docs>
Example
```
<template>
  <div>
    <LayoutForm>
      <InputDate v-model="value" label="My date input label" help="Some help needed?" />
    </LayoutForm>
    <br />
    You typed: {{value}}
  </div>
</template>
<script>
export default {
  data: function() {
    return {
      value: null
    };
  }
};
</script>
```
</docs>
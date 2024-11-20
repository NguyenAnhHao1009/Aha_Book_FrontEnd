<template>
  <!-- Button trigger modal -->
  <button
    type="button"
    :class="'btn ' + btnColor"
    data-bs-toggle="modal"
    data-bs-target="#exampleModal"
  >
  {{ btnTitle }}
  </button>

  <!-- Modal -->
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content text-center">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">
            <b>{{ modalTitle }}</b>
          </h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          {{ message }}
        </div>
        <div class="modal-footer">
          <button
            type="button"
            :class="'btn ' + rejectBtnColor"
            data-bs-dismiss="modal"
            @click="onReject"
          >
            {{ rejectBtnTitle }}
          </button>
          <button
            type="button"
            :class="'btn ' + acceptBtnColor"
            data-bs-dismiss="modal"
            @click="onAccept"
          >
            {{ acceptBtnTitle }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['modalAttribute'],
  emits: ['accepted'],
  data() {
    return {
      modalTitle: this.modalAttribute.modalTitle ?? 'Inform',
      message: this.modalAttribute.message ?? 'Message',
      btnTitle: this.modalAttribute.btnTitle ?? 'Click me!',
      btnColor: this.modalAttribute.btnColor ?? 'btn-primary',
      acceptBtnColor: this.modalAttribute.acceptBtnColor ?? 'btn-primary',
      acceptBtnTitle: this.modalAttribute.acceptBtnTitle ?? 'Accept',
      rejectBtnColor:
        this.modalAttribute.rejectBtnColor ?? 'btn-outline-secondary',
      rejectBtnTitle: this.modalAttribute.rejectBtnTitle ?? 'Close',
    };
  },
  methods: {
    onAccept() {
      // Phát ra sự kiện 'accepted' khi nhấn nút Accept
      this.$emit('accepted');
    },
    onReject() {
      // Có thể thực hiện các hành động khác nếu cần
    },
  },
};
</script>

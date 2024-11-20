<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['isAuthenticated', 'getUser', 'getRole']),
  },
  mounted() {
    // Gán sự kiện click cho các router-link
    $('.router-link').on('click', () => {
      $('#navbarSupportedContent').collapse('hide')
    })
  },
  methods: {
    ...mapActions(['logout']),

    handleLogout() {
      let accept_logout = confirm('Bạn có muốn đăng xuất không?')
      if (accept_logout) {
        this.logout()
        this.$router.push({ name: 'home-page' })
      }
    },
  },
  beforeDestroy() {
    $('.router-link').off('click')
  },
}
</script>
<template>
  <nav id="nav" class="navbar navbar-expand-lg bg-white">
    <div class="container">
      <router-link to="/">
        <img
          class="logo router-link"
          src="/src/assets/img/AHA BOOK LOGO.png"
          alt=""
        />
      </router-link>

      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item mx-3">
            <router-link to="/" class="nav-link router-link text-truncate"
              >Trang chủ</router-link
            >
          </li>

          <li class="nav-item mx-3" v-if="getRole == 'NV' || getRole == 'QL'">
            <router-link
              to="/borrowed-book-tracking"
              class="nav-link router-link text-truncate"
              >Quản lý mượn sách</router-link
            >
          </li>
          <li
            class="nav-item dropdown mx-3"
            v-if="getRole == 'NV' || getRole == 'QL'"
          >
            <span
              class="nav-link dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Thông tin
            </span>
            <ul class="dropdown-menu">
              <li>
                <router-link class="dropdown-item router-link" to="/reader"
                  ><i class="fa-solid fa-users"></i> Độc giả
                </router-link>
              </li>
              <li>
                <router-link class="dropdown-item router-link" to="/publisher"
                  ><i class="fa-solid fa-newspaper"></i> Nhà xuất bản
                </router-link>
              </li>
            </ul>
          </li>
          <li class="nav-item mx-3" v-if="getRole == 'QL'">
            <router-link to="/staff" class="nav-link router-link text-truncate"
              >Quản lý nhân viên</router-link
            >
          </li>
          <li class="nav-item mx-3" v-if="getRole == 'ĐG'">
            <router-link
              to="/borrow-book"
              class="nav-link router-link text-truncate"
              >Mượn sách</router-link
            >
          </li>
          <li class="nav-item mx-3" v-if="getRole == 'ĐG'">
            <router-link
              :to="`/borrow-book-history/${getUser._id}`"
              class="nav-link router-link text-truncate"
              >Lịch sử mượn sách</router-link
            >
          </li>
        </ul>
        <div class="">
          <router-link v-if="!isAuthenticated" to="/login"
            ><span class="btn btn-outline-primary mx-2 router-link">
              Đăng nhập
            </span></router-link
          >
          <router-link v-if="!isAuthenticated" to="/signup"
            ><span class="btn btn-primary router-link">
              Đăng ký
            </span></router-link
          >

          <div v-else>
            <div class="btn-group">
              <router-link
                v-if="getRole == 'QL'"
                :to="`/detail-info-staff/${getUser._id}`"
                class="btn btn-outline-primary text-truncate router-link"
              >
                <span> QL. {{ getUser.hotennv }} </span>
              </router-link>
              <router-link
                v-if="getRole == 'NV'"
                :to="`/detail-info-staff/${getUser._id}`"
                class="btn btn-outline-primary text-truncate router-link"
              >
                <span> NV. {{ getUser.hotennv }} </span>
              </router-link>
              <router-link
                v-if="getRole == 'ĐG'"
                :to="`/detail-info-reader/${getUser._id}`"
                class="btn btn-outline-primary text-truncate router-link"
              >
                <span> ĐG. {{ getUser.holot + ' ' + getUser.ten }} </span>
              </router-link>
              <span @click="handleLogout" class="btn btn-primary router-link">
                <i class="fa-solid fa-right-from-bracket"></i>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.logo {
  height: 4em;
}
#nav {
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.296);
}

.nav-link,
button {
  font-weight: bolder;
}

.nav-link {
  color: rgb(67, 67, 67);
  transition: all 0.2s ease-in-out;
  cursor: pointer;
}

.nav-link:hover {
  color: #4f8ffd;
}

.active {
  font-weight: bolder;
}
</style>

<template>
  <v-app id="inspire">
    <v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      color="primary"
      dark
    >
      <!--      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />-->

      <v-toolbar-title style="width: 350px">
        <a href="/" class="white--text" style="text-decoration: none"
          ><v-icon>mdi-store</v-icon>&nbsp;Sneaker Store</a
        >
      </v-toolbar-title>
      <v-spacer />
      <!-- chua dang nhap -->
      <v-btn
        v-on="on"
        rounded
        style="background-color: transparent !important"
        v-if="!_status.loggedIn"
        v-show="!_status.loggedIn"
        @click="$router.push('login')"
      >
        Login
      </v-btn>
      <!-- da dang nhap -->
      <v-menu
        :offset-y="offsetY"
        :offset-x="offsetX"
        v-if="_status.loggedIn"
        v-show="_status.loggedIn"
      >
        <template v-slot:activator="{ on }">
          <v-btn
            v-on="on"
            rounded
            style="background-color: transparent !important"
          >
            <v-badge
              :content="cart.length"
              :value="cart.length"
              color="green"
              overlap
            >
              <v-icon>mdi-cart</v-icon>
            </v-badge>
          </v-btn>
        </template>
        <v-card style="text-align: center" width="350">
          <v-list>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-subtitle v-if="cart.length > 0"
                  >Now you have {{ cart.length }} items in
                  cart</v-list-item-subtitle
                >
                <v-list-item-subtitle v-if="cart.length == 0"
                  >No items in cart</v-list-item-subtitle
                >
              </v-list-item-content>
            </v-list-item>
            <v-list-item :key="product.ProductDetailId" v-for="product in cart">
              <v-list-item-avatar width="60">
                <img :src="product.Image" />
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>{{ product.ProductNm }}</v-list-item-title>
                <v-list-item-subtitle
                  >Size: {{ product.Size }} US</v-list-item-subtitle
                >
              </v-list-item-content>
            </v-list-item>
          </v-list>
          <v-card max-width="400" tile>
            <v-list dense shaped flat rounded v-if="cart.length > 0">
              <v-list-item-group color="primary">
                <v-list-item @click="$router.push('/cart')">
                  <v-list-item-title>
                    Click here to see more
                  </v-list-item-title>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-card>
        </v-card>
      </v-menu>
      <v-menu
        :offset-y="offsetY"
        :offset-x="offsetX"
        v-if="_status.loggedIn"
        v-show="_status.loggedIn"
      >
        <template v-slot:activator="{ on }">
          <v-btn
            v-on="on"
            rounded
            style="background-color: transparent !important"
          >
            <v-icon>mdi-account-circle</v-icon>
          </v-btn>
        </template>
        <v-card style="text-align: center" width="270">
          <v-list>
            <v-list-item>
              <v-list-item-avatar>
                <img
                  :src="_user.photo"
                />
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>{{ _user.fullname }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
          <v-card max-width="400" tile>
            <v-list dense shaped flat rounded>
              <v-list-item-group color="primary">
                <v-list-item @click="goProfile">
                  <v-list-item-title>
                    My Profile
                    <v-icon>mdi-account</v-icon>
                  </v-list-item-title>
                </v-list-item>
                <v-divider></v-divider>
                <v-list-item @click="logout">
                  <v-list-item-title>
                    Logout
                    <v-icon>mdi-logout</v-icon>
                  </v-list-item-title>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-card>
        </v-card>
      </v-menu>
    </v-app-bar>
    <v-content>
      <v-bottom-navigation :value="activeBtn" color="primary" horizontal>
        <a href="/" class="v-btn">
          <span>Home</span>
        </a>
        <a href="/shop" class="v-btn">
          <span>Shop</span>
        </a>
        <a
          href="/wishlist"
          class="v-btn"
          v-if="_status.loggedIn"
          v-show="_status.loggedIn"
        >
          <span>Wishlist</span>
        </a>
        <a
          href="/history"
          class="v-btn"
          style="width: 100px"
          v-if="_status.loggedIn"
          v-show="_status.loggedIn"
        >
          <span>Order History</span>
        </a>
      </v-bottom-navigation>
    </v-content>
    <router-view @updateCart="calCart" />
    <v-footer :padless="true">
      <v-card flat tile width="100%" class="secondary white--text text-center">
        <v-card-text>
          <v-card-text class="white--text">
            <h3>Since 1999</h3>
          </v-card-text>
        </v-card-text>

        <v-card-text class="white--text pt-0">
          Phasellus feugiat arcu sapien, et iaculis ipsum elementum sit amet.
          Mauris cursus commodo interdum. Praesent ut risus eget metus luctus
          accumsan id ultrices nunc. Sed at orci sed massa consectetur dignissim
          a sit amet dui. Duis commodo vitae velit et faucibus. Morbi vehicula
          lacinia malesuada. Nulla placerat augue vel ipsum ultrices, cursus
          iaculis dui sollicitudin. Vestibulum eu ipsum vel diam elementum
          tempor vel ut orci. Orci varius natoque penatibus et magnis dis
          parturient montes, nascetur ridiculus mus.
        </v-card-text>

        <v-divider></v-divider>

        <v-card-text class="white--text">
          {{ new Date().getFullYear() }} — <strong>Sneaker Store</strong>
        </v-card-text>
      </v-card>
    </v-footer>
  </v-app>
</template>
<script>
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  components: {},
  computed: {
    ...mapState("auth", ["_status", "_user"]),
  },
  data() {
    return {
      offsetY: true,
      offsetX: true,
      cart: [],
      activeBtn: 1,
    };
  },
  mounted() {
    this.initPage();
  },
  methods: {
    ...mapActions("auth", ["_logout"]),
    initPage() {
      this.calCart();
    },
    calCart() {
      if (localStorage["CART"] != null) {
        this.cart = JSON.parse(localStorage["CART"]);
      } else {
        this.cart = [];
      }
    },
    login() {
    },
    logout() {
      this._logout();
      this.$router.push("/")
      // window.location.reload();
    },
    goProfile() {
      this.$router.push('profile')
    }
  },
};
</script>

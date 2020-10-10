<template>
  <div>
    <v-container>
      <div class="row">
        <div class="col-md-12 col-sm-12 col-xs-12">
          <v-breadcrumbs class="pb-0" :items="breadcrums"></v-breadcrumbs>

          <v-row dense>
            <v-col cols="12" sm="8" class="pl-6 pt-6">
              <small
                >Showing {{ itemFrom }}-{{ itemTo }} of
                {{ _totalCount }} products</small
              >
            </v-col>
            <v-col cols="12" sm="4">
              <v-select
                class="pa-0"
                v-model="sortBy"
                :items="options"
                style="margin-bottom: -20px"
                outlined
                dense
                @change="changeOrderBy()"
              ></v-select>
            </v-col>
          </v-row>

          <v-divider></v-divider>
          <v-row class="d-flex mt-5 justify-center">
            <v-progress-circular
              :size="50"
              color="primary"
              indeterminate
              v-if="loading"
            ></v-progress-circular>
          </v-row>
          <div class="row text-center" v-if="!loading">
            <div
              class="col-md-3 col-sm-4 col-xs-12"
              :key="wishlist.product.productId"
              v-for="wishlist in _wishlist"
            >
              <v-hover v-slot:default="{ hover }">
                <v-card
                  class="mx-auto"
                  color="grey lighten-4"
                  max-width="600"
                  height="300"
                >
                  <v-img
                    class="white--text align-end"
                    :aspect-ratio="16 / 9"
                    height="170px"
                    :src="wishlist.product.photoList[0]"
                  >
                    <v-card-title class="brandName black--text"
                      >{{ wishlist.product.brandNm }}
                    </v-card-title>
                    <v-expand-transition>
                      <div
                        v-if="hover"
                        class="d-flex transition-fast-in-fast-out white darken-2 v-card--reveal display-3 white--text"
                        style="height: 100%"
                      >
                        <v-btn
                          v-if="hover"
                          :href="'/product?productId=' + wishlist.product.productId"
                          class=""
                          outlined
                          >VIEW</v-btn
                        >
                      </div>
                    </v-expand-transition>
                  </v-img>
                  <v-card-text class="text--primary">
                    <div>
                      <a
                        :href="'/product?productId=' + wishlist.product.productId"
                        style="text-decoration: none"
                        >{{ wishlist.product.productNm }}</a
                      >
                    </div>
                    <div
                      style="
                        color: red;
                        font-size: 16px;
                        font-weight: bold;
                        padding: 5px;
                      "
                    >
                      ${{ wishlist.product.price }}
                    </div>
                  </v-card-text>
                </v-card>
              </v-hover>
            </div>
          </div>
          <div
            class="text-center mt-12"
            v-if="isShowPaging"
            v-show="isShowPaging"
          >
            <v-pagination
              v-model="page"
              :length="_totalPage"
              @next="pagingProduct()"
              @input="pagingProduct()"
              @previous="pagingProduct()"
            ></v-pagination>
          </div>
        </div>
      </div>
    </v-container>
  </div>
</template>
<script>
import { mapState, mapActions, mapMutations } from "vuex";

export default {
  computed: {
    ...mapState("wishlist", ["_wishlist", "_totalCount", "_totalPage"]),
  },
  data: () => ({
    itemFrom: 1,
    itemTo: 1,
    sizeOfPage: 9,
    page: 1,
    sortBy: 0,
    loading: false,
    isShowPaging: true,
    options: [
      {
        text: "Default",
        value: 0,
      },
      {
        text: "Price: Low to High",
        value: 1,
      },
      {
        text: "Price: High to Low",
        value: 2,
      },
    ],
    breadcrums: [
      {
        text: "Home",
        disabled: false,
        href: "breadcrumbs_home",
      },
      {
        text: "Wishlist",
        disabled: true,
        href: "breadcrumbs_shirts",
      },
    ],
  }),
  mounted() {
    this.initPage();
  },
  methods: {
    ...mapActions("wishlist", ["_getAllProductInWishlist"]),
    initData() {
      this.sizeOfPage = 9;
      this.page = 1;
    },
    async initPage() {
      this.isShowPaging = false;
      this.loading = true;
      await this._getAllProductInWishlist({
        SortBy: this.sortBy,
        Size: this.sizeOfPage,
        Page: this.page,
      });
      this.calPaging();

      this.isShowPaging = true;
      this.loading = false;
    },
    changeOrderBy() {
      switch (this.sortBy) {
        case 0:
          this._productList.sort((a, b) =>
            a.productNm > b.productNm ? 1 : -1
          );
          break;
        case 1:
          this._productList.sort((a, b) => (a.price > b.price ? 1 : -1));
          break;
        case 2:
          this._productList.sort((a, b) => (a.price > b.price ? -1 : 1));
          break;
      }
    },
    calPaging() {
      this.itemFrom = this.sizeOfPage * this.page - this.sizeOfPage + 1;
      this.itemTo =
        this.page < this._totalPage
          ? this.sizeOfPage * this.page
          : this._totalCount;
    },
    async pagingProduct() {
      this.loading = true;
      this.calPaging();
      await this._getAllProductInWishlist({
        SortBy: this.sortBy,
        Size: this.sizeOfPage,
        Page: this.page,
      });
      this.loading = false;
    }
  },
};
</script>

<style>
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.8;
  position: absolute;
  width: 100%;
}
.v-responsive__content .brandName {
  height: 24px;
  padding: 0;
  justify-content: flex-end;
  font-size: 16px;
}
</style>
<template>
  <div>
    <v-container>
      <div class="row">
        <div class="col-md-3 col-sm-3 col-xs-12">
          <v-card outlined>
            <v-card-title>Filters</v-card-title>
            <v-divider></v-divider>
            <v-card-title class="pb-0">Brand</v-card-title>
            <v-container class="pt-0" fluid>
              <v-for :key="brand.brandId" v-for="brand in _brandList">
                <v-checkbox
                  v-model="brandFilter"
                  :label="brand.brandNm"
                  :value="brand.brandId"
                  hide-details
                  dense
                  @change="loadPage()"
                ></v-checkbox>
              </v-for>
            </v-container>
            <v-divider></v-divider>
            <v-card-title>Price</v-card-title>
            <v-range-slider
              v-model="rangePrice"
              :max="max"
              :min="min"
              :height="10"
              class="align-center"
              dense
              @change="loadPage()"
            ></v-range-slider>
            <v-row class="pa-2" dense>
              <v-col cols="12" sm="5">
                <v-text-field
                  :value="rangePrice[0]"
                  label="Min"
                  outlined
                  dense
                  @change="$set(rangePrice, 0, $event)"
                  @keyup="checkEnter"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="2">
                <p class="pt-2 text-center">TO</p>
              </v-col>
              <v-col cols="12" sm="5">
                <v-text-field
                  :value="rangePrice[1]"
                  label="Max"
                  outlined
                  dense
                  @change="$set(rangePrice, 1, $event)"
                  @keyup="checkEnter"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-divider></v-divider>
            <v-card-title class="pb-0">Color</v-card-title>
            <v-container class="pt-0" fluid>
              <v-radio-group v-model="colorFilter" @change="loadPage()">
                <v-row>
                  <v-col cols="6">
                    <v-radio
                      :key="color"
                      v-for="color in colors1"
                      :value="color.value"
                      :label="color.label"
                      :color="color.color"
                      hide-details
                      dense
                    ></v-radio>
                  </v-col>
                  <v-col cols="6">
                    <v-radio
                      :key="color"
                      v-for="color in colors2"
                      :value="color.value"
                      :label="color.label"
                      :color="color.color"
                      hide-details
                      dense
                    ></v-radio>
                  </v-col>
                </v-row>
              </v-radio-group>
            </v-container>
            <v-divider></v-divider>
          </v-card>
        </div>
        <div class="col-md-9 col-sm-9 col-xs-12">
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
              class="col-md-4 col-sm-6 col-xs-12"
              :key="pro.productId"
              v-for="pro in _productList"
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
                    :src="pro.photoList[0]"
                  >
                    <v-card-title class="brandName black--text"
                      >{{ pro.brandNm }}
                    </v-card-title>
                    <v-expand-transition>
                      <div
                        v-if="hover"
                        class="d-flex transition-fast-in-fast-out white darken-2 v-card--reveal display-3 white--text"
                        style="height: 100%"
                      >
                        <v-btn
                          v-if="hover"
                          :href="'/product?productId=' + pro.productId"
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
                        :href="'/product?productId=' + pro.productId"
                        style="text-decoration: none"
                        >{{ pro.productNm }}</a
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
                      ${{ pro.price }}
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
    ...mapState("brand", ["_brandList"]),
    ...mapState("product", ["_productList", "_totalCount", "_totalPage"]),
  },
  data: () => ({
    itemFrom: 1,
    itemTo: 1,
    sizeOfPage: 9,
    page: 1,
    sortBy: 0,
    loading: false,
    isShowPaging: true,
    brandFilter: [],
    sizeFilter: [],
    colorFilter: "All",
    rangePrice: [0, 5000],
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
        text: "Shopping",
        disabled: true,
        href: "breadcrumbs_shirts",
      },
    ],
    min: 0,
    max: 5000,
    colors1: [
      {
        label: "All",
        value: "All",
        color: "black darken-3",
      },
      {
        label: "White",
        value: "White",
        color: "black darken-3",
      },
      {
        label: "Black",
        value: "Black",
        color: "black darken-3",
      },
      {
        label: "Grey",
        value: "Grey",
        color: "grey darken-3",
      },
      {
        label: "Red",
        value: "Red",
        color: "red darken-3",
      },
    ],
    colors2: [
      {
        label: "Orange",
        value: "Orange",
        color: "orange darken-3",
      },
      {
        label: "Yellow",
        value: "Yellow",
        color: "yellow darken-3",
      },
      {
        label: "Green",
        value: "Green",
        color: "green darken-3",
      },
      {
        label: "Blue",
        value: "Blue",
        color: "blue darken-3",
      },
      {
        label: "Brown",
        value: "Brown",
        color: "brown darken-3",
      },
    ],
  }),
  mounted() {
    this.initPage();
  },
  methods: {
    ...mapActions("brand", ["_getBrandList"]),
    ...mapActions("product", ["_getProductList"]),
    ...mapMutations("product", ["_setProductList"]),
    initData() {
      this.sizeOfPage = 9;
      this.page = 1;
    },
    async initPage() {
      this.isShowPaging = false;
      this.loading = true;
      await this._getBrandList();
      await this._getProductList({
        SortBy: this.sortBy,
        Size: this.sizeOfPage,
        Page: this.page,
      });
      this.calPaging();

      this.isShowPaging = true;
      this.loading = false;
    },
    checkEnter(e) {
      // check cho viec bam enter o price
      if (e.keyCode === 13) {
        this.loadPage();
      }
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
      await this._getProductList({
        Color: this.colorFilter,
        MinPrice: this.rangePrice[0],
        MaxPrice: this.rangePrice[1],
        BrandList: this.brandFilter,
        SortBy: this.sortBy,
        Size: this.sizeOfPage,
        Page: this.page,
      });
      this.loading = false;
    },
    async loadPage() {
      this.initData();
      this.isShowPaging = false;
      this.loading = true;
      await this._getProductList({
        Color: this.colorFilter,
        MinPrice: this.rangePrice[0],
        MaxPrice: this.rangePrice[1],
        BrandList: this.brandFilter,
        SortBy: this.sortBy,
        Size: this.sizeOfPage,
        Page: this.page,
      });
      this.isShowPaging = true;
      this.loading = false;
      this.calPaging();
    },
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
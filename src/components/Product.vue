<template>
  <div>
    <div class="row d-flex justify-center">
      <div class="col-md-7 col-sm-12 col-xs-12">
        <v-carousel
          cycle
          hide-delimiter-background
          progress-color="black"
          interval="6000"
        >
          <v-carousel-item
            :key="photo"
            v-for="photo in _productDetail.photoList"
            :src="photo"
          >
          </v-carousel-item>
        </v-carousel>
      </div>
      <div class="col-md-4 col-sm-12 col-xs-12">
        <v-breadcrumbs class="pb-5" :items="breadcrums"></v-breadcrumbs>
        <div class="pl-6">
          <p class="display-1 mb-0">{{ _productDetail.productNm }}</p>
          <v-card-actions class="pa-0">
            <p
              class="headline font-weight-light pt-3"
              v-if="_productDetail.discount > 0"
            >
              ${{ currentDetail.price * (1 - _productDetail.discount) }}
              <del style="" class="subtitle-1 font-weight-thin"
                >${{ currentDetail.price }}</del
              >
            </p>
            <p
              class="headline font-weight-light pt-3"
              v-if="_productDetail.discount == 0"
            >
              ${{ currentDetail.price }}
            </p>
            <v-spacer></v-spacer>
            <v-rating
              v-model="rating"
              class=""
              background-color="warning lighten-3"
              color="warning"
              dense
            ></v-rating>
            <span class="body-2 font-weight-thin"> 25 REVIEWS</span>
          </v-card-actions>
          <p class="title">SIZE</p>
          <v-radio-group v-model="currentSize" row @change="changeSize()">
            <v-radio
              class="mb-2"
              :label="detail.size + ' US'"
              :value="detail.size"
              :key="detail.id"
              v-for="detail in _productDetail.productDetailList"
            ></v-radio>
          </v-radio-group>
          <p class="title">ITEMS</p>

          <v-text-field
            v-model="quantity"
            outlined
            style="width: 100px"
            type="number"
            min="1"
            :max="maxQuantity"
            dense
          ></v-text-field>
          <v-btn
            class="primary white--text"
            outlined
            tile
            dense
            @click="addToCart()"
            ><v-icon>mdi-cart</v-icon> ADD TO CART</v-btn
          >
          <v-btn class="ml-4" outlined tile>ADD TO WISHLIST</v-btn>
        </div>
      </div>
    </div>
    <div class="mt-5 row d-flex justify-center">
      <div class="col-sm-10 col-xs-10 col-md-10">
        <v-card-text class="pa-0 pt-4" tile outlined>
          <p class="headline font-weight pt-3 text-center">DESCRIPTION</p>
          <v-divider></v-divider>
          <p class="subtitle-1 font-weight-thin">
            {{ _productDetail.description }}
          </p>
        </v-card-text>
      </div>
    </div>
    <div class="row d-flex justify-center">
      <div class="col-sm-10 col-xs-10 col-md-10">
        <v-card-text class="pa-0 pt-4" tile outlined>
          <p class="subtitle-1 font-weight-light pt-3 text-center">
            YOU MIGHT ALSO LIKE
          </p>
          <v-divider></v-divider>
          <div class="row text-center">
            <div
              class="col-md-3 col-sm-6 col-xs-12"
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
        </v-card-text>
      </div>
    </div>
    <v-card class="accent">
      <v-container>
        <v-row no-gutters>
          <v-col class="col-12 col-md-4 col-sm-12">
            <v-row>
              <v-col class="col-12 col-sm-3 pr-4 hidden-sm-only" align="right">
                <v-icon class="display-2">mdi-truck</v-icon>
              </v-col>
              <v-col class="col-12 col-sm-9 pr-4">
                <h3 class="font-weight-light">FREE SHIPPING & RETURN</h3>
                <p class="font-weight-thin">Free Shipping over $300</p>
              </v-col>
            </v-row>
          </v-col>
          <v-col class="col-12 col-md-4 col-sm-12">
            <v-row>
              <v-col class="col-12 col-sm-3 pr-4" align="right">
                <v-icon class="display-2">mdi-cash-usd</v-icon>
              </v-col>
              <v-col class="col-12 col-sm-9 pr-4">
                <h3 class="font-weight-light">MONEY BACK GUARANTEE</h3>
                <p class="font-weight-thin">30 Days Money Back Guarantee</p>
              </v-col>
            </v-row>
          </v-col>
          <v-col class="col-12 col-md-4 col-sm-12">
            <v-row>
              <v-col class="col-12 col-sm-3 pr-4" align="right">
                <v-icon class="display-2">mdi-headset</v-icon>
              </v-col>
              <v-col class="col-12 col-sm-9 pr-4">
                <h3 class="font-weight-light">020-800-456-747</h3>
                <p class="font-weight-thin">24/7 Available Support</p>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>
<script>
import { mapState, mapActions, mapMutations } from "vuex";

export default {
  computed: {
    ...mapState("productDetail", ["_productDetail"]),
    ...mapState("product", ["_productList", "_totalCount", "_totalPage"]),
  },
  data: () => ({
    quantity: 1,
    maxQuantity: 1,
    currentDetail: {},
    currentSize: 0,
    rating: 4.5,
    breadcrums: [
      {
        text: "Home",
        disabled: false,
        href: "breadcrumbs_home",
      },
      {
        text: "Shopping",
        disabled: false,
        href: "breadcrumbs_clothing",
      },
      {
        text: "Product",
        disabled: true,
        href: "breadcrumbs_shirts",
      },
    ],
    item: 5,
    items: [
      {
        avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
        title: "Lorem ipsum dolor?",
        subtitle:
          "<span class='text--primary'>Ali Connors</span> &mdash; Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nisl tincidunt eget nullam non. Tincidunt arcu non sodales neque sodales ut etiam. Lectus arcu bibendum at varius vel pharetra. Morbi tristique senectus et netus et malesuada.\n" +
          "\n",
      },
      {
        avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
        title:
          'Lorem ipsum dolor <span class="grey--text text--lighten-1">4</span>',
        subtitle:
          "<span class='text--primary'>to Alex, Scott, Jennifer</span> &mdash; Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
      },
      {
        avatar: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
        title: "Lorem ipsum dolor",
        subtitle:
          "<span class='text--primary'>Sandra Adams</span> &mdash; Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      },
      {
        avatar: "https://cdn.vuetifyjs.com/images/lists/4.jpg",
        title: "Lorem ipsum dolor",
        subtitle: "",
      },
      {
        avatar: "https://cdn.vuetifyjs.com/images/lists/5.jpg",
        title: "Lorem ipsum dolor",
        subtitle:
          "<span class='text--primary'>Britta Holt</span> &mdash; Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      },
    ],
  }),
  mounted() {
    this.initPage();
  },
  methods: {
    ...mapActions("productDetail", ["_getProductDetail"]),
    ...mapActions("product", ["_getProductList"]),
    ...mapActions("cart", ["_addItemToCart"]),
    async initPage() {
      var productId = this.$route.query.productId;
      await this._getProductDetail({ productId: productId });
      await this._getProductList({
        Page: Math.floor(Math.random() * 8) + 1,
        SortBy: Math.floor(Math.random() * 3),
        Size: 4,
      });
      this.currentDetail = this._productDetail.productDetailList[0];
      this.currentSize = this.currentDetail.size;
      this.calMaxQuantity();
    },
    calMaxQuantity() {
      let cart = localStorage["CART"];
      if (cart != null) {
        cart = JSON.parse(localStorage["CART"]);
        let i = cart.findIndex((s) => s.DetailId == this.currentDetail.id);
        if (i == -1) {
          this.maxQuantity = this.currentDetail.quantity;
        } else {
          this.maxQuantity = this.currentDetail.quantity - cart[i].Quantity;
        }
      } else {
        this.maxQuantity = this.currentDetail.quantity;
      }
      console.log("this.maxQuantity", this.maxQuantity);
    },
    changeSize() {
      this.currentDetail = this._productDetail.productDetailList.find(
        (t) => t.size == this.currentSize
      );
      this.quantity = 1;
      this.calMaxQuantity();
      console.log("this.currentDetail", this.currentDetail);
    },
    addToCart() {
      if (this.quantity == 0) {
        alert("This quantity must be more than 1!");
      } else if (this.maxQuantity < this.quantity) {
        alert("This shoes is sold out!");
      } else {
        this._addItemToCart({
          DetailId: this.currentDetail.id,
          Size: this.currentDetail.size,
          Quantity: this.quantity,
          Price:
            this._productDetail.discount > 0
              ? this.currentDetail.price * (1 - this._productDetail.discount)
              : this.currentDetail.price,
          Image: this._productDetail.photoList[0],
          ProductNm: this._productDetail.productNm,
          Discount: this._productDetail.discount,
          BrandNm: this._productDetail.brandNm,
        });
        this.calMaxQuantity();
      }
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
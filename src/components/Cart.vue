<template>
  <div>
    <v-container v-if="cart.length > 0">
      <p class="display-3 font-weight-light text-center pa-4">SHOPPING CART</p>
      <v-row>
        <v-col :cols="12" md="12" sm="12">
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-center">ITEM</th>
                  <th class="text-center">Size</th>
                  <th class="text-center">QUANTITY</th>
                  <th class="text-center">PRICE</th>
                  <th class="text-center">Discount</th>
                  <th class="text-center">TOTAL</th>
                  <th class="text-center"></th>
                </tr>
              </thead>
              <tbody>
                <tr :key="product.ProductDetailId" v-for="product in cart">
                  <td>
                    <v-list-item key="1">
                      <v-list-item-avatar height="75" width="120" horizontal>
                        <v-img :src="product.Image"></v-img>
                      </v-list-item-avatar>

                      <v-list-item-content>
                        <v-list-item-title>
                          <router-link
                            :to="{
                              path: 'product',
                              query: { productId: product.ProductId },
                            }"
                            style="text-decoration: none"
                          >
                            {{ product.ProductNm }}</router-link
                          >
                        </v-list-item-title>
                        <v-list-item-subtitle>{{
                          product.BrandNm
                        }}</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </td>
                  <td>{{ product.Size }}</td>
                  <td>
                    <v-text-field
                      class="pt-10"
                      label="Outlined"
                      style="width: 80px"
                      single-line
                      outlined
                      v-model="product.Quantity"
                      type="number"
                      @change="
                        changeQuantity(
                          product.ProductDetailId,
                          product.Quantity
                        )
                      "
                    ></v-text-field>
                  </td>
                  <td>${{ product.Price }}</td>
                  <td>{{ product.Discount * 100 }}%</td>
                  <td>
                    ${{
                      product.Quantity * product.Price * (1 - product.Discount)
                    }}
                  </td>
                  <td>
                    <a @click="removeItemFromCart(product.ProductDetailId)"
                      >X</a
                    >
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-col>
      </v-row>
      <v-row class="d-flex justify-end">
        <v-col :cols="12" md="3" sm="12" style="background-color: lightgray">
          <p class="headline">Order Summary</p>
          <p class="overline">
            Shipping and additional costs are calculated based on values you
            have entered.
          </p>
          <v-simple-table>
            <template v-slot:default>
              <tbody>
                <tr>
                  <td>Order Subtotal</td>
                  <td class="text-right" style="width: 50px">
                    ${{ subTotal }}
                  </td>
                </tr>
                <tr>
                  <td>Shipping Charges</td>
                  <td class="text-right" style="width: 50px">
                    ${{ shippingCharges }}
                  </td>
                </tr>
                <tr>
                  <td>Tax</td>
                  <td class="text-right" style="width: 50px">
                    ${{ subTotal * 0.1 }}
                  </td>
                </tr>
                <tr>
                  <td>Total</td>
                  <td class="text-right" style="width: 50px">
                    <b
                      >${{ subTotal * 1 + shippingCharges + subTotal * 0.1 }}</b
                    >
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
          <div class="text-center">
            <v-btn
              class="primary white--text mt-5"
              outlined
              @click="clickToContinue()"
              >PROCEED TO PAY</v-btn
            >
          </div>
        </v-col>
      </v-row>
    </v-container>
    <v-container v-if="cart.length == 0">
      <p class="display-3 font-weight-light text-center pa-4">SHOPPING CART</p>
      <v-row>
        <v-col cols="12">
          <h1 style="color: grey; text-align: center">CART IS EMPTY</h1>
        </v-col>
        <v-col cols="12">
          <h2 style="color: grey; text-align: center">
            Please go shopping at <a  @click="$router.push('shop')">Here</a>
          </h2>
        </v-col>
      </v-row>
    </v-container>
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
  },
  filters: {
    filterPrice(value) {
      return Math.round10(value, -2);
    },
  },
  data: () => ({
    cart: [],
    subTotal: 0,
    shippingCharges: 10
  }),
  mounted() {
    this.initPage();
  },
  methods: {
    ...mapActions("cart", ["_removeItemFromCart"]),
    ...mapActions("productDetail", ["_getDetail"]),
    initPage() {
      if (localStorage["CART"] != null) {
        this.cart = JSON.parse(localStorage["CART"]);
      }
      this.calSubTotal();
    },
    calSubTotal() {
      if (this.cart.length > 0) {
        this.subTotal = 0;
        this.cart.forEach((orderDetail) => {
          this.subTotal +=
            orderDetail.Quantity *
            orderDetail.Price *
            (1 - orderDetail.Discount);
        });
      }
    },
    async changeQuantity(id, quantity) {
      await this._getDetail(id);
      debugger;
      if (this._productDetail.quantity < quantity) {
        alert("Products in excess of permitted quantity");
        this.initPage();
      } else {
        localStorage.setItem("CART", JSON.stringify(this.cart));
        this.calSubTotal();
      }
    },
    removeItemFromCart(ProductDetailId) {
      this._removeItemFromCart(ProductDetailId);
      this.$emit("updateCart");
      this.initPage();
    },
    clickToContinue() {
      this.$router.push("/checkout");
    },
  },
};
</script>


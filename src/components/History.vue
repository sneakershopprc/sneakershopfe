<template>
  <v-container>
    <p class="display-3 font-weight-light text-center pa-4">ORDER HISTORY</p>
    <!-- <v-row>
        <v-col cols="12">
          <h1 style="color: grey; text-align: center">YOU DON'T HAVE ANY ORDER</h1>
        </v-col>
        <v-col cols="12">
          <h2 style="color: grey; text-align: center">
            Please go shopping at <a href="/shop">Here</a>
          </h2>
        </v-col>
      </v-row>-->
    <v-container :loading="loading">
      <v-card
        class="mb-10"
        style="text-align: center"
        rounded
        v-for="(order, index) in _orderList"
        :key="order.orderId"
      >
        <v-card-title>
          <v-row>
            <v-col cols="4" align="start"> Order {{ index + 1 }} </v-col>
            <v-col cols="8" align="end">
              Order Date: {{ order.insDatetime | formatDatetime }} -
              <span
                :class="{
                  Waiting: order.status === 'Waiting',
                  Confirm: order.status === 'Confirm',
                  Cancel: order.status === 'Cancel',
                }"
              >
                {{ order.status }}</span
              >
            </v-col>
          </v-row>
        </v-card-title>
        <v-divider></v-divider>
        <v-container grid-list-xs>
          <v-card outlined>
            <v-simple-table>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">ITEM</th>
                    <th class="text-center">PRICE</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    :key="index"
                    v-for="(orderDetail, index) in order.orderDetails"
                  >
                    <td style="text-align: left">
                      <v-list-item key="1">
                        <v-list-item-avatar height="75" width="120" horizontal>
                          <v-img
                            :src="JSON.parse(orderDetail.product).Photo"
                          ></v-img>
                        </v-list-item-avatar>

                        <v-list-item-content>
                          <v-list-item-title>
                            <router-link
                              :to="{
                                path: 'product',
                                query: {
                                  productId: JSON.parse(orderDetail.product)
                                    .ProductId,
                                },
                              }"
                              >{{
                                JSON.parse(orderDetail.product).ProductNm
                              }}</router-link
                            >
                          </v-list-item-title>
                          <v-list-item-subtitle
                            >Size:
                            {{ JSON.parse(orderDetail.product).Size }}
                            US</v-list-item-subtitle
                          >
                          <v-list-item-subtitle
                            >x {{ orderDetail.quantity }}</v-list-item-subtitle
                          >
                        </v-list-item-content>
                      </v-list-item>
                    </td>
                    <td>
                      <p v-if="JSON.parse(orderDetail.product).Discount > 0">
                        <del style="" class="subtitle-1 font-weight-thin"
                          >${{ JSON.parse(orderDetail.product).Price }}</del
                        >
                        <br />
                        ${{
                          JSON.parse(orderDetail.product).Price *
                          (1 - JSON.parse(orderDetail.product).Discount)
                        }}
                      </p>
                      <p v-if="JSON.parse(orderDetail.product).Discount == 0">
                        ${{ JSON.parse(orderDetail.product).Price }}
                      </p>
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-card>
        </v-container>
        <v-divider></v-divider>
        <v-row class="mx-10">
          <v-col cols="12" align="end">
            <h3>
              <v-icon>mdi-basket</v-icon>

              Total: ${{ total[index] }}
            </h3>
          </v-col>
        </v-row>
      </v-card>
    </v-container>
    <v-pagination
      v-model="page"
      :length="_totalPage"
      @next="initPage()"
      @input="initPage()"
      @previous="initPage()"
    ></v-pagination>
  </v-container>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import moment from "moment";
export default {
  computed: {
    ...mapState("order", ["_orderList", "_totalCount", "_totalPage"]),
  },
  filters: {
    formatDatetime(val) {
      if (val) {
        return moment(val).format("HH:mm DD/MM/YYYY");
      }
      return "";
    },
  },
  data: () => ({
    total: [],
    itemFrom: 1,
    itemTo: 1,
    sizeOfPage: 2,
    page: 1,
    sortBy: 0,
    loading: false,
  }),
  mounted() {
    this.initPage();
  },
  methods: {
    ...mapActions("order", ["_getOrderList"]),
    initData() {
      this.sizeOfPage = 2;
      this.page = 1;
    },
    async initPage() {
      this.loading = true;
      await this._getOrderList({
        SortBy: this.sortBy,
        Size: this.sizeOfPage,
        Page: this.page,
      });
      // tinh total
      for (let i = 0; i < this._orderList.length; i++) {
        this.total[i] = 0;
        let orderDetails = this._orderList[i].orderDetails;
        for (let j = 0; j < orderDetails.length; j++) {
          let orderDetail = orderDetails[j];
          let product = JSON.parse(orderDetail.product);
          this.total[i] += product.Price * (1 - product.Discount);
        }
      }
      this.loading = false;
    },
  },
};
</script>

<style>
.Waiting {
  color: white;
  background-color: #f39c12;
  padding: 4px;
}
.Confirm {
  color: white;
  background-color: green;
  padding: 4px;
}
.Cancel {
  color: white;
  background-color: #e74c3c;
  padding: 4px;
}
</style>
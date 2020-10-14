<template>
  <div>
    <v-carousel hide-delimiters>
      <v-carousel-item :src="require('../assets/img/home/slider4.jpg')">
        <v-row class="fill-height" align="center" justify="center">
          <div class="display-2 white--text pl-5 pr-5 hidden-sm-only">
            <strong>Upto 60% + Extra 10%</strong>
          </div>
          <br />
        </v-row>
      </v-carousel-item>
      <v-carousel-item :src="require('../assets/img/home/slider2.jpg')">
        <v-row class="fill-height" align="center" justify="center">
          <div class="display-2 white--text pl-5 pr-5 hidden-sm-only">
            <strong>Upto 60% + Extra 10%</strong>
          </div>
          <br />
        </v-row>
      </v-carousel-item>
      <v-carousel-item :src="require('../assets/img/home/slider3.jpg')">
        <v-row class="fill-height" align="center" justify="center">
          <div class="display-2 white--text pl-5 pr-5 hidden-sm-only">
            <strong>Upto 60% + Extra 10%</strong>
          </div>
          <br />
        </v-row>
      </v-carousel-item>
      <v-carousel-item :src="require('../assets/img/home/slider1.jpg')">
        <v-row class="fill-height" align="center" justify="center">
          <div class="display-2 white--text pl-5 pr-5 hidden-sm-only">
            <strong>Upto 60% + Extra 10%</strong>
          </div>
          <br />
        </v-row>
      </v-carousel-item>
    </v-carousel>
    <div class="pl-4 pr-4 row">
      <div class="col-md-6 col-sm-6 col-xs-12">
        <v-card>
          <v-img
            :src="require('../assets/img/home/slider2.jpg')"
            class="white--text align-center"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            height="400px"
          >
            <h1 class="text-center font-size">Top Picks</h1>
            <div class="text-center">
              <v-btn href="/shop" class="white--text" outlined>SHOP NOW</v-btn>
            </div>

            <!--            <v-expand-transition>-->
            <!--              <div-->
            <!--                v-if="hover"-->
            <!--                class="d-flex transition-fast-in-fast-out orange darken-2 v-card&#45;&#45;reveal display-3 white&#45;&#45;text"-->
            <!--                style="height: 100%;"-->
            <!--              >-->

            <!--                <h3>Top Picks</h3><br/>-->
            <!--                <h3>sdfs</h3>-->
            <!--              </div>-->
            <!--            </v-expand-transition>-->
          </v-img>
        </v-card>
        <!--        </v-hover>-->
      </div>
      <div class="col-md-6 col-sm-6 col-xs-12">
        <v-card>
          <v-img
            :src="require('../assets/img/home/slider3.jpg')"
            class="white--text align-center"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            height="400px"
          >
            <h1 class="text-center font-size">New Arrivals</h1>
            <div class="text-center">
              <v-btn href="/shop" class="white--text" outlined>SHOP NOW</v-btn>
            </div>
          </v-img>
        </v-card>
      </div>
    </div>
    <div class="pl-4 pr-4 row">
      <div class="col-md-4 col-sm-4 col-xs-12">
        <v-card outlined>
          <v-img
            :src="require('../assets/img/home/deal2.jpg')"
            class="white--text align-center"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            height="300px"
          >
            <h1 class="text-center font-size">Lorem & Ipsum</h1>
            <div class="text-center mt-2">
              <v-btn class="white--text caption" href="/shop" text
                >SHOP NOW
                <v-icon class="white--text caption"
                  >mdi-arrow-right</v-icon
                ></v-btn
              >
            </div>
          </v-img>
        </v-card>
      </div>
      <div class="col-md-4 col-sm-4 col-xs-12">
        <v-card outlined>
          <v-img
            :src="require('../assets/img/home/deal3.jpg')"
            class="white--text align-center"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            height="300px"
          >
            <h1 class="text-center font-size">Lorem & Ipsum</h1>
            <div class="text-center mt-2">
              <v-btn class="white--text caption" href="/shop" text
                >SHOP NOW
                <v-icon class="white--text caption"
                  >mdi-arrow-right</v-icon
                ></v-btn
              >
            </div>
          </v-img>
        </v-card>
      </div>
      <div class="col-md-4 col-sm-4 col-xs-12">
        <v-card outlined>
          <v-img
            :src="require('../assets/img/home/deal4.jpg')"
            class="white--text align-center"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            height="300px"
          >
            <h1 class="text-center font-size">Lorem & Ipsum</h1>
            <div class="text-center mt-2">
              <v-btn class="white--text caption" href="/shop" text
                >SHOP NOW
                <v-icon class="white--text caption"
                  >mdi-arrow-right</v-icon
                ></v-btn
              >
            </div>
          </v-img>
        </v-card>
      </div>
    </div>
    <v-container>
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
    </v-container>
    <v-card class="accent">
      <v-container>
        <v-row no-gutters>
          <v-col class="col-12 col-md-4 col-sm-12">
            <v-row>
              <v-col class="col-12 col-sm-3 pr-4" align="right">
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
    ...mapState("product", ["_productList", "_totalCount", "_totalPage"]),
  },
  data() {
    return {
      items: [
        { title: "Click Me" },
        { title: "Click Me" },
        { title: "Click Me" },
        { title: "Click Me 2" },
      ],
      activeBtn: 1,
      colors: [
        "indigo",
        "warning",
        "pink darken-2",
        "red lighten-1",
        "deep-purple accent-4",
      ],
      slides: ["First", "Second", "Third", "Fourth", "Fifth"],
    };
  },
  mounted() {
    this.initPage();
  },
  methods: {
    ...mapActions("product", ["_getProductList"]),

    async initPage() {
      await this._getProductList({
        Page: Math.floor(Math.random() * 8) + 1,
        SortBy: Math.floor(Math.random() * 3),
        Size: 4,
      });
    },
  },
};
</script>
<style>
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.5;
  position: absolute;
  width: 100%;
}
</style>


<template>
  <div>
    <v-carousel hide-delimiters>
      <v-carousel-item src="https://www.converse.com.vn/pictures/catalog/home/slide-homepage/banner-slide-FOG.jpg">
        <v-row class="fill-height" align="center" justify="center">
          <div class="display-2 hidden-sm-only">
            <strong style="position: absolute; left: 10%; bottom: 2%;">Upto 60% + Extra 10%</strong>
          </div>
          <br />
        </v-row>
      </v-carousel-item>
      <v-carousel-item src="https://brand.assets.adidas.com/image/upload/f_auto,q_auto,fl_lossy/enUS/Images/xcat-ss20-nav-clp-mens-sneakers-tc-large-d_tcm221-509820.jpg">
        <v-row class="fill-height" align="center" justify="center">
          <div class="display-2 white--text hidden-sm-only">
            <strong>Upto 40% + Extra 10%</strong>
          </div>
          <br />
        </v-row>
      </v-carousel-item>
      <v-carousel-item src="https://img.bleacherreport.net/img/slides/photos/004/367/989/014fc49d06c8fe2e38662b25d9f6ab2b_crop_exact.jpg?w=2975&h=2048&q=85">
        <v-row class="fill-height" align="center" justify="center">
          <div class="display-2 white--text hidden-sm-only">
            <strong  style="position: absolute; right: 10%; bottom: 18%;">Sale Upto 50%</strong>
          </div>
          <br />
        </v-row>
      </v-carousel-item>
      <v-carousel-item src="https://cdn.vox-cdn.com/thumbor/1ieEr5JfJiBhBPS_GKG0n2N2Ai4=/1400x0/filters:no_upscale()/cdn.vox-cdn.com/uploads/chorus_asset/file/13681381/fshivakumar_181109_3078_0020.jpg">
        <v-row class="fill-height" align="center" justify="center">
          <div class="display-2 white--text hidden-sm-only">
            <strong style="position: absolute; right: 5%; top: 2%;">Upto 60% + Extra 10%</strong>
          </div>
          <br />
        </v-row>
      </v-carousel-item>
    </v-carousel>
    <div class="pt-4 pb-4 pl-6 pr-6 row">
      <div class="col-md-6 col-sm-6 col-xs-12">
        <v-card>
          <v-img
            src="https://www.famousfootwear.com/c/-/media/project/famousfootwear/brand-landing-pages/converse/2020/bts/mobile/fashion.jpg?h=1310&w=1388&la=en&hash=7117AF2B7A790682ACACBE070708C6B595E58F75"
            class="white--text align-center"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            height="400px"
          >
            <h1 class="text-center font-size">Top Picks</h1>
            <div class="text-center">
              <v-btn  @click="$router.push('shop')" class="white--text" outlined>SHOP NOW</v-btn>
            </div>
          </v-img>
        </v-card>
      </div>
      <div class="col-md-6 col-sm-6 col-xs-12">
        <v-card>
          <v-img
            src="https://static.dezeen.com/uploads/2019/04/futurecraft-loop-adidas-design-shoes-plastic_dezeen_2364_sq2.jpg"
            class="white--text align-center"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            height="400px"
          >
            <h1 class="text-center font-size">New Arrivals</h1>
            <div class="text-center">
              <v-btn  @click="$router.push('shop')" class="white--text" outlined>SHOP NOW</v-btn>
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
                            @click="$router.push(`/product?productId=${pro.productId}`)"
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
                          @click="$router.push(`/product?productId=${pro.productId}`)"
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


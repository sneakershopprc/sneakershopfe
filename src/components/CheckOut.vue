<template>
  <div>
    <v-container>
      <p class="display-3 font-weight-light text-center pa-4">
        CUSTOMER INFORMATION
      </p>
      <v-row>
        <v-col :cols="12" md="9" sm="12">
          <v-card flat>
            <v-snackbar v-model="snackbar" absolute top right color="green">
              <span>Checkout successful!</span>
              <v-icon dark> mdi-checkbox-marked-circle </v-icon>
            </v-snackbar>
            <v-form ref="form" lazy-validation @submit.prevent="submit">
              <v-container fluid>
                <v-row>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="form.fullname"
                      :rules="rules.fullname"
                      color="blue darken-2"
                      label="Full Name"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="form.phonenumber"
                      :rules="rules.phonenumber"
                      color="blue darken-2"
                      label="Phone Number"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12">
                    <v-select
                      v-model="form.city"
                      :items="cityJson"
                      item-text="name"
                      item-value="id"
                      color="blue darken-2"
                      label="City"
                      required
                      @change="loadDistrict()"
                    ></v-select>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-select
                      v-model="form.district"
                      :items="districts"
                      item-text="name"
                      item-value="id"
                      color="blue darken-2"
                      label="District"
                      required
                      @change="loadWard()"
                    ></v-select>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-select
                      v-model="form.ward"
                      :items="wards"
                      item-text="name"
                      color="blue darken-2"
                      label="Ward"
                      required
                    ></v-select>
                  </v-col>
                  <v-col cols="12">
                    <v-textarea
                      v-model="form.address"
                      :rules="rules.address"
                      color="blue darken-2"
                    >
                      <template v-slot:label>
                        <div>Address <small>(required)</small></div>
                      </template>
                    </v-textarea>
                  </v-col>
                </v-row>
              </v-container>
              <v-card-actions>
                <v-btn text @click="resetForm">Back </v-btn>
                <v-spacer></v-spacer>
                <v-btn text color="primary" type="submit" :loading="isLoading">
                  CheckOut
                </v-btn>
              </v-card-actions>
            </v-form>
          </v-card>
        </v-col>

        <v-col :cols="12" md="3" sm="12">
          <v-container style="background-color: lightgray">
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
                        >${{
                          subTotal * 1 + shippingCharges + subTotal * 0.1
                        }}</b
                      >
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-container>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import cityJson from "../assets/json/city.json";
import districtJson from "../assets/json/district.json";
import wardJson from "../assets/json/ward.json";
export default {
  computed: {
    formIsValid() {
      return this.$refs.form.validate();
    },
  },
  data() {
    const regex = /(03|07|08|09)+([0-9]{8})\b/g;
    const defaultForm = Object.freeze({
      fullname: "",
      city: "",
      district: "",
      ward: "",
      address: "",
      phonenumber: "",
    });

    return {
      isLoading: false,
      cart: {},
      subTotal: 0,
      shippingCharges: 10,
      cityJson: cityJson,
      districtJson: districtJson,
      districts: [],
      wardJson: wardJson,
      wards: [],
      form: Object.assign({}, defaultForm),
      rules: {
        fullname: [
          (val) => (val || "").length > 0 || "This field is required",
          (val) =>
            (val && val.length < 200) || "Full Name have length less than 200",
        ],
        address: [
          (val) => (val || "").length > 0 || "This field is required",
          (val) =>
            (val && val.length < 500) || "Address have length less than 500",
        ],
        phonenumber: [
          (val) => (val || "").length > 0 || "This field is required",
          (val) =>
            (val && val.match(regex)) || "Your phone number is incorrect",
        ],
      },
      animals: ["Dog", "Cat", "Rabbit", "Turtle", "Snake"],
      conditions: false,
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero. Sed dignissim lacinia nunc.",
      snackbar: false,
      terms: false,
      defaultForm,
    };
  },
  mounted() {
    if (
      localStorage["CART"] != null &&
      JSON.parse(localStorage["CART"]).length > 0
    ) {
      this.initPage();
    } else {
      location.reload();
      this.$router.push("/shop");
    }
  },
  methods: {
    ...mapActions("cart", ["_checkOut"]),
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
    loadDistrict() {
      this.districts = this.districtJson.filter(
        (s) => s.tinh_id == this.form.city
      );
      this.wards = [];
    },
    loadWard() {
      this.wards = this.wardJson.filter(
        (s) => s.huyen_id == this.form.district
      );
    },
    resetForm() {
      this.form = Object.assign({}, this.defaultForm);
      this.$refs.form.reset();
    },
    async submit() {
      this.isLoading = true;
      const valid = this.$refs.form.validate();
      if (valid) {
        let address =
          this.form.address +
          ", " +
          this.form.ward +
          ", " +
          this.districtJson.find((s) => s.id == this.form.district).name +
          ", " +
          this.cityJson.find((s) => s.id == this.form.city).name;
        await this._checkOut({
          ReceiverNm: this.form.fullname,
          Phonenumber: this.form.phonenumber,
          ShippingAddress: address,
        });
        this.snackbar = true;
        this.resetForm();
        location.reload();
        this.$router.push("/shop");
      }
      this.isLoading = false;
    },
  },
};
</script>

<style>
</style>
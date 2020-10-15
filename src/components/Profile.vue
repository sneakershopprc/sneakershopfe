<template>
  <v-container
    id="user-profile"
    fluid
    tag="section"
    style="padding: 0 100px"
  >
    <v-row justify="center">
      <v-col
        cols="12"
        md="8"
      >
        <v-card :loading="this.isLoading">
          <template v-slot:heading>
            <div class="display-2 font-weight-light">
              <span style="margin-right: 15px">Edit Profile</span>
              <v-progress-circular
                v-if="isLoading"
                indeterminate
                color="white"
              />
            </div>
          </template>

          <v-form>
            <v-container class="py-0">
              <v-row>
                <v-col
                  cols="12"
                  md="6"
                >
                  <v-text-field
                    label="Username"
                    :value="_user.username"
                    disabled
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                >
                </v-col>

                <v-col
                  cols="12"
                  md="6"
                >
                  <v-text-field
                    v-model="_user.fullname"
                    label="Fullname"
                    class="purple-input"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="6"
                >
                  <v-text-field
                    v-model="_user.email"
                    label="Email"
                    class="purple-input"
                  />
                </v-col>

                <v-col cols="6">
                  <v-file-input
                    v-model="imageFile"
                    :rules="rules"
                    accept="image/*"
                    placeholder="Pick an avatar"
                    prepend-icon="mdi-camera"
                    label="Avatar"
                    @change="uploadImg"
                    @click:clear="cancelImg"
                  />
                </v-col>

                <v-col
                  cols="6"
                  class="text-center"
                >
                  <img
                    v-if="previewAvatarUrl != null"
                    style="margin: 15px 0"
                    height="100"
                    :src="previewAvatarUrl"
                  >
                </v-col>

                <v-col
                  cols="12"
                  class="text-right"
                >
                  <v-btn
                    color="success"
                    class="mr-0"
                    :disabled="isLoading"
                    @click="update"
                  >
                    Update Profile
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-card>
      </v-col>

      <v-col
        cols="12"
        md="4"
      >
        <v-card
          class="v-card-profile"
        >
          <v-card-text class="text-center">
            <div>
                <img :src="tmpUser.photo" width="200"/>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-snackbar
      v-model="snackbarShow"
      :timeout="5000"
    >
      {{ message }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="pink"
          text
          v-bind="attrs"
          @click="snackbarShow = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
  import { mapActions, mapState } from 'vuex'
  import firebase from 'firebase'
  import moment from 'moment'

  export default {
    name: 'Profile',
    data () {
      return {
        profile: {},
        tmpUser: {},
        isLoading: false,
        imageFile: null,
        previewAvatarUrl: null,
        snackbarShow: false,
        message: '',
        rules: [
          value => !value || value.size < 20000000 || 'Image size should be less than 20 MB!',
        ],
      }
    },
    computed: {
      ...mapState('auth', ['_user']),
    },
    mounted() {
        this.setTmpUserVal();
    },
    methods: {
      ...mapActions('auth', ['_updateProfile']),

      setTmpUserVal () {
        this.tmpUser = {
          fullname: this._user.fullname,
          username: this._user.username,
          photo: this._user.photo,
          role: this._user.role,
        }
      },

      uploadImg () {
        if (this.imageFile) {
          this.isLoading = true
          var fileName = moment() + this.imageFile.name

          const storageRef = firebase.storage().ref().child('profile/' + fileName).put(this.imageFile)

          storageRef.on('state_changed', snapshot => {
                          this.uploadValue = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                        },
                        error => {
                          console.log(error.message)
                          this.isLoading = false
                        },
                        () => {
                          this.uploadValue = 100
                          storageRef.snapshot.ref.getDownloadURL().then((url) => {
                            this.previewAvatarUrl = url
                            this._user.photo = this.previewAvatarUrl
                            console.log(this.previewAvatarUrl)
                            this.isLoading = false
                          })
                        },
          )
        }
      },

      cancelImg () {
        this.previewAvatarUrl = null
        this._user.photo = null
        this.isLoading = false
      },

      update () {
        if (!this.isLoading) {
          this.isLoading = true
          this._updateProfile(this._user).then(
            response => {
                this.setTmpUserVal()
                this.snackbarShow = true
                this.message = 'Profile update successfully'
                this.isLoading = false
            },
            error => {
                this.snackbarShow = true
                this.message = 'Profile update failed'
                this.isLoading = false 
            })
        }
      },
    },
  }
</script>

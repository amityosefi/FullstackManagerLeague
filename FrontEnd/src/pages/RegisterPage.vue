<template>
  <div class="container">
    <h1 class="title">Register</h1>
    <b-form @submit.prevent="onRegister" @reset.prevent="onReset">
      <b-form-group
        id="input-group-username"
        label-cols-sm="3"
        label="Username:"
        label-for="username"
      >
        <b-form-input
          id="username"
          v-model="$v.form.username.$model"
          type="text"
          :state="validateState('username')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.username.required">
          Username is required
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-else-if="!$v.form.username.length">
          Username length should be between 3-8 characters long
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-if="!$v.form.username.alpha">
          Username alpha
        </b-form-invalid-feedback>
      </b-form-group>


      <b-form-group
      id="input-group-firstName"
      label-cols-sm="3"
      label="First Name:"
      label-for="firstName"
      >
      <b-form-input
          id="firstName"
          type="text"
          v-model="$v.form.firstName.$model"
          :state="validateState('firstName')"
        ></b-form-input>
          <b-form-invalid-feedback v-if="!$v.form.firstName.required">
          First name is required
        </b-form-invalid-feedback>
      </b-form-group>

     <b-form-group
      id="input-group-lastName"
      label-cols-sm="3"
      label="Last Name:"
      label-for="lastName"
      >
      <b-form-input
          id="lastName"
          type="text"
          v-model="$v.form.lastName.$model"
          :state="validateState('lastName')"
        ></b-form-input>
          <b-form-invalid-feedback v-if="!$v.form.lastName.required">
          Last name is required
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
      id="input-group-email"
      label-cols-sm="3"
      label="Email:"
      label-for="email"
      >
      <b-form-input
          id="email"
          type="text"
          v-model="$v.form.email.$model"
          :state="validateState('email')"
        ></b-form-input>
          <b-form-invalid-feedback v-if="!$v.form.email.required">
          Email is required
        </b-form-invalid-feedback>
          <b-form-invalid-feedback
          v-else-if="!$v.form.email.style">
          Email is not valid
        </b-form-invalid-feedback>
      </b-form-group>


      <b-form-group
        id="input-group-country"
        label-cols-sm="3"
        label="Country:"
        label-for="country"
      >
      
        <b-form-select
          id="country"
          v-model="$v.form.country.$model"
          :options="countries"
          :state="validateState('country')"
        ></b-form-select>
        <b-form-invalid-feedback>
          Country is required
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        id="input-group-Password"
        label-cols-sm="3"
        label="Password:"
        label-for="password"
      >
        <b-form-input
          id="password"
          type="password"
          v-model="$v.form.password.$model"
          :state="validateState('password')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.password.required">
          Password is required
        </b-form-invalid-feedback>
        <b-form-text v-else-if="$v.form.password.$error" text-variant="info">
          Your password should be <strong>strong</strong>. <br />
          For that, your password should be also:
        </b-form-text>
        <b-form-invalid-feedback
          v-if="$v.form.password.required && !$v.form.password.length"
        >
          Have length between 5-10 characters long
        </b-form-invalid-feedback>
        <b-form-invalid-feedback
          v-else-if="!$v.form.password.style"
        >
          Password must contain at least one digit and one special character
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        id="input-group-confirmedPassword"
        label-cols-sm="3"
        label="Confirm Password:"
        label-for="confirmedPassword"
      >
        <b-form-input
          id="confirmedPassword"
          type="password"
          v-model="$v.form.confirmedPassword.$model"
          :state="validateState('confirmedPassword')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.confirmedPassword.required">
          Password confirmation is required
        </b-form-invalid-feedback>
        <b-form-invalid-feedback
          v-else-if="!$v.form.confirmedPassword.sameAsPassword"
        >
          The confirmed password is not equal to the original password
        </b-form-invalid-feedback>
      </b-form-group>

            <b-form-group
      id="input-group-image"
      label-cols-sm="3"
      label="Image:"
      label-for="image"
      >
      <b-form-input
          id="image"
          type="text"
          v-model="$v.form.image.$model"
          :state="validateState('image')"
        ></b-form-input>
          <b-form-invalid-feedback v-if="!$v.form.image.required">
          Image is required
        </b-form-invalid-feedback>
        <b-form-invalid-feedback
          v-else-if="!$v.form.image.style">
          Image is not valid
        </b-form-invalid-feedback>
      </b-form-group>


      <b-button type="reset" variant="danger">Reset</b-button>
      <b-button
        type="submit"
        variant="primary"
        style="width:250px;"
        class="ml-2 w-75"
        >Register</b-button
      >
      <div class="mt-2">
        You have an account already?
        <router-link to="login"> Log in here</router-link>
      </div>
    </b-form>
    <b-alert
      class="mt-2"
      v-if="form.submitError"
      variant="warning"
      dismissible
      show
    >
      Register failed: {{ form.submitError }}
    </b-alert>
    <!-- <b-card class="mt-3 md-3" header="Form Data Result">
      <pre class="m-0"><strong>form:</strong> {{ form }}</pre>
      <pre class="m-0"><strong>$v.form:</strong> {{ $v.form }}</pre>
    </b-card> -->
  </div>
</template>

<script>
import countries from "../assets/countries";
import {
  required,
  minLength,
  maxLength,
  alpha,
  sameAs,
  email,
} from "vuelidate/lib/validators";

export default {
  name: "Register",
  data() {
    return {
      form: {
        username: "",
        firstName: "",
        lastName: "",
        country: null,
        password: "",
        confirmedPassword: "",
        email: "",
        image: "",
        submitError: undefined
      },
      countries: [{ value: null, text: "", disabled: true }],
      errors: [],
      validated: false
    };
  },
  validations: {
    form: {
      username: {
        required,
        length: (u) => minLength(3)(u) && maxLength(8)(u),
        alpha
      },
      password: {
        required,
        length: (p) => minLength(5)(p) && maxLength(10)(p),
        style: v => /^(?=.*[0-9])(?=.*[@#$%^&*()-+=!])/.test(v)
      },
      confirmedPassword: {
        required,
        sameAsPassword: sameAs("password")
      },
      firstName: {
        required
      },
      lastName: {
        required
      },
      email: {
        required,
        style: (v) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v)
      },
      country: {
        required
      },
      image: {
        required,
        style: (v) => /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/.test(v)
        //example: "https://cloudinary.com/"
      },
    }
  },
  mounted() {
    // console.log("mounted");
    this.countries.push(...countries);
    // console.log($v);
  },
  methods: {
    validateState(param) {
      const { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
    },
    async Register() {
      try {
        const response = await this.axios.post(
          "http://localhost:3000/Register",
          {
            username: this.form.username,
            password: this.form.password,
            email:  this.form.email,
            firstName: this.form.firstName,
            lastName: this.form.lastName,
            country: this.form.country,
            imageUrl: this.form.image
          }
        );
        this.$router.push("/login");
      } catch (err) {
        alert(err.response.data);
        // alert(err.response.request.status);
        this.form.submitError = err.response.data.message;
      }
    },
    onRegister() {
      // console.log("register method called");
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      // console.log("register method go");
      this.Register();
    },
    onReset() {
      this.form = {
        username: "",
        firstName: "",
        lastName: "",
        country: null,
        password: "",
        confirmedPassword: "",
        email: ""
      };
      this.$nextTick(() => {
        this.$v.$reset();
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.container {
  max-width: 500px;
}
</style>

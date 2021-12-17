<template>
  <div>
      <form class="login-form" @submit.prevent="logInSubmit(logInInfo.userId, logInInfo.userPw)">
        <fieldset>
          <legend class="login-form-title login-form-common">WELCOME</legend>

          <div class="user-id-wrapper">
            <label for="logInUserId" class="login-label">Username :</label>
            <input
              type="text"
              class="user-id-input login-form-common"
              id="logInUserId"
              name="userId"
              v-model="logInInfo.userId"
            />
            <span class="error-message" :class="this.errorMsg.logInUserId ? '' : 'hide'"
              >ID should be over 4 characters</span
            >
          </div>

          <div class="user-pw-wrapper">
            <label for="logInUserPW" class="login-label">Password :</label>
            <input
              type="password"
              class="user-pw-input login-form-common"
              name="logInUserPW"
              id="userPW"
              v-model="logInInfo.userPw"
            />
            <span class="error-message" :class="this.errorMsg.logInUserPw ? '' : 'hide'"
              >PW should be over 6 characters</span
            >
            <span class="error-message" :class="this.errorMsg.logInFail ? '' : 'hide'"
              >No User Available</span
            >
          </div>

          <div class="login-form-btns">
            <button @click="logIn" type="submit" class="form-btn login-form-common">
              LOGIN
            </button>
            <button @click="showSignUp" class="form-btn login-form-common">
              SIGN UP
            </button>
          </div>
        </fieldset>
      </form>
      <div class="sign-up-wrapper" :class="signUpPage ? '' : 'hide'">
          <form action="" @submit.prevent="addUser(signUpInfo.userId, signUpInfo.userPw)">
              <fieldset>
          <legend class="login-form-title login-form-common signup-title">Let's Sign Up</legend>

          <div class="user-id-wrapper">
            <label for="signUpUserId" class="login-label">Username :</label>
            <input
              type="text"
              class="user-id-input login-form-common"
              id="signUpUserId"
              name="signUpUserId"
              v-model="signUpInfo.userId"
            />
            <span class="error-message" :class="this.errorMsg.signUpUserId ? '' : 'hide'"
              >ID should be over 4 characters</span
            >
          </div>

          <div class="user-pw-wrapper">
            <label for="signUpUserPW" class="login-label">Password :</label>
            <input
              type="password"
              class="user-pw-input login-form-common"
              name="signUpUserPW"
              id="signUpUserPW"
              v-model="signUpInfo.userPw"
            />
            <span class="error-message" :class="this.errorMsg.signUpUserPw ? '' : 'hide'"
              >PW should be over 6 characters</span
            >
          </div>

          <div class="user-pw-wrapper">
            <label for="singUpUserRePW" class="login-label">RePeatPW :</label>
            <input
              type="password"
              class="user-pw-input login-form-common"
              name="singUpUserRePW"
              id="singUpUserRePW"
              v-model="signUpInfo.userRePw"
            />
            <span class="error-message" :class="this.errorMsg.signUpUserRePw ? '' : 'hide'"
              >Pw Does Not Match</span
            >
            <span class="error-message" :class="this.errorMsg.signUpDuplicate ? '' : 'hide'"
              >Duplicate User Name Detected</span
            >
          </div>

          <div class="signup-form-btns">
            <button type="submit" class="form-btn login-form-common singup-btn">
              Sign Up
            </button>
          </div>
        </fieldset>
          </form>
      </div>
  </div>
</template>
<script>
import { GraphQLClient, gql } from "graphql-request";

export default {
  name: "Login",
  data() {
    return {
      logInInfo: {
        userId: '',
        userPw: '',
      },

      signUpInfo: {
        userId: '',
        userPw: '',
        userRePw: '',
      },

      errorMsg: {
          logInUserId: false,
          logInUserPw: false,
          logInFail: false,
          signUpUserId: false,
          signUpUserPw: false,
          signUpUserRePw: false,
          signUpDuplicate: false
      },
      signUpPage: false,
      endpoint: `http://localhost:3000/user`,
    }
  },
  methods: {
      showSignUp() {
          this.signUpPage = !this.signUpPage;
      },

      async logInSubmit(userId, userPw) {
          if (this.logInInfo.userId.length < 4 || this.logInInfo.userPw.length < 6) {
            if (this.logInInfo.userId.length === 0 && this.logInInfo.userPw.length === 0) return
              if (this.logInInfo.userId.length < 4) this.errorMsg.logInUserId = true
              else this.errorMsg.logInUserId = false

              if (this.logInInfo.userPw.length < 6) this.errorMsg.logInUserPw = true
              else this.errorMsg.logInUserPw = false
              
              return
          }
          this.errorMsg.logInUserId = this.errorMsg.logInUserPw = false;

          const graphQLClient = new GraphQLClient(this.endpoint);
          const logInResult = await graphQLClient.request(
            gql`query {
              getLogInResult(input: {
                userId: "${userId}"
                userPw: "${userPw}"
             })
            }`)
        if (logInResult.getLogInResult === "FAIL") this.errorMsg.logInFail = true
        else {
          localStorage.setItem('token', logInResult.getLogInResult);
          localStorage.setItem('name', userId)
          this.$router.push({path: 'home'})
        }
      },

      async addUser(userId, userPw) {
        if (this.signUpInfo.userId.length < 4 || this.signUpInfo.userPw.length < 6 || this.signUpInfo.userRePw !== this.signUpInfo.userPw) {
              if (this.signUpInfo.userId.length < 4) this.errorMsg.signUpUserId = true
              else this.errorMsg.signUpUserId = false

              if (this.signUpInfo.userPw.length < 6) this.errorMsg.signUpUserPw = true
              else this.errorMsg.signUpUserPw = false
              
              if (this.signUpInfo.userPw !== this.signUpInfo.userRePw) this.errorMsg.signUpUserRePw = true
              else this.errorMsg.signUpUserRePw = false

              return
        }

        // Error 메시지와 SignUp Info 초기화
        this.errorMsg.signUpUserId = this.errorMsg.signUpUserPw = this.errorMsg.signUpUserRePw = false
        this.signUpInfo.userPw = this.signUpInfo.userId = this.signUpInfo.userRePw = '';

        const graphQLClient = new GraphQLClient(this.endpoint);
        const result = await graphQLClient.request(
            gql`mutation {
              addUser(input: {
                userId: "${userId}"
                userPw: "${userPw}"
             })
        }`
      )
      if (!result.addUser) this.errorMsg.signUpDuplicate = true
      else this.signUpPage = false;
      }
  }
};
</script>

<style scoped>

/* common */

.hide {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  overflow: hidden;
  visibility: hidden;
  clip: rect(0, 0, 0, 0);
  clip-path: inset(50%);
}

/* login */

.login-wrapper {
  position: absolute;
  z-index: 1;
}

.login-form {
  text-align: center;
}

.login-form fieldset {
    width: 60%;
    margin: auto;
    min-width: 600px;
}

.login-form-common {
  background-color: #fff;
  border-radius: 5px;
  padding: 15px;
  font-family: "orbitron";
}

.login-form-title {
  width: 40%;
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: 5px;
  padding: 15px 40px;
}

.user-id-wrapper,
.user-pw-wrapper {
  position: relative;
  width: 90%;
  margin: auto;
  border: 1px soild grey;
}

.user-id-wrapper input,
.user-pw-wrapper input{
  width: 100%;
  padding-left: 160px;
  margin: 0 0 0 0;
}

.login-label {
    font-family: 'orbitron';
    position: absolute;
    top: 14px;
    left: 50px;
    font-weight: 700;
}

.user-id-input {
  border: none;
  width: 80%;
  padding-left: 40px;
  font-size: 1rem;
}

.user-pw-input {
  border: none;
  width: 80%;
  padding-left: 40px;
  font-size: 1rem;
}

.error-message {
    display: block;
    text-align: left;
    padding-left: 50px;
    color: red;
    font-family: 'orbitron';
    font-size: 12px;
    margin-bottom: 20px;
}

.login-form-btns {
  display: flex;
  justify-content: space-between;
  margin: 30px auto;
  width: 85%;
}

.form-btn {
  width: 45%;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
}

/* signup */

.signup-title {
    text-align: center;
}

.sign-up-wrapper {
    min-width: 600px;
    position: absolute;
    top: 120px;
    left: 50%;
    background-color: #fff;
    width: 60%;
    height: 80%;
    animation: active-sign-up-ani 1.5s forwards;
}

@keyframes active-sign-up-ani {
  0% {
    transform: translateX(-50%) scaleY(0);
  }

  100% {
    transform: translateX(-50%) scaleY(1);
  }
}

.signup-form-btns {
  margin: 30px auto;
  text-align: center;
  width: 85%;
}

</style>
<template>
  
    <div class="row justify-content-center h-100">
     
      <div class="col-md-8 col-xl-6 chat">
        <div class="card">
          <div class="card-header msg_head">
            <div>
              <span class="online_icon"></span>
              <span id="name">{{ authUser.displayName }}</span>
            </div>
          </div>
          <div
            v-for="message in messages"
            v-bind:key="message"
            class="card-body msg_card_body"
          >
            <div class="d-flex justify-content-start mb-4">
              <p
                :class="[
                  message.author == authUser.displayName
                    ? 'msg_cotainer'
                    : 'msg_cotainer_send',
                ]"
              >
                {{ message.message }}
                <span class="msg_time">{{
                  message.author == authUser.displayName
                    ? "You"
                    : message.author
                }}</span>
              </p>
            </div>
          </div>
          <div class="card-footer">
            <div class="input-group">
              <textarea
                @keyup.enter="save"
                v-model="message"
                name
                class="form-control type_msg"
                placeholder="Type your message..."
              ></textarea>
              <div>
                <v-btn class="send_btn" @click="save" large>
                  <v-icon>mdi-send</v-icon>
                </v-btn>
              </div>
              <!-- google-site-verification=oMJH7QJ8faa2JD2UHFD6SNIQrwhi7VBFQ0eZhxeY6XU -->
            </div>
          </div>
        </div>
      </div>
    </div>
 
</template>

<script>
// @ is an alias to /src
import firebase from "firebase";
import Darkmode from "darkmode-js";

new Darkmode().showWidget();

const options = {
  bottom: "64px", // default: '32px'
  right: "unset", // default: '32px'
  left: "32px", // default: 'unset'
  time: "0.5s", // default: '0.3s'
  mixColor: "#fff", // default: '#fff'
  backgroundColor: "#fff", // default: '#fff'
  buttonColorDark: "#100f2c", // default: '#100f2c'
  buttonColorLight: "#fff", // default: '#fff'
  saveInCookies: false, // default: true,
  label: "🌓", // default: ''
  autoMatchOsTheme: true, // default: true
};
const darkmode = new Darkmode(options);
darkmode.showWidget();

export default {
  name: "Chat",
  data() {
    return {
      message: null,
      messages: [],
      authUser: {},
    };
  },
  methods: {
    save() {
      // save to firestore
      db.collection("chat")
        .add({
          message: this.message,
          author: this.authUser.displayName,
          createdAt: new Date(),
        })
        .then(() => {
          this.scrollToBottom();
        });

      // clear the textarea after sending	the msg
      this.message = null;
    },
    fetchMessages() {
      db.collection("chat")
        .orderBy("createdAt")
        .onSnapshot((querySnapshot) => {
          let allMessages = [];
          querySnapshot.forEach((doc) => {
            allMessages.push(doc.data());
          });
          this.messages = allMessages;
        });
    },
    scrollToBottom() {
      let box = document.querySelector(".card");
      box.scrollTop = box.scrollHeight;
    },
  },

  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.authUser = user;
      } else {
        this.authUser = {};
      }
    });

    this.fetchMessages();
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          next();
        } else {
          this.$router.push("login");
        }
      });
    });
  },
};
</script>

<style scoped>
body,
html {
  height: 100%;
  margin: 0;
  background: #7f7fd5;
  background: -webkit-linear-gradient(to right, #91eae4, #86a8e7, #7f7fd5);
  background: linear-gradient(to right, #91eae4, #86a8e7, #7f7fd5);
}

.chat {
  margin-top: auto;
  margin-bottom: auto;
}
.card {
  height: 600px;
  overflow-y: auto;
  border-radius: 15px 15px 0px 0px !important;
  background-color: rgba(11, 61, 49, 0.472);
}
.contacts_body {
  padding: 0.75rem 0 !important;
  overflow-y: auto;
  white-space: nowrap;
}
.card-header {
  border-radius: 15px 15px 0 0 !important;
  border-bottom: 0 !important;
}
.card-footer {
  border-top: 0 !important;
  position: fixed !important;
  bottom: 26.5%;
  left: 25.3%;
  width: 1045px;
  padding: 0 !important;
}
.container {
  align-content: center;
}
.search {
  border-radius: 15px 0 0 15px !important;
  background-color: rgba(0, 0, 0, 0.3) !important;
  border: 0 !important;
  color: white !important;
}
.search:focus {
  box-shadow: none !important;
  outline: 0px !important;
}
.type_msg {
  background-color: rgba(11, 61, 49, 0.472);
  border: 0 !important;
  border-radius: 0 0 0 15px !important;
  color: rgb(255, 255, 255) !important;
  height: 60px !important;
  overflow-y: auto;
  font-size: 25px;
  font-family: "Verdana", sans-serif;
}
.type_msg:focus {
  box-shadow: none !important;
  outline: 0px !important;
}
.attach_btn {
  border-radius: 15px 0 0 15px !important;
  background-color: rgba(0, 0, 0, 0.3) !important;
  border: 0 !important;
  color: white !important;
  cursor: pointer;
}
.send_btn {
  border-radius: 0 0 15px 0 !important;
  background-color: rgb(1, 255, 1) !important;
  border: 0 !important;
  color: rgb(255, 255, 255) !important;
  cursor: pointer;
  height: 100% !important;
}
.search_btn {
  border-radius: 0 15px 15px 0 !important;
  background-color: rgba(0, 0, 0, 0.3) !important;
  border: 0 !important;
  color: white !important;
  cursor: pointer;
}
.contacts {
  list-style: none;
  padding: 0;
}
.contacts li {
  width: 100% !important;
  padding: 5px 10px;
  margin-bottom: 15px !important;
}
.active {
  background-color: rgba(0, 0, 0, 0.3);
}
.user_img {
  height: 70px;
  width: 70px;
  border: 1.5px solid #f5f6fa;
}
.user_img_msg {
  height: 40px;
  width: 40px;
  border: 1.5px solid #f5f6fa;
}
.img_cont {
  position: relative;
  height: 70px;
  width: 70px;
}
.img_cont_msg {
  height: 40px;
  width: 40px;
}
.online_icon {
  position: absolute;
  height: 15px;
  width: 15px;
  background-color: #27ff06;
  border-radius: 50%;
  /* bottom: 0.2em;
  right: 0.4em; */
  border: 1.5px solid white;
}
.offline {
  background-color: #c23616 !important;
}
.user_info {
  margin-top: auto;
  margin-bottom: auto;
  margin-left: 15px;
}
.user_info span {
  font-size: 20px;
  color: white;
}
.user_info p {
  font-size: 10px;
  color: rgba(255, 255, 255, 0.6);
}
.msg_cotainer {
  margin-top: auto;
  margin-bottom: auto;
  margin-left: 10px;
  border-radius: 25px;
  background-color: #82ccdd;
  padding: 10px;
  position: relative;
}
.msg_cotainer_send {
  margin-top: auto;
  margin-bottom: auto;
  margin-right: 10px;
  border-radius: 25px;
  background-color: #78e08f;
  padding: 10px;
  position: relative;
}
.msg_time {
  position: absolute;
  left: 0;
  bottom: -17px;
  width: flex;
  color: rgba(255, 255, 255, 0.5);
  font-size: 10px;
}
.msg_time_send {
  position: absolute;
  right: 0;
  bottom: -15px;
  color: rgba(255, 255, 255, 0.5);
  font-size: 10px;
}
.msg_head {
  position: fixed;
}
#action_menu_btn {
  position: absolute;
  right: 10px;
  top: 10px;
  color: white;
  cursor: pointer;
  font-size: 20px;
}
.action_menu {
  z-index: 1;
  position: absolute;
  padding: 15px 0;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border-radius: 15px;
  top: 30px;
  right: 15px;
  display: none;
}
.action_menu ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
.action_menu ul li {
  width: 100%;
  padding: 10px 15px;
  margin-bottom: 5px;
}
.action_menu ul li i {
  padding-right: 10px;
}
.action_menu ul li:hover {
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.2);
}
#name {
  position: absolute;
  width: 200px;
  color: rgb(255, 255, 255);
  font-size: 20px;
}
.darkmode--activated .card,
.darkmode--activated .type_msg {
  background-color: rgba(46, 46, 46, 0.952);
}
@media (max-width: 576px) {
  .contacts_card {
    margin-bottom: 15px !important;
  }
}
/* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>

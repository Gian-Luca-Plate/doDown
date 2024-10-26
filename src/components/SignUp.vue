<script>
import { supabase } from "../clients/supabase";
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },

  methods: {
    async createAcc() {
      try {
        const { data, error } = await supabase.auth.signUp({
          email: this.email,
          password: this.password,
        });
        if (error) throw error;
        console.log("s erfolg");
      } catch (error) {
        console.log(error.message);
      }
      try {
        const { data: user, error } = await supabase.auth.signInWithPassword({
          email: this.email,
          password: this.password,
        });

        if (error) throw error;

        this.successMessage = "Erfolgreich eingeloggt!";
        console.log("Benutzer erfolgreich eingeloggt:", user);

        // Aufgaben des angemeldeten Benutzers abrufen
        if (user && user.user && user.user.id) {
          console.log("Benutzer-ID:", user.user.id);
          localStorage.setItem("userID", user.user.id);
        }
      } catch (error) {
        this.errorMessage = error.message;
        console.error("Fehler beim Login:", error);
      }
    },
  },
};
</script>


<template >
  <div id="SingUp" class="w-full h-screen bg-slate-900">
    <div class="place-items-center grid gap-4 pt-40">
      <h1 class="font-mono text-2xl text-white">Sing Up</h1>
      <input
        type="email"
        v-model="email"
        class="w-60 h-12 rounded-md text-center"
        placeholder="Email"
      />
      <input
        type="password"
        v-model="password"
        class="w-60 h-12 rounded-md text-center"
        placeholder="Password"
      />
      <router-link to="/home">
        <button
          @click="createAcc"
          class="bg-cyan-500 rounded-md w-60 h-12 text-white"
        >
          sing Up
        </button>
      </router-link>
      <router-link to="/login" class="text-white"> or Login</router-link>
    </div>
  </div>
</template>

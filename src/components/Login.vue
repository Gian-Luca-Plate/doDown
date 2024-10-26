<script>
import { supabase } from "../clients/supabase";
import { provide } from "vue";

export default {
  data() {
    return {
      email: "",
      password: "",
      Todo: [], // Array für alle Aufgaben
    };
  },

  methods: {
    // Login-Methode
    async loginAcc() {
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
          localStorage.setItem('userID', user.user.id)
        }
      } catch (error) {
        this.errorMessage = error.message;
        console.error("Fehler beim Login:", error);
      }
    },
    setup(props) {
      provide("userID", this.userID);
    },
  },
};
</script>


<template>
  <div id="login" class="w-full h-screen bg-slate-900">
    <div class="place-items-center grid gap-4 pt-40">
      <h1 class="font-mono text-2xl text-white">Sing In</h1>
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
        @click="loginAcc"
        class="bg-cyan-500 rounded-md w-60 h-12 text-white"
      >
        Sing In
      </button>
      </router-link>
      
      <router-link to="/" class="text-white"> or Sing Up</router-link>
    </div>
    <!-- Formular zum Hinzufügen von neuen Aufgaben, immer sichtbar nach dem Login -->
    
  </div>
</template>


<style>
/* Du kannst hier dein CSS hinzufügen */
</style>
